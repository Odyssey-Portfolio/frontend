import { configureStore } from "@reduxjs/toolkit";
import blogDetailsPageReducer from "./blogDetailsPage/blogDetailsPageSlice";
import createBlogModalReducer from "./createBlogModal/createBlogModalSlice";
import getBlogsReducer from "./getBlogs/getBlogsSlice";
export const store = configureStore({
  reducer: {
    createBlogModal: createBlogModalReducer,
    getBlogs: getBlogsReducer,
    blogDetailsPage: blogDetailsPageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
