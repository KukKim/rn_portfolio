import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Setting } from "../shared/types/setting";

export type Language = "en" | "ko";

const initialState: Setting = {
  notificationEnabled: true,
  themeMode: "light",
  language: "en",
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = settingSlice.actions;

export default settingSlice.reducer;
