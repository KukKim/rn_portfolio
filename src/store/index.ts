import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import userInfoReducer from "./userInfoSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["userInfo"],
};

const reducers = combineReducers({
  userInfo: userInfoReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  // https://claremburu.medium.com/fixing-redux-persist-errors-handling-non-serializable-values-fe625494f9bc
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

export default { store, persistor };
