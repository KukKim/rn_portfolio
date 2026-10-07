import { getCommonDateText } from "@/src/features/date";
import {
  useChatRooms,
  useChats,
  useChatSocket,
  useSendChat,
} from "@/src/shared/hooks/chat";
import { useNavigation } from "@/src/shared/hooks/navigation";
import { useAppSelector } from "@/src/shared/hooks/redux";
import { ChatMember, DisplayChatMessage } from "@/src/shared/types/chat";
import {
  CommonButton,
  CommonHeader,
  CommonIcon,
  CommonInput,
  CommonList,
  CommonSpinner,
  CommonText,
  SafeAreaContainer,
  TextButton,
} from "@kukkim/react-native-ui";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Keyboard, View } from "react-native";
import {
  KeyboardAvoidingView,
  useReanimatedKeyboardAnimation,
} from "react-native-keyboard-controller";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const ChatMessageComponent = (chat: DisplayChatMessage) => {
  const { message, status, timeText, isMyChat, unreadCount } = chat;
  return (
    <View
      className={`gap-[5px] p-[20px] ${
        isMyChat ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <View
        className={`max-w-[70%] rounded-[8px] p-[12px] ${
          isMyChat ? "bg-[#DCF8C6]" : "bg-[#E5E5EA]"
        }`}
      >
        <CommonText size="s">{message}</CommonText>
      </View>

      <View className={`justify-end ${isMyChat ? "items-end" : "items-start"}`}>
        <CommonText size="s">{unreadCount}</CommonText>
        <View
          className={`items-end ${isMyChat ? "flex-row" : "flex-row-reverse"}`}
        >
          <View>
            <CommonText size="s">{timeText}</CommonText>
          </View>
          {status === "sending" && <CommonSpinner size="s" />}
          {status === "failed" && (
            <View>
              <CommonText size="s">Failed</CommonText>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default function ChatScreen() {
  const { back } = useNavigation();
  const params = useLocalSearchParams<any>();
  const { id, title } = params;

  const userInfo = useAppSelector((state) => state.userInfo);
  const { data: chatRooms } = useChatRooms();
  const chatRoom = chatRooms?.find((room) => String(room.id) === id);
  const { data, refetch } = useChats(id);
  const { mutate } = useSendChat();
  const roomMembers = chatRoom?.members ?? [];

  useChatSocket(id, userInfo.id);

  const messages = useMemo(() => {
    const flattenedMessages =
      data?.pages.flatMap((page) => page.messages) ?? [];
    return flattenedMessages;
  }, [data]);

  const [text, setText] = useState("");
  const [keyboardMenu, setKeyboardMenu] = useState(false);
  const { height, progress } = useReanimatedKeyboardAnimation();

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [1, 2]);

    return {
      transform: [{ translateY: height.value }, { scale }],
    };
  });

  const sendMessage = () => {
    if (text.trim() === "") {
      return;
    }
    const newMessage = {
      roomId: id,
      senderId: userInfo.id,
      message: text,
    };
    mutate(newMessage);
    setText("");
  };
  const fetchMore = () => {};

  const getUnReadCounts = ({
    messageId,
    senderId,
    createdAt,
    roomMembers,
  }: {
    messageId: string;
    senderId: string;
    createdAt: string;
    roomMembers: ChatMember[];
  }) => {
    const recipients = roomMembers.filter(
      (member) =>
        String(userInfo.id) !== String(member.id) &&
        String(member.id) !== String(senderId) && // TODO: Back-end로부터 받은 number 타입을 string과 혼용하는 것에 대해 솔루션이 필요함.
        new Date(member.joinedAt).getTime() <= new Date(createdAt).getTime(),
    );
    const readCount = recipients.filter((member) => {
      const lastReadId = member.lastReadMessageId;
      return lastReadId != null && lastReadId >= messageId;
    }).length;
    return recipients.length - readCount;
  };

  const openKeyboardModal = () => {
    Keyboard.dismiss();
    setKeyboardMenu(!keyboardMenu);
  };

  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: title,
          icon: "back",
          onPress: back,
        }}
      />
      <CommonList
        inverted
        data={messages}
        renderItem={({ item }) => {
          const unreadCount =
            chatRoom && item.status !== "sending" && item.status !== "failed"
              ? getUnReadCounts({
                  messageId: String(item.id),
                  senderId: item.senderId,
                  createdAt: item.createdAt.toString(),
                  roomMembers: roomMembers,
                })
              : null;

          return (
            <ChatMessageComponent
              {...item}
              isMyChat={String(userInfo.id) === String(item.senderId)}
              timeText={getCommonDateText({
                date: item.createdAt,
                format: "HH:mm",
              })}
              unreadCount={unreadCount}
            />
          );
        }}
        keyExtractor={(item) => item.id}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.2}
      />
      <KeyboardAvoidingView
        className="flex-row items-center"
        behavior="padding"
      >
        <CommonButton onPress={openKeyboardModal}>
          <CommonIcon iconType="plus" size="s" />
        </CommonButton>
        <View className="flex-1">
          <CommonInput value={text} onChangeText={setText} />
        </View>
        <TextButton title={"Input"} onPress={sendMessage} />
      </KeyboardAvoidingView>
      {keyboardMenu && (
        <Animated.View
          style={{
            height: height.value,
          }}
        >
          <CommonText>KeyboardMenu</CommonText>
        </Animated.View>
      )}
    </SafeAreaContainer>
  );
}
