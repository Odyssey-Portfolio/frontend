import { RootState } from "../store";

export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthData = (state: RootState) => state.auth.data;
// export const selectLoggedInUser = (state: RootState) => state.auth.loggedInUser;
