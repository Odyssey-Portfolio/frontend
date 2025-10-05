export interface GetCommentDto {
  userId: string;
  commentId: string; //todo: add commentId to backend response
  userName: string;
  elapsedTime: string;
  content: string;
}
