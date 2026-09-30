import { ChatReadState } from "@/src/features/chat";
import { getCommonDateText } from "@/src/features/date";
import {
  useChatReadStates,
  useChats,
  useChatSocket,
  useSendChat,
} from "@/src/shared/hooks/chat";
import { useNavigation } from "@/src/shared/hooks/navigation";
import { useAppSelector } from "@/src/shared/hooks/redux";
import { DisplayChatMessage } from "@/src/shared/types/chat";
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
  const { data, refetch } = useChats(id);
  const { mutate } = useSendChat();

  const { data: readStates = [] } = useChatReadStates(id);
  useChatSocket(id, userInfo.id);
  const messages = useMemo(() => {
    const flattenedMessages =
      data?.pages.flatMap((page) => page.messages) ?? [];
    return flattenedMessages;
    // const uniqueMessages = Array.from(
    //   new Map(
    //     flattenedMessages.map((message) => [message.id, message]),
    //   ).values(),
    // );
    // return uniqueMessages.sort(
    //   (a, b) =>
    //     new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    // );
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
    // dispatch(addMessage(newMessage));
    mutate(newMessage);
    setText("");
  };
  const fetchMore = () => {};

  const getUnreadCount = ({
    messageId,
    senderId,
    createdAt,
    readStates,
  }: {
    messageId: string;
    senderId: string;
    createdAt: string;
    readStates: ChatReadState[];
  }) => {
    return readStates.filter((state) => {
      if (String(state.userId) === String(senderId)) {
        return false;
      }

      if (new Date(state.joinedAt).getTime() > new Date(createdAt).getTime()) {
        return false;
      }

      if (!state.lastReadMessageId) {
        return true;
      }

      return BigInt(state.lastReadMessageId) < BigInt(messageId);
    }).length;
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
          const unreadCount = getUnreadCount({
            messageId: String(item.id),
            senderId: String(item.senderId),
            createdAt: item.createdAt.toString(),
            readStates,
          });
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
