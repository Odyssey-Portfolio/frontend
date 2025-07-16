import { createAction } from "@reduxjs/toolkit";
import { GetBlog } from "../../_models/GetBlog";

export const setVisibility = createAction<boolean>("blogModal/setVisibility");
export const setIsLoading = createAction<boolean>("blogModal/setIsLoading");
export const setPreviousBlog = createAction<GetBlog | undefined>(
  "blogModal/setPreviousBlog"
);
export const clearCreateBlogResponse = createAction(
  "blogModal/clearCreateBlogResponse"
);
