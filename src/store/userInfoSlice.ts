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
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      // state = action.payload; => 안됨

      // state.email = action.payload.email;
      // state.name = action.payload.name;
      // state.profileUri = action.payload.profileUri; => 됨

      return action.payload;
    },
  },
});

export const { updateUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
