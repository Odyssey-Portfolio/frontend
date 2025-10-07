import { CommentLikeRequest } from "./CommentLikeRequest";
import { CommentLikeResponse } from "./CommentLikeResponse";

export interface CommentLikeQueueItem {
  commentLikeId: string;
  dislike?: boolean;
  isProcessing?: boolean;
  commentLikeRequest?: CommentLikeRequest;
  commentLikeResponse?: CommentLikeResponse;
}
