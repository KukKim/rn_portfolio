import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Setting, ThemeMode } from "../types/setting";

const initialState: Setting = {
  notificationEnabled: true,
  themeMode: "light",
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    updateThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },
  },
});

export const { updateThemeMode } = settingSlice.actions;

export default settingSlice.reducer;
