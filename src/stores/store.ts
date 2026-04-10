import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/profile/profile.slice";
export const Store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});
export type RootState = ReturnType<typeof Store.getState>;
export type Appdispatch = typeof Store.dispatch;
