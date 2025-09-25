import { useDispatch, useSelector } from "react-redux";
import {
  FONTSTYLE_SUBTEXT2,
  FONT_LEXEND,
  FONT_POPPINS,
} from "../../_constants/Fonts";
import {
  selectComments,
  selectIsFetchingComments,
} from "../../_redux/comment/commentSelector";
import Comment from "./Comment";
import { Funnel } from "lucide-react";
import Spinner from "../AtomicComponents/Spinner";
import EmptyList from "../EmptyList";
import { useEffect } from "react";
import { AppDispatch } from "../../_redux/store";
import { getCommentThunk } from "../../_redux/comment/commentThunk";
import { GetBlogByIdDto } from "../../_models/GetBlogByIdDto";
interface CommentContainerProps {
  blogDetails: GetBlogByIdDto;
}
export default function CommentContainer(props: CommentContainerProps) {
  const commentContainerClassname = `w-full md:w-4/5 flex flex-col space-y-12 `;
  return (
    <div className={commentContainerClassname}>
      <HeaderSection />
      <CommentsSection {...props} />
    </div>
  );
}
function HeaderSection() {
  const headerSectionClassname = `flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0`;
  const commentTextClassname = `${FONT_LEXEND.className} ${FONTSTYLE_SUBTEXT2} text-bold`;
  return (
    <div className={headerSectionClassname}>
      <div className={commentTextClassname}>Comments</div>
      <FilterCommentsButton />
    </div>
  );
}

function FilterCommentsButton() {
  const filterCommentsButtonClassname = `flex flex-row items-center space-x-2`;
  const filterTextClassname = `${FONT_POPPINS.className} ${FONTSTYLE_SUBTEXT2}`;
  return (
    <div className={filterCommentsButtonClassname}>
      <Funnel />
      <div className={filterTextClassname}>Filter</div>
    </div>
  );
}

function CommentsSection(props: CommentContainerProps) {
  const comments = useSelector(selectComments);
  const isFetchingComments = useSelector(selectIsFetchingComments);
  const commentsSectionClassname = `w-full flex flex-col space-y-12 items-center`;
  const commentSpaceClassname = `flex flex-col`;
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(
      getCommentThunk({
        blogId: props.blogDetails.id,
        pageNumber: 1,
        pageSize: 5,
      })
    );
  }, [props.blogDetails]);

  return (
    <div className={commentsSectionClassname}>
      {isFetchingComments && !comments && <Spinner />}
      {!isFetchingComments && !comments && <EmptyList />}
      {!isFetchingComments &&
        comments &&
        comments.map((comment, key) => {
          return (
            <div className={commentSpaceClassname} key={key}>
              <Comment comment={comment} />
            </div>
          );
        })}
    </div>
  );
}
