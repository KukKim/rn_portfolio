import { createSlice } from "@reduxjs/toolkit";

type UserInfoState = {
  name: string;
  email: string;
  profileUri: string;
  updateDt?: Date;
};

const initialState: UserInfoState = {
  name: "",
  email: "",
  profileUri: "",
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      state = action.payload;
    },
  },
});

export const { updateUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
