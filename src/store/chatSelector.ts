import { getCommonDateText } from "@/src/features/date";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./index";

export const selectChatMessages = (state: RootState) => state.chat.messages;

export const selectDisplayChatMessages = createSelector(
  [selectChatMessages],
  (messages) => {
    const decoratedMessages = messages.map((message, index) => {
      const prevMessage = messages[index - 1];

      const currentTimeText = getCommonDateText({
        date: message.createDt,
        format: "HH:mm",
      });

      const prevTimeText = prevMessage
        ? getCommonDateText({
            date: prevMessage.createDt,
            format: "HH:mm",
          })
        : null;

      return {
        ...message,
        timeText: currentTimeText,
        showTime: currentTimeText !== prevTimeText,
      };
    });

    return decoratedMessages.reverse();
  },
);
