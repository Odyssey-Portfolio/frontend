import { CommentLikeQueueItem } from "@/_models/commentLike/CommentLikeQueueItem";
import { createAction } from "@reduxjs/toolkit";

export const addToCommentLikeQueue = createAction<CommentLikeQueueItem>(
 "commentLike/addToCommentLikeQueue"
);
export const editCommentLikeQueueItem = createAction<CommentLikeQueueItem>(
 "commentLike/editCommentLikeQueueItem"
);
