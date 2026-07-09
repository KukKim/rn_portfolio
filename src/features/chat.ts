// chatApi.ts 또는 chatService.ts
import { ChatMessage } from "../shared/types/chat";
import type { AppDispatch } from "../store";
import { addMessage, updateMessage } from "../store/chatSlice";

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const createChatRoom = () => {};

export const joinChatRoom = () => {};

//TODO: 실제 API 호출을 구현해야 합니다. 현재는 지연 후 성공/실패를 랜덤으로 결정합니다.
export const addChat = (chat: ChatMessage) => {
  return async (dispatch: AppDispatch) => {
    const sendingChat: ChatMessage = {
      ...chat,
      status: "sending",
    };

    dispatch(addMessage(sendingChat));

    try {
      await delay(1500);

      const isSuccess = Math.random() > 0.3;

      if (!isSuccess) {
        throw new Error("Failed to send message");
      }

      dispatch(
        updateMessage({
          ...sendingChat,
          status: "sent",
        }),
      );
    } catch {
      dispatch(
        updateMessage({
          ...sendingChat,
          status: "failed",
        }),
      );
    }
  };
};
