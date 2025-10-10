import { CommentLikeQueueItem } from "@/_models/commentLike/CommentLikeQueueItem";
import {
  ListenerEffectAPI,
  ThunkDispatch,
  UnknownAction,
  createListenerMiddleware,
} from "@reduxjs/toolkit";
import {
  finalizeCommentLikeQueueItem,
  handleCommentLikeQueueItem,
} from "./commentLikeSlice";
import { addCommentLike, removeCommentLike } from "../../api/commentLike";
import { CommentLikeRequest } from "../../_models/commentLike/CommentLikeRequest";
import { CommentLikeResponse } from "../../_models/commentLike/CommentLikeResponse";
import { UNAUTHORIZED } from "../../_constants/ResponseCodes";

import axios from "axios";

export const commentLikeListenerMiddleware = createListenerMiddleware();

type ListenerApiType = ListenerEffectAPI<
  unknown,
  ThunkDispatch<unknown, unknown, UnknownAction>,
  unknown
>;

commentLikeListenerMiddleware.startListening({
  actionCreator: handleCommentLikeQueueItem,
  effect: async (action, listenerApi) => {
    if (!action.payload.commentLikeRequest) return;
    if (action.payload.dislike)
      await removeCommentLikeHandler(action.payload, listenerApi);
    else await addCommentLikeHandler(action.payload, listenerApi);
  },
});

async function addCommentLikeHandler(
  item: CommentLikeQueueItem,
  listenerApi: ListenerApiType
) {
  try {
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
    listenerApi.dispatch(finalizeCommentLikeQueueItem(enhancedQueueItem));
  } catch (error) {
    if (axios.isAxiosError(error) && error.status === UNAUTHORIZED)
      handleUnauthorizedResponse(item, listenerApi);
    console.log(error);
  }
}

async function removeCommentLikeHandler(
  item: CommentLikeQueueItem,
  listenerApi: ListenerApiType
) {
  try {
    const enhancedQueueItem: CommentLikeQueueItem = JSON.parse(
      JSON.stringify(item)
    );
    const response = await removeCommentLike(
      enhancedQueueItem.commentLikeRequest as CommentLikeRequest
    );
    enhancedQueueItem.commentLikeResponse = response.data
      .returnData as CommentLikeResponse;

    enhancedQueueItem.isProcessing = false;
    listenerApi.dispatch(finalizeCommentLikeQueueItem(enhancedQueueItem));
  } catch (error) {
    if (axios.isAxiosError(error) && error.status === UNAUTHORIZED)
      handleUnauthorizedResponse(item, listenerApi);

    console.log(error);
  }
}

function handleUnauthorizedResponse(
  queueItem: CommentLikeQueueItem,
  listenerApi: ListenerApiType
) {
  const enhancedQueueItem: CommentLikeQueueItem = JSON.parse(
    JSON.stringify(queueItem)
  );
  enhancedQueueItem.apiResponse = {
    statusCode: UNAUTHORIZED,
    message: "I'm sorry but have you tried logging in again?",
    returnData: "",
  };
  enhancedQueueItem.isProcessing = false;
  listenerApi.dispatch(finalizeCommentLikeQueueItem(enhancedQueueItem));
}
