import { COMMENT_LIKE_ENDPOINT } from "@/_constants/Endpoints";
import { CommentLikeRequest } from "@/_models/commentLike/CommentLikeRequest";
import axiosInstance from "@/lib/axios";

export async function addCommentLike(request: CommentLikeRequest) {
  const response = await axiosInstance.post(COMMENT_LIKE_ENDPOINT, request);
  return response;
}

export async function removeCommentLike(request: CommentLikeRequest) {
  const response = await axiosInstance.delete(`${COMMENT_LIKE_ENDPOINT}`, {
    data: request,
  });
  return response;
}
