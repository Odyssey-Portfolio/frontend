import { RootState } from "../store";

export const selectCommentLikeQueue = (state: RootState) =>
  state.commentLike.commentLikeQueue;


