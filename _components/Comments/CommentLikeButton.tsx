import { FONT_POPPINS, FONTSTYLE_PARAGRAPH2, FONTSTYLE_SUBTEXT3 } from "@/_constants/Fonts";
import { HeartIcon as HeartOutline} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid} from "@heroicons/react/24/solid";
import { useState } from "react";
import Spinner from "../AtomicComponents/Spinner";

export function CommentLikeButton() {
  const commentLikeWrapperClassname = `flex flex-row space-x-2 items-center`
  const commentLikeButtonClassname = `w-8 h-8`
  const numberOfLikesClassname = `${FONT_POPPINS.className} ${FONTSTYLE_PARAGRAPH2}`
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  return (
    <>
      {isLoading ? (
        <Spinner size={30}/>
      ) : (
        <div className={commentLikeWrapperClassname}>
          <div
            className={commentLikeButtonClassname}
            onClick={() => setLiked(!liked)}
          >
            {liked ? <HeartSolid className="text-red-500" /> : <HeartOutline />}
          </div>
          <div className={numberOfLikesClassname}>500</div>
        </div>
      )}
    </>
  );
}
