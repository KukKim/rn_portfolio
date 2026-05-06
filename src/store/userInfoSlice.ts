import { createSlice } from "@reduxjs/toolkit";
import { Auth } from "../types/auth";

const initialState: Auth = {
  name: "",
  email: "",
  imgUri: "",
  password: "",
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
      // state.imgUri = action.payload.imgUri; => 됨
      // state.password = action.payload.password; => 됨

      return action.payload;
    },
    deleteUserInfo: (state) => {
      return initialState;
    },
  },
});

export const { updateUserInfo, deleteUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
