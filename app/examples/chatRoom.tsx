import { createChatRoom, joinChatRoom } from "@/src/features/chat";
import { CommonOverlay } from "@/src/shared/components";
import { useChatRooms } from "@/src/shared/hooks/chat";
import { useNavigation } from "@/src/shared/hooks/navigation";
import { useAppSelector } from "@/src/shared/hooks/redux";
import { ChatRoom } from "@/src/shared/types/chat";
import {
  CommonCard,
  CommonHeader,
  CommonList,
  CommonText,
  SafeAreaContainer,
  TextButton,
} from "@kukkim/react-native-ui";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

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
  const userInfo = useAppSelector((state) => state.userInfo);
  const { back, push } = useNavigation();
  const { data: chatRooms, isLoading, isError, refetch } = useChatRooms();

  const [showOverlay, setShowOverlay] = useState(false);
  const [chatRoomTitle, setChatRoomTitle] = useState("");

  const fetchMore = () => {};
  const addChatRoom = () => {
    createChatRoom({ title: chatRoomTitle, userId: userInfo.id }).then(() => {
      refetch();
      setChatRoomTitle("");
    });
  };

  const routeChat = (item: any) => {
    const { title, members, id } = item;

    if (members.some((member: any) => userInfo.id === member.id)) {
      router.navigate({
        pathname: "/examples/chat",
        params: item,
      });
    } else {
      joinChatRoom({ userId: userInfo.id, roomId: id }).then(() => {
        router.navigate({
          pathname: "/examples/chat",
          params: item,
        });
      });
    }
  };

  return (
    <SafeAreaContainer>
      <CommonOverlay
        visible={showOverlay}
        onRequestClose={() => setShowOverlay(false)}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            gap: 10,
          }}
        >
          <CommonText size="s">Do you want to create a chat room?</CommonText>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "gray",
              padding: 8,
              marginVertical: 8,
            }}
            placeholder="Enter chat room title"
            value={chatRoomTitle}
            onChangeText={setChatRoomTitle}
          />
          <View
            style={{
              flexDirection: "row",
            }}
          >
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
          title: "Chatroom",
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
            <ChatRoomComponent
              title={item?.title}
              routeChat={() => routeChat(item)}
              members={item?.members}
            />
          );
        }}
        keyExtractor={(item) => item?.id}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.2}
      />
    </SafeAreaContainer>
  );
}
