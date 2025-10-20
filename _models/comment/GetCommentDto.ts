export interface GetCommentDto {
  userId: string;
  commentId: string;
  userName: string;
  elapsedTime: string;
  content: string;
  commentLikeDto: CommentLikeDto;
  avatar: string;
}

export interface CommentLikeDto {
  liked: boolean;
  likes: number;
}
