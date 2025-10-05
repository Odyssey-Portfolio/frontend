import { COMMENT_ENDPOINT, COMMENT_LIKE_ENDPOINT } from "@/_constants/Endpoints";
import { CreateComment } from "@/_models/comment/CreateComment";
import { GetCommentParams } from "@/_models/comment/GetCommentParams";
import { AddCommentLikeRequest } from "@/_models/commentLike/AddCommentLikeRequest";
import { RemoveCommentLikeRequest } from "@/_models/commentLike/RemoveCommentLikeRequest";
import axiosInstance from "@/lib/axios";
import { queryBuilder } from "@/utils/QueryUtils";

export async function addCommentLike(request: AddCommentLikeRequest) {
  const response = await axiosInstance.post(COMMENT_LIKE_ENDPOINT, request);
  return response;
}

export async function removeCommentLike(request: RemoveCommentLikeRequest) {
  const response = await axiosInstance.delete(`${COMMENT_LIKE_ENDPOINT}`, {
    data: request
  });
  return response;
}
