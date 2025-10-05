import { ApiResponse } from "../ApiResponse";
import { AddCommentLikeRequest } from "./AddCommentLikeRequest";
import { AddCommentLikeResponse } from "./AddCommentLikeResponse";

export interface CommentLikeQueueItem {
  commentLikeId: string;
  isProcessing?: boolean;
  addCommentLikeRequest: AddCommentLikeRequest;
  addCommentLikeResponse?: AddCommentLikeResponse;
}