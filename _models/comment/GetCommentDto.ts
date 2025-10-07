export interface GetCommentDto {
  userId: string;
  commentId: string;
  userName: string;
  elapsedTime: string;
  content: string;
  commentLikeDto: CommentLikeDto;
}

export interface CommentLikeDto {
  liked: boolean;
  likes: number;
}
