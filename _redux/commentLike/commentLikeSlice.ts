import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentLikeQueueItem } from "@/_models/commentLike/CommentLikeQueueItem";
import { AddCommentLikeResponse } from "@/_models/commentLike/AddCommentLikeResponse";

interface CommentLikeState {
  // isProcessing: boolean;
  commentLikeQueue: CommentLikeQueueItem[];
  // commentLikeResponse: ApiResponse | undefined;
}
const initialState: CommentLikeState = {
  // isProcessing: false,
  commentLikeQueue: [],
  // commentLikeResponse: undefined,
};

const commentLikeSlice = createSlice({
  name: "commentLike",
  initialState,
  reducers: {
    addToCommentLikeQueue: (
      state,
      action: PayloadAction<CommentLikeQueueItem>
    ) => {
      const existingItemIndex = state.commentLikeQueue.findIndex(
        (like) => like.commentLikeId === action.payload.commentLikeId
      );
      if (existingItemIndex === -1) state.commentLikeQueue.push(action.payload);
      state.commentLikeQueue = [
        ...state.commentLikeQueue.slice(0, existingItemIndex),
        action.payload as CommentLikeQueueItem,
        ...state.commentLikeQueue.slice(existingItemIndex + 1),
      ];
    },
    editCommentLikeQueueItem: (
      state,
      action: PayloadAction<CommentLikeQueueItem>
    ) => {
      const existingItemIndex = state.commentLikeQueue.findIndex(
        (like) => like.commentLikeId === action.payload.commentLikeId
      );
      if (existingItemIndex === -1) return;
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
      if (existingItemIndex === -1) return;
      // Clone the item and update its field

      // Clone the array with updated item
      state.commentLikeQueue = [
        ...state.commentLikeQueue.slice(0, existingItemIndex),
        action.payload as CommentLikeQueueItem,
        ...state.commentLikeQueue.slice(existingItemIndex + 1),
      ];
    },
  },
});
export const { addToCommentLikeQueue, finalizeCommentLikeQueueItem } =
  commentLikeSlice.actions;
export default commentLikeSlice.reducer;
