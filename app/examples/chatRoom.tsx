import { createChatRoom, joinChatRoom } from "@/src/features/chat";
import { useChatRooms } from "@/src/shared/hooks/chat";
import { useNavigation } from "@/src/shared/hooks/navigation";
import { useAppSelector } from "@/src/shared/hooks/redux";
import {
  CommonCard,
  CommonHeader,
  CommonList,
  CommonText,
  SafeAreaContainer,
} from "@kukkim/react-native-ui";
import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

const ChatRoomComponent = ({ title, members, routeChat }: any) => {
  return (
    <Pressable onPress={routeChat}>
      <CommonCard title={title}>
        {members.map(({ id }) => (
          <CommonText>{id}</CommonText>
        ))}
      </CommonCard>
    </Pressable>
  );
};

export default function ChatRoomScreen() {
  const userInfo = useAppSelector((state) => state.userInfo);
  const { back, push } = useNavigation();
  const { data: chatRooms, isLoading, isError, refetch } = useChatRooms();
  const fetchMore = () => {};
  const addChatRoom = () => {
    createChatRoom(userInfo).then(() => {
      refetch();
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
      joinChatRoom(userInfo.id, id).then(() => {
        router.navigate({
          pathname: "/examples/chat",
          params: item,
        });
      });
    }
  };

  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: "Chatroom",
          icon: "back",
          onPress: back,
        }}
        right={{
          icon: "plus", //TODO: library에 plus아이콘 추가.
          onPress: addChatRoom,
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
const styles = StyleSheet.create({});
