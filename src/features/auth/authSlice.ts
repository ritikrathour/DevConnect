import { IUser } from "@/shared/types/globle.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface IAuthState {
  user: null | IUser;
  isAuthenticated: boolean;
}
const initialState: IAuthState = {
  user: null,
  isAuthenticated: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true;
      state.user = action.payload?.data;
    },
  },
});
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
