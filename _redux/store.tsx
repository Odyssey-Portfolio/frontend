import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import blogDetailsPageReducer from "./blogDetailsPage/blogDetailsPageSlice";
import blogModalReducer from "./blogModal/blogModalSlice";
import getBlogsReducer from "./getBlogs/getBlogsSlice";
import snackbarReducer from "./snackbar/snackbarSlice";
import commentReducer from "./comment/commentSlice";
import commentLikeReducer from "./commentLike/commentLikeSlice"
import wavyBackgroundReducer from "./wavyBackground/wavyBackgroundSlice";
import { commentLikeListenerMiddleware } from "./commentLike/commentLikeThunk";
export const store = configureStore({
  reducer: {
    blogModal: blogModalReducer,
    getBlogs: getBlogsReducer,
    blogDetailsPage: blogDetailsPageReducer,
    auth: authReducer,
    snackbar: snackbarReducer,
    wavyBackground: wavyBackgroundReducer,
    comment: commentReducer,
    commentLike: commentLikeReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(commentLikeListenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
