import { GetBlog } from "@/_models/GetBlog";
import { createAction } from "@reduxjs/toolkit";

export const setBlogDetails = createAction<GetBlog>(
  "blogDetailsPage/setBlogDetails"
);
export const clearBlogDetails = createAction(
  "blogDetailsPage/clearBlogDetails"
);
