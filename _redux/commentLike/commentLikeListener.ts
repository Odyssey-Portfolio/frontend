import { CommentLikeQueueItem } from "@/_models/commentLike/CommentLikeQueueItem";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
  finalizeCommentLikeQueueItem,
  handleCommentLikeQueueItem,
} from "./commentLikeSlice";
import { addCommentLike, removeCommentLike } from "../../api/commentLike";
import { CommentLikeRequest } from "../../_models/commentLike/CommentLikeRequest";
import { CommentLikeResponse } from "../../_models/commentLike/CommentLikeResponse";

export const commentLikeListenerMiddleware = createListenerMiddleware();

commentLikeListenerMiddleware.startListening({
  actionCreator: handleCommentLikeQueueItem,
  effect: async (action, listenerApi) => {
    if (!action.payload.commentLikeRequest) return;
    let enhancedQueueItem: CommentLikeQueueItem | undefined;
    if (action.payload.dislike)
      enhancedQueueItem = await removeCommentLikeHandler(action.payload);
    else enhancedQueueItem = await addCommentLikeHandler(action.payload);
    listenerApi.dispatch(finalizeCommentLikeQueueItem(enhancedQueueItem));
  },
});

async function addCommentLikeHandler(item: CommentLikeQueueItem) {
  //Deep clone the commentLikeQueueItem for further modification down below
  const enhancedQueueItem: CommentLikeQueueItem = JSON.parse(
    JSON.stringify(item)
  );
  const response = await addCommentLike(
    enhancedQueueItem.commentLikeRequest as CommentLikeRequest
  );
  enhancedQueueItem.commentLikeResponse = response.data
    .returnData as CommentLikeResponse;
  enhancedQueueItem.isProcessing = false;
  return enhancedQueueItem;
}

async function removeCommentLikeHandler(item: CommentLikeQueueItem) {
  const enhancedQueueItem: CommentLikeQueueItem = JSON.parse(
    JSON.stringify(item)
  );
  const response = await removeCommentLike(
    enhancedQueueItem.commentLikeRequest as CommentLikeRequest
  );
  enhancedQueueItem.commentLikeResponse = response.data
    .returnData as CommentLikeResponse;

  enhancedQueueItem.isProcessing = false;
  return enhancedQueueItem;
}
