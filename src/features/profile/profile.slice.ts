import { IUser } from "@/shared/types/globle.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface IAuthState {
  profile: null | IUser;
  isAuthenticated: boolean;
  isLoading: boolean;
}
const initialState: IAuthState = {
  profile: null,
  isAuthenticated: false,
  isLoading: false,
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<any>) => {
      state.isLoading = true;
      state.isAuthenticated = true;
      state.profile = action.payload;
      state.isLoading = false;
    },
  },
});
export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
