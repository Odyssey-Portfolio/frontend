import { ApiResponse } from "../ApiResponse";
import { AddCommentLikeRequest } from "./AddCommentLikeRequest";
import { AddCommentLikeResponse } from "./AddCommentLikeResponse";
import { RemoveCommentLikeRequest } from "./RemoveCommentLikeRequest";

export interface CommentLikeQueueItem {
  commentLikeId: string;
  dislike: boolean;
  isProcessing?: boolean;
  commentLikeRequest: AddCommentLikeRequest | RemoveCommentLikeRequest;
  commentLikeResponse?: AddCommentLikeResponse;
}