import { createAction } from "@reduxjs/toolkit";

export const setVisibility = createAction<boolean>(
  "createBlogModal/setVisibility"
);
export const setIsLoading = createAction<boolean>(
  "createBlogModal/setIsLoading"
);
export const clearCreateBlogResponse = createAction(
  "createBlogModal/clearCreateBlogResponse"
);
