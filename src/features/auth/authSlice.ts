import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface IUser {
  userName: string;
  email: string;
  bio: string;
}
interface IAuthState {
  user: null | IUser;
}
const initialState: IAuthState = {
  user: {
    userName: "",
    email: "",
    bio: "",
  },
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuthState>) => {
      state.user = action.payload.user;
    },
  },
});
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
