import { RootState } from "../store";

export const selectBlogDetails = (state: RootState) =>
  state.blogDetailsPage.blogDetails;
export const selectIsLoading = (state: RootState) =>
  state.blogDetailsPage.isLoading;
