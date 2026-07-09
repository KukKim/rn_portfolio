import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessage, ChatMessageState } from "../shared/types/chat";

const initialState: ChatMessageState = {
  messages: [],
};

const userInfoSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },

    addMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.messages = [...state.messages, ...action.payload];
    },

    updateMessage: (state, action: PayloadAction<ChatMessage>) => {
      const index = state.messages.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (index !== -1) {
        state.messages[index] = action.payload;
      }
    },

    deleteMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(
        (item) => item.id !== action.payload,
      );
    },

    readMessage: (state, action: PayloadAction<string>) => {
      const message = state.messages.find((item) => item.id === action.payload);

      if (message) {
        message.isRead = true;
      }
    },

    clearMessages: () => {
      return initialState;
    },
  },
});

export const {
  addMessage,
  addMessages,
  updateMessage,
  deleteMessage,
  readMessage,
  clearMessages,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
