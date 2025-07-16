import { RootState } from "../store";

export const selectVisiblity = (state: RootState) => state.blogModal.isVisible;
export const selectUpdateMode = (state: RootState) =>
  state.blogModal.isUpdateMode;
export const selectBlog = (state: RootState) => state.blogModal.selectedBlog;
export const selectPreviousBlog = (state: RootState) =>
  state.blogModal.previousBlog;
export const selectBlogDetails = (state: RootState) =>
  state.blogModal.selectedBlogDetails;
export const selectIsLoading = (state: RootState) => state.blogModal.isLoading;
export const selectCreateBlogResponse = (state: RootState) =>
  state.blogModal.apiResponse;
