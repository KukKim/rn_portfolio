import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat, ChatState } from "../types/chat";

const initialState: ChatState = {
  messages: [],
};

const userInfoSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Chat>) => {
      state.messages.push(action.payload);
    },

    addMessages: (state, action: PayloadAction<Chat[]>) => {
      state.messages = [...state.messages, ...action.payload];
    },

    updateMessage: (state, action: PayloadAction<Chat>) => {
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
