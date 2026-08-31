import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDeviceLanguage, normalizeLanguage } from "../i18n";
import { Setting } from "../shared/types/setting";

const initialState: Setting = {
  notificationEnabled: true,
  themeMode: "light",
  language: getDeviceLanguage(),
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = normalizeLanguage(action.payload);
    },
  },
});

export const { setLanguage } = settingSlice.actions;

export default settingSlice.reducer;
