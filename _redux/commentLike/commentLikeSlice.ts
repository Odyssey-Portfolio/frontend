import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentLikeQueueItem } from "@/_models/commentLike/CommentLikeQueueItem";
import { AddCommentLikeResponse } from "@/_models/commentLike/AddCommentLikeResponse";



interface CommentLikeState {
  // isProcessing: boolean;
  commentLikeQueue: CommentLikeQueueItem[]
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
    addToCommentLikeQueue: (state, action: PayloadAction<CommentLikeQueueItem>) => {
       const existingItem = state.commentLikeQueue.find(
        (like) => like.commentLikeId === action.payload.commentLikeId
      );
      if (!existingItem) state.commentLikeQueue.push(action.payload);
    },
    finalizeCommentLikeQueueItem:(state, action: PayloadAction<CommentLikeQueueItem>) => {
      const existingItem = state.commentLikeQueue.find(
        (like) => like.commentLikeId === action.payload.commentLikeId
      );
      if(!existingItem) return;      
      existingItem.addCommentLikeResponse = action.payload.addCommentLikeResponse as AddCommentLikeResponse
      state.commentLikeQueue.push(action.payload);
    },
  },
});
export const { addToCommentLikeQueue, finalizeCommentLikeQueueItem } = commentLikeSlice.actions;
export default commentLikeSlice.reducer;
