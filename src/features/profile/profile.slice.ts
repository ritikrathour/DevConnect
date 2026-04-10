import { IUser } from "@/shared/types/globle.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface IAuthState {
  profile: null | IUser;
  isAuthenticated: boolean;
}
const initialState: IAuthState = {
  profile: null,
  isAuthenticated: false,
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true;
      state.profile = action.payload;
    },
  },
});
export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
