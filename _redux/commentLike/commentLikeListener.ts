import { GetCommentParams } from "@/_models/comment/GetCommentParams";
import { AddCommentLikeRequest } from "@/_models/commentLike/AddCommentLikeRequest";
import { CommentLikeQueueItem } from "@/_models/commentLike/CommentLikeQueueItem";
import { RemoveCommentLikeRequest } from "@/_models/commentLike/RemoveCommentLikeRequest";
import { addCommentLike, removeCommentLike } from "@/api/commentLike";
import { getComments } from "@/api/comments";
import { createAsyncThunk, createListenerMiddleware } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import {
  finalizeCommentLikeQueueItem,
  handleCommentLikeQueueItem,
} from "./commentLikeSlice";

export const commentLikeListenerMiddleware = createListenerMiddleware();

commentLikeListenerMiddleware.startListening({
  actionCreator: handleCommentLikeQueueItem,
  effect: async (action, listenerApi) => {
    let enhancedQueueItem: CommentLikeQueueItem | undefined;
    if (action.payload.dislike)
      enhancedQueueItem = await removeCommentLikeHandler(action.payload);
    else enhancedQueueItem = await addCommentLikeHandler(action.payload);
    listenerApi.dispatch(finalizeCommentLikeQueueItem(enhancedQueueItem));
  },
});

async function addCommentLikeHandler(item: CommentLikeQueueItem) {
  //Deep clone the commentLikeQueueItem for further modification down below
  let enhancedQueueItem: CommentLikeQueueItem = JSON.parse(
    JSON.stringify(item)
  );
  // const response = await addCommentLike(enhancedQueueItem.commentLikeRequest as AddCommentLikeRequest);
  // enhancedQueueItem.commentLikeResponse = response.data as AddCommentLikeResponse;
  await new Promise((resolve) => setTimeout(resolve, 3000));
  enhancedQueueItem.commentLikeResponse = {
    liked: true,
    likes: 501,
  };
  enhancedQueueItem.isProcessing = false;
  return enhancedQueueItem;
}

async function removeCommentLikeHandler(item: CommentLikeQueueItem) {
  let enhancedQueueItem: CommentLikeQueueItem = JSON.parse(
    JSON.stringify(item)
  );
  // const response = await removeCommentLike(
  //   enhancedQueueItem.commentLikeRequest as RemoveCommentLikeRequest
  // );
  // enhancedQueueItem.commentLikeResponse =
  //   response.data as AddCommentLikeResponse;
  await new Promise((resolve) => setTimeout(resolve, 3000));
  enhancedQueueItem.commentLikeResponse = {
    liked: false,
    likes: 500,
  };
  enhancedQueueItem.isProcessing = false;
  return enhancedQueueItem;
}