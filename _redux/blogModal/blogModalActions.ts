import { createAction } from "@reduxjs/toolkit";

export const setVisibility = createAction<boolean>("blogModal/setVisibility");
export const setIsLoading = createAction<boolean>("blogModal/setIsLoading");
export const clearCreateBlogResponse = createAction(
  "blogModal/clearCreateBlogResponse"
);
