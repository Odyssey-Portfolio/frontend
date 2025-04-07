import { RootState } from "../store";

export const selectBlogs = (state: RootState) => state.getBlogs.blogs;
export const selectIsLoading = (state: RootState) => state.getBlogs.isLoading;
