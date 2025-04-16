import { RootState } from "../store";

export const selectVisiblity = (state: RootState) =>
  state.createBlogModal.isVisible;
export const selectIsLoading = (state: RootState) =>
  state.createBlogModal.isLoading;
