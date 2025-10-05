import { GetCommentParams } from "@/_models/comment/GetCommentParams";
import { AddCommentLikeRequest } from "@/_models/commentLike/AddCommentLikeRequest";
import { CommentLikeQueueItem } from "@/_models/commentLike/CommentLikeQueueItem";
import { RemoveCommentLikeRequest } from "@/_models/commentLike/RemoveCommentLikeRequest";
import { addCommentLike, removeCommentLike } from "@/api/commentLike";
import { getComments } from "@/api/comments";
import { createAsyncThunk, createListenerMiddleware } from "@reduxjs/toolkit";
import axios from "axios";
import { addToCommentLikeQueue, finalizeCommentLikeQueueItem } from "./commentLikeSlice";
import { AddCommentLikeResponse } from "@/_models/commentLike/AddCommentLikeResponse";


// Create the middleware instance and methods
export const commentLikeListenerMiddleware = createListenerMiddleware()

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
commentLikeListenerMiddleware.startListening({
  actionCreator: addToCommentLikeQueue,
  effect: async (action, listenerApi) => {
    // Run whatever additional side-effect-y logic you want here
    const commentLikeQueueItem = action.payload
    // const response = await addCommentLike(commentLikeQueueItem.addCommentLikeRequest);
    // commentLikeQueueItem.addCommentLikeResponse = response.data as AddCommentLikeResponse
    commentLikeQueueItem['addCommentLikeResponse'] = {
      liked: true,
      likes: 501
    }
    listenerApi.dispatch(finalizeCommentLikeQueueItem(commentLikeQueueItem))
  }
})


export const addCommentLikeThunk = createAsyncThunk(
  "commentLike/add",
  async (queueItem: CommentLikeQueueItem, thunkAPI) => {
    try {
      const response = await addCommentLike(queueItem.addCommentLikeRequest);
      // queueItem.addCommentLikeResponse = response.data;
      queueItem.addCommentLikeResponse = {
        liked: true,
        likes: 501,
      }
      return queueItem;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data || "Something went wrong"
        );
      }
      console.log(error);
    }
  }
);

export const removeCommentLikeThunk = createAsyncThunk(
  "commentLike/remove",
  async (params: RemoveCommentLikeRequest, thunkAPI) => {
    try {
      const response = await removeCommentLike(params);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data || "Something went wrong"
        );
      }
      console.log(error);
    }
  }
);



