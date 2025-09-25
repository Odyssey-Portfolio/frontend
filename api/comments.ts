import { COMMENT_ENDPOINT } from "../_constants/Endpoints";
import { CreateComment } from "../_models/comment/CreateComment";
import { GetCommentParams } from "../_models/comment/GetCommentParams";
import axiosInstance from "../lib/axios";
import { queryBuilder } from "../utils/QueryUtils";

export async function createComment(comment: CreateComment) {
  const response = await axiosInstance.post(COMMENT_ENDPOINT, comment);
  return response;
}

export async function getComments(params: GetCommentParams) {
  const query = queryBuilder(params);
  const response = await axiosInstance.get(`${COMMENT_ENDPOINT}${query}`);
  return response;
}
