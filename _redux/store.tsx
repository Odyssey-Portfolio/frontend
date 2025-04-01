import { configureStore } from "@reduxjs/toolkit";
import createBlogModalReducer from './createBlogModal/createBlogModalSlice';
export const store = configureStore({
  reducer: {
    createBlogModal: createBlogModalReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
