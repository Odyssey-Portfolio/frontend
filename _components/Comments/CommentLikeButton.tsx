import { FONT_POPPINS, FONTSTYLE_PARAGRAPH2 } from "@/_constants/Fonts";
import { HeartIcon as HeartOutline} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid} from "@heroicons/react/24/solid";
import { useMemo } from "react";
import Spinner from "../AtomicComponents/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { selectCommentLikeQueue } from "@/_redux/commentLike/commentLikeSelector";
import { AppDispatch } from "@/_redux/store";
import { addToCommentLikeQueue, editCommentLikeQueueItem } from "@/_redux/commentLike/commentLikeActions";

interface CommentLikeButtonProps{
  commentId: string;
  commentLikeId: string;
}
export function CommentLikeButton({ commentId, commentLikeId }: CommentLikeButtonProps) {
  const commentLikeWrapperClassname = `flex flex-row space-x-2 items-center`;
  const numberOfLikesClassname = `${FONT_POPPINS.className} ${FONTSTYLE_PARAGRAPH2}`;
  const commentLikeButtonClassname = `w-8 h-8`;

  const dispatch = useDispatch<AppDispatch>();
  
  const commentLikeQueue = useSelector(selectCommentLikeQueue);
  const commentLikeItem = useMemo(()=> {
    return commentLikeQueue.find(
      (item) => item.commentLikeId === commentLikeId
    );
  },[commentLikeQueue])
  
  const toggleLike = ()=>{
    if(!commentLikeItem?.addCommentLikeResponse?.liked)
    dispatch(
       addToCommentLikeQueue({
         commentLikeId: commentLikeId,
         isProcessing: true,
         addCommentLikeRequest: {
           commentId: commentId,
           userId: "",
         },
       })
     );
     else{
      dispatch(
       editCommentLikeQueueItem({
         commentLikeId: commentLikeId,
         isProcessing: true,
         addCommentLikeRequest: {
           commentId: commentId,
           userId: "",
         },
       })
     );
     }
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
