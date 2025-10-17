import { RootState } from "../store";

export const selectIsLoading = (state: RootState) => state.user.isLoading;
export const selectUserData = (state: RootState) => state.user.apiResponse;
export const selectUserMode = (state: RootState) => state.user.userMode;
export const selectLoggedInUser = (state: RootState) => state.user.loggedInUser;
