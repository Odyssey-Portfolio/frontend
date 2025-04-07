import { configureStore } from "@reduxjs/toolkit";
import createBlogModalReducer from "./createBlogModal/createBlogModalSlice";
import getBlogsReducer from "./getBlogs/getBlogsSlice";
export const store = configureStore({
  reducer: {
    createBlogModal: createBlogModalReducer,
    getBlogs: getBlogsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
