import { ChatReadState } from "@/src/features/chat";
import { getCommonDateText } from "@/src/features/date";
import {
  useChatReadStates,
  useChats,
  useChatSocket,
  useSendChat,
} from "@/src/shared/hooks/chat";
import { useNavigation } from "@/src/shared/hooks/navigation";
import { useAppDispatch, useAppSelector } from "@/src/shared/hooks/redux";
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
import { Keyboard, StyleSheet, View } from "react-native";
import {
  KeyboardAvoidingView,
  useReanimatedKeyboardAnimation,
} from "react-native-keyboard-controller";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const ChatMessageComponent = (chat: DisplayChatMessage) => {
  const { id, message, status, timeText, isMyChat, unreadCount } = chat;
  return (
    <View
      style={[
        styles.bubbleWrapper,
        {
          flexDirection: isMyChat ? "row-reverse" : "row",
        },
      ]}
    >
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: isMyChat ? "#DCF8C6" : "#E5E5EA",
          },
        ]}
      >
        <CommonText size="s">{message}</CommonText>
      </View>

      <View
        style={[
          styles.sideBubble,
          {
            alignItems: isMyChat ? "flex-end" : "flex-start",
          },
        ]}
      >
        <CommonText size="s">{unreadCount}</CommonText>
        <View
          style={[
            styles.alignFlexEnd,
            {
              flexDirection: isMyChat ? "row" : "row-reverse",
            },
          ]}
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
  const { back, push } = useNavigation();
  const params = useLocalSearchParams<any>();
  const { id, title } = params;
  const userInfo = useAppSelector((state) => state.userInfo);
  const { data, isLoading, isError, refetch } = useChats(id);
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

  // const chatMessageList = useAppSelector(selectDisplayChatMessages);
  const dispatch = useAppDispatch();
  // const [chatMessageList, setChatMessageList] = useState<ChatMessage[]>([]);

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
            senderId: String(item.sender_id),
            createdAt: item.created_at.toString(),
            readStates,
          });
          return (
            <ChatMessageComponent
              {...item}
              isMyChat={String(userInfo.id) === String(item.sender_id)}
              timeText={getCommonDateText({
                date: item.created_at,
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
        behavior="padding"
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CommonButton onPress={openKeyboardModal}>
          <CommonIcon iconType="plus" size="s" />
        </CommonButton>
        <CommonInput value={text} onChangeText={setText} />
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
const styles = StyleSheet.create({
  bubbleWrapper: {
    padding: 20,
    gap: 5,
  },
  bubble: {
    maxWidth: "70%",
    padding: 12,
    borderRadius: 8,
  },
  sideBubble: {
    justifyContent: "flex-end",
  },
  alignFlexEnd: {
    alignItems: "flex-end",
  },
});
