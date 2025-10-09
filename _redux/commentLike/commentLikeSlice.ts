import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentLikeQueueItem } from "@/_models/commentLike/CommentLikeQueueItem";

interface CommentLikeState {
  commentLikeQueue: CommentLikeQueueItem[];
}
const initialState: CommentLikeState = {
  commentLikeQueue: [],
};

const commentLikeSlice = createSlice({
  name: "commentLike",
  initialState,
  reducers: {
    handleCommentLikeQueueItem: (
      state,
      action: PayloadAction<CommentLikeQueueItem>
    ) => {
      const existingItemIndex = state.commentLikeQueue.findIndex(
        (like) => like.commentLikeId === action.payload.commentLikeId
      );
      if (existingItemIndex === -1) {
        state.commentLikeQueue.push(action.payload);
        return;
      }
      state.commentLikeQueue = [
        ...state.commentLikeQueue.slice(0, existingItemIndex),
        action.payload as CommentLikeQueueItem,
        ...state.commentLikeQueue.slice(existingItemIndex + 1),
      ];
    },
    finalizeCommentLikeQueueItem: (
      state,
      action: PayloadAction<CommentLikeQueueItem>
    ) => {
      const existingItemIndex = state.commentLikeQueue.findIndex(
        (like) => like.commentLikeId === action.payload.commentLikeId
      );
      state.commentLikeQueue = [
        ...state.commentLikeQueue.slice(0, existingItemIndex),
        action.payload as CommentLikeQueueItem,
        ...state.commentLikeQueue.slice(existingItemIndex + 1),
      ];
    },
  },
});
export const { handleCommentLikeQueueItem, finalizeCommentLikeQueueItem } =
  commentLikeSlice.actions;
export default commentLikeSlice.reducer;
