import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
export const Store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export type RootState = ReturnType<typeof Store.getState>;
export type Appdispatch = typeof Store.dispatch;
