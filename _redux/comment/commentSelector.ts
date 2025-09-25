import { RootState } from "../store";

export const selectComments = (state: RootState) => state.comment.comments;
export const selectIsFetchingComments = (state: RootState) =>
  state.comment.isFetchingComments;
export const selectIsCreatingComment = (state: RootState) =>
  state.comment.isCreatingComment;
