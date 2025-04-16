import { RootState } from "../store";

export const selectBlogDetails = (state: RootState) =>
  state.blogDetailsPage.blogDetails;
