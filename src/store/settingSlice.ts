import { createSlice } from "@reduxjs/toolkit";
import { Setting } from "../types/setting";

const initialState: Setting = {
  notificationEnabled: true,
  theme: "light",
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    updateSttingInfo: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateSttingInfo } = settingSlice.actions;

export default settingSlice.reducer;
