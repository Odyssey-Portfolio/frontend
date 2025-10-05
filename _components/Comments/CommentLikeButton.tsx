import { FONT_POPPINS, FONTSTYLE_PARAGRAPH2, FONTSTYLE_SUBTEXT3 } from "@/_constants/Fonts";
import { HeartIcon as HeartOutline} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid} from "@heroicons/react/24/solid";
import { useEffect, useMemo, useState } from "react";
import Spinner from "../AtomicComponents/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { selectCommentLikeQueue } from "@/_redux/commentLike/commentLikeSelector";
import { AppDispatch } from "@/_redux/store";
import { addCommentLikeThunk, removeCommentLikeThunk } from "@/_redux/commentLike/commentLikeThunk";
import { v4 as uuidv4 } from 'uuid';
import { CommentLikeQueueItem } from "@/_models/commentLike/CommentLikeQueueItem";
import { addToCommentLikeQueue } from "@/_redux/commentLike/commentLikeActions";

interface CommentLikeButtonProps{
  commentId: string;
}
export function CommentLikeButton({ commentId }: CommentLikeButtonProps) {
  const commentLikeWrapperClassname = `flex flex-row space-x-2 items-center`;
  const numberOfLikesClassname = `${FONT_POPPINS.className} ${FONTSTYLE_PARAGRAPH2}`;
  const commentLikeButtonClassname = `w-8 h-8`;

  const dispatch = useDispatch<AppDispatch>();
  const commentLikeId = uuidv4();    
  const commentLikeQueue = useSelector(selectCommentLikeQueue);
  const commentLikeItem = useMemo(()=> {
    return commentLikeQueue.find(item => item.commentLikeId === commentLikeId)
  },[commentLikeQueue])
  
  const toggleLike = ()=>{
     dispatch(
        addToCommentLikeQueue({
          commentLikeId: commentLikeId,
          isProcessing: true,
          addCommentLikeRequest: {
            commentId: commentId,
            userId: ""
          }
        })
      );
  }

  return (
    <>
      {commentLikeItem?.isProcessing ? (
        <Spinner size={30} />
      ) : (
        <div className={commentLikeWrapperClassname}>
          <div className={commentLikeButtonClassname} onClick={toggleLike}>
            {commentLikeItem?.addCommentLikeResponse?.liked ? (
              <HeartSolid className="text-red-500" />
            ) : (
              <HeartOutline />
            )}
          </div>
          <div className={numberOfLikesClassname}>
            {commentLikeItem?.addCommentLikeResponse?.likes}
          </div>
        </div>
      )}
    </>
  );
}
