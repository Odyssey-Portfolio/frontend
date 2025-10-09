import { FONT_POPPINS, FONTSTYLE_PARAGRAPH2 } from "@/_constants/Fonts";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useEffect, useMemo } from "react";
import Spinner from "../AtomicComponents/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { selectCommentLikeQueue } from "@/_redux/commentLike/commentLikeSelector";
import { AppDispatch } from "@/_redux/store";
import { CommentLikeRequest } from "@/_models/commentLike/CommentLikeRequest";
import { handleCommentLikeQueueItem } from "@/_redux/commentLike/commentLikeSlice";
import { GetCommentDto } from "../../_models/comment/GetCommentDto";

interface CommentLikeButtonProps {
  comment: GetCommentDto;
  commentLikeId: string;
}
export function CommentLikeButton({
  comment,
  commentLikeId,
}: CommentLikeButtonProps) {
  const commentLikeWrapperClassname = `flex flex-row space-x-2 items-center`;
  const numberOfLikesClassname = `${FONT_POPPINS.className} ${FONTSTYLE_PARAGRAPH2}`;
  const commentLikeButtonClassname = `w-8 h-8`;

  const dispatch = useDispatch<AppDispatch>();

  const commentLikeQueue = useSelector(selectCommentLikeQueue);
  const commentLikeItem = useMemo(() => {
    return commentLikeQueue.find(
      (item) => item.commentLikeId === commentLikeId
    );
  }, [commentLikeQueue]);

  //Preloads like data on first load only.
  useEffect(() => {
    if (comment)
      dispatch(
        handleCommentLikeQueueItem({
          commentLikeId: commentLikeId,
          commentLikeResponse: {
            liked: comment.commentLikeDto.liked,
            likes: comment.commentLikeDto.likes,
          },
        })
      );
  }, [dispatch, comment]);

  const toggleLike = () => {
    dispatch(
      handleCommentLikeQueueItem({
        commentLikeId: commentLikeId,
        dislike:
          commentLikeItem && commentLikeItem?.commentLikeResponse?.liked
            ? true
            : false,
        isProcessing: true,
        commentLikeRequest: {
          commentId: comment.commentId,
          userId: "",
        } as CommentLikeRequest,
      })
    );
  };

  return (
    <>
      {commentLikeItem?.isProcessing ? (
        <Spinner size={30} />
      ) : (
        <div className={commentLikeWrapperClassname}>
          <div className={commentLikeButtonClassname} onClick={toggleLike}>
            {commentLikeItem?.commentLikeResponse?.liked ? (
              <HeartSolid className="text-red-500" />
            ) : (
              <HeartOutline />
            )}
          </div>
          <div className={numberOfLikesClassname}>
            {commentLikeItem?.commentLikeResponse?.likes}
          </div>
        </div>
      )}
    </>
  );
}
