import { useDispatch, useSelector } from "react-redux";
import { FONTSTYLE_SUBTEXT2, FONT_LEXEND } from "../../_constants/Fonts";
import {
  selectComments,
  selectCreateCommentResponse,
  selectGetCommentPagination,
  selectIsFetchingComments,
} from "../../_redux/comment/commentSelector";
import Comment from "./Comment";
import Spinner from "../AtomicComponents/Spinner";
import EmptyList from "../EmptyList";
import { useEffect } from "react";
import { AppDispatch } from "../../_redux/store";
import { getCommentThunk } from "../../_redux/comment/commentThunk";
import { GetBlogByIdDto } from "../../_models/GetBlogByIdDto";
import CommentBox from "./CommentBox";
import { setSnackbarMessage } from "../../_redux/snackbar/snackbarActions";
import { nanoid } from "@reduxjs/toolkit";
import { CREATED, SUCCESS, UNAUTHORIZED } from "../../_constants/ResponseCodes";
import { useInfiniteScroll } from "../../_hooks/useInfiniteScroll";
import {
  bumpPageNumber,
  clearComments,
} from "../../_redux/comment/commentActions";
interface CommentContainerProps {
  blogDetails: GetBlogByIdDto;
}
export default function CommentContainer(props: CommentContainerProps) {
  const commentContainerClassname = `w-full flex flex-col space-y-5 `;
  return (
    <div className={commentContainerClassname}>
      <CommentBox {...props} />
      <HeaderSection />
      <CommentsSection blogDetails={props.blogDetails} />
    </div>
  );
}
function HeaderSection() {
  const headerSectionClassname = `flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0`;
  const commentTextClassname = `${FONT_LEXEND.className} ${FONTSTYLE_SUBTEXT2} text-bold`;
  return (
    <div className={headerSectionClassname}>
      <div className={commentTextClassname}>Comments</div>
      {/*<FilterCommentsButton />*/}
    </div>
  );
}

//function FilterCommentsButton() {
//  const filterCommentsButtonClassname = `flex flex-row items-center space-x-2`;
//  const filterTextClassname = `${FONT_POPPINS.className} ${FONTSTYLE_SUBTEXT2}`;
//  return (
//    <div className={filterCommentsButtonClassname}>
//      <Funnel />
//      <div className={filterTextClassname}>Filter</div>
//    </div>
//  );
//}

function CommentsSection(props: CommentContainerProps) {
  const blogId = props.blogDetails.id;
  const comments = useSelector(selectComments);
  const apiResponse = useSelector(selectCreateCommentResponse);
  const isFetchingComments = useSelector(selectIsFetchingComments);
  const getCommentPagination = useSelector(selectGetCommentPagination);
  const commentsSectionClassname = `w-full flex flex-col space-y-12`;
  const commentSpaceClassname = `flex flex-col`;
  const dispatch = useDispatch<AppDispatch>();

  const shouldFetchMore = () => {
    const pageNumber = getCommentPagination.pageNumber;
    const totalPages = getCommentPagination.totalPages;
    const pageNumberWithinPageSize = pageNumber < totalPages;
    const firstFetchCondition = !comments?.length;
    const consecutiveFetchesCondition =
      !isFetchingComments && pageNumberWithinPageSize;
    return firstFetchCondition || consecutiveFetchesCondition;
  };
  const fetchMoreCallback = () => {
    if (shouldFetchMore()) dispatch(bumpPageNumber());
  };
  useInfiniteScroll({
    fetchMoreCallback: fetchMoreCallback,
  });

  useEffect(() => {
    dispatch(
      getCommentThunk({
        blogId: blogId,
        pageNumber: getCommentPagination.pageNumber,
        pageSize: getCommentPagination.pageSize,
      })
    );
  }, [dispatch, blogId, getCommentPagination.pageNumber]);

  useEffect(() => {
    if (apiResponse && apiResponse.statusCode === UNAUTHORIZED)
      dispatch(
        setSnackbarMessage({
          id: nanoid(),
          message: apiResponse.message,
          type: "error",
        })
      );
    else if (
      apiResponse &&
      (apiResponse.statusCode === CREATED || apiResponse.statusCode === SUCCESS)
    ) {
      dispatch(
        setSnackbarMessage({
          id: nanoid(),
          message: apiResponse.message,
          type: "success",
        })
      );
    }
    return () => {
      dispatch(clearComments());
    };
  }, [dispatch, apiResponse]);

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
