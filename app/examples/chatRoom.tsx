import { createChatRoom, joinChatRoom } from "@/src/features/chat";
import { CommonOverlay } from "@/src/shared/components";
import { useChatRooms } from "@/src/shared/hooks/chat";
import { useNavigation } from "@/src/shared/hooks/navigation";
import { useAppSelector } from "@/src/shared/hooks/redux";
import { useTranslation } from "@/src/shared/hooks/translation";
import { ChatRoom } from "@/src/shared/types/chat";
import {
  CommonCard,
  CommonHeader,
  CommonInput,
  CommonList,
  CommonText,
  SafeAreaContainer,
  TextButton,
} from "@kukkim/react-native-ui";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";

interface ChatRoomProps extends ChatRoom {
  routeChat: () => void;
}
const ChatRoomComponent = ({ title, members, routeChat }: ChatRoomProps) => {
  return (
    <Pressable onPress={routeChat}>
      <CommonCard title={title}>
        {members.map(({ id }, index) => (
          <CommonText key={index}>{id}</CommonText>
        ))}
      </CommonCard>
    </Pressable>
  );
};

export default function ChatRoomScreen() {
  const { t } = useTranslation();
  const userInfo = useAppSelector((state) => state.userInfo);
  const { back } = useNavigation();
  const { data: chatRooms, refetch } = useChatRooms();
  const [showOverlay, setShowOverlay] = useState(false);
  const [chatRoomTitle, setChatRoomTitle] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const refresh = async () => {
    if (refreshing) return;

    setRefreshing(true);

    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  };
  const fetchMore = () => {};
  const addChatRoom = () => {
    createChatRoom({ title: chatRoomTitle, userId: userInfo.id }).then(() => {
      refetch();
      setChatRoomTitle("");
    });
  };

  const routeChat = async (item: ChatRoom) => {
    const { members, id, title } = item;
    if (!members.some((member: any) => userInfo.id === member.id)) {
      //TODO: join했을때 state업데이트 필요
      await joinChatRoom({ userId: userInfo.id, roomId: id });
      // await refetch();
    }

    router.navigate({
      pathname: "/examples/chat",
      params: {
        id,
        title,
      },
    });
  };

  return (
    <SafeAreaContainer>
      <CommonOverlay
        visible={showOverlay}
        onRequestClose={() => setShowOverlay(false)}
      >
        <View className="bg-white p-5 rounded-lg gap-2">
          <CommonText size="s">Do you want to create a chat room?</CommonText>
          <CommonInput
            placeholder="Enter chat room title"
            value={chatRoomTitle}
            onChangeText={setChatRoomTitle}
          />
          <View className="flex-row ">
            <TextButton
              title="Create"
              onPress={() => {
                addChatRoom();
                setShowOverlay(false);
              }}
            />
            <TextButton title="Cancel" onPress={() => setShowOverlay(false)} />
          </View>
        </View>
      </CommonOverlay>
      <CommonHeader
        left={{
          title: t("chat.chatRoomTitle"),
          icon: "back",
          onPress: back,
        }}
        right={{
          icon: "plus", //TODO: library에 plus아이콘 추가.
          onPress: () => setShowOverlay(true),
        }}
      />
      <CommonList
        data={chatRooms}
        renderItem={({ item }) => {
          return (
            <ChatRoomComponent routeChat={() => routeChat(item)} {...item} />
          );
        }}
        keyExtractor={(item) => item?.id}
        refreshing={refreshing}
        onRefresh={refresh} // TODO: refresh control 커스텀
        alwaysBounceVertical
        onEndReached={fetchMore}
        onEndReachedThreshold={0.2}
      />
    </SafeAreaContainer>
  );
}
