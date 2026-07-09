import { addChat } from "@/src/features/chat";
import { useNavigation } from "@/src/shared/hooks/navigation";
import { useAppDispatch, useAppSelector } from "@/src/shared/hooks/redux";
import { ChatMessage, DisplayChatMessage } from "@/src/shared/types/chat";
import { selectDisplayChatMessages } from "@/src/store/chatSelector";
import { clearMessages } from "@/src/store/chatSlice";
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
import { useState } from "react";
import { Keyboard, KeyboardAvoidingView, StyleSheet, View } from "react-native";

const ChatMessageComponent = (chat: DisplayChatMessage) => {
  const { id, content, createDt, status, timeText, showTime } = chat;
  const isMyChat = Number(id) % 2 === 0;
  const readCount = 0;
  return (
    <View
      style={[
        styles.bubbleWrapper,
        {
          flexDirection: isMyChat ? "row" : "row-reverse",
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
        <CommonText size="s">{content}</CommonText>
      </View>

      <View
        style={[
          styles.sideBubble,
          {
            alignItems: isMyChat ? "flex-start" : "flex-end",
          },
        ]}
      >
        <CommonText size="s">{readCount}</CommonText>
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
  const chatMessageList = useAppSelector(selectDisplayChatMessages);
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");
  const [keyboardMenu, setKeyboardMenu] = useState(false);
  // const [chatMessageList, setChatMessageList] = useState<ChatMessage[]>([]);
  const sendMessage = () => {
    if (text.trim() === "") {
      return;
    }

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: text,
      createDt: new Date(),
      isRead: false,
      sender: "me",
      status: "sending",
    };
    // dispatch(addMessage(newMessage));
    addChat(newMessage)(dispatch);
    setText("");
  };
  const fetchMore = () => {};

  const openKeyboardModal = () => {
    Keyboard.dismiss();
    setKeyboardMenu(!keyboardMenu);
  };

  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: "Chatting",
          icon: "back",
          onPress: back,
        }}
      />
      <TextButton
        title={"Clear Message"}
        onPress={() => dispatch(clearMessages())}
      />
      <CommonList
        inverted
        data={chatMessageList}
        renderItem={({ item }) => <ChatMessageComponent {...item} />}
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
    </SafeAreaContainer>
  );
}
const styles = StyleSheet.create({
  bubbleWrapper: {
    padding: 20,
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
  tailCircle: {
    position: "absolute",
    left: -4,
    bottom: 2,
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: "#fff",
  },
});
