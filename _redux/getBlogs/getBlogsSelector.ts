import { RootState } from "../store";

export const selectBlogs = (state: RootState) => state.getBlogs.blogs;
export const selectIsLoading = (state: RootState) => state.getBlogs.isLoading;
export const selectSearchParams = (state: RootState) =>
  state.getBlogs.searchParams;
