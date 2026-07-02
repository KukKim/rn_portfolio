import { createSlice } from "@reduxjs/toolkit";
import { Setting } from "../types/setting";

const initialState: Setting = {
  notificationEnabled: true,
  themeMode: "light",
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {},
});

export const {} = settingSlice.actions;

export default settingSlice.reducer;
