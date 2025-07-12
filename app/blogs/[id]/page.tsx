"use client";
import FM_Reveal from "@/_components/FramerMotion/FM_Reveal";
import ParagraphRenderer from "@/_components/ParagraphRenderer";
import { COLOR_PRIMARY } from "@/_constants/Colors";
import {
  FONT_LEXEND,
  FONTSTYLE_HEADING2,
  FONTSTYLE_HEADING4,
} from "@/_constants/Fonts";
import { useDispatch, useSelector } from "react-redux";
import { useIsMediumScreen } from "../../../_hooks/useIsMediumScreen";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { getBlogByIdThunk } from "../../../_redux/blogDetailsPage/blogDetailsPageThunk";
import { AppDispatch } from "../../../_redux/store";
import Spinner from "../../../_components/AtomicComponents/Spinner";
import { GetBlogByIdDto } from "../../../_models/GetBlogByIdDto";
import {
  selectBlogDetails,
  selectIsLoading,
} from "../../../_redux/blogDetailsPage/blogDetailsPageSelector";
import EmptyList from "../../../_components/EmptyList";

export default function BlogDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const blogDetails = useSelector(selectBlogDetails);
  const isLoading = useSelector(selectIsLoading);
  const spinnerClassname = `col-span-3 flex flex-row justify-center`;
  const blogDetailsPageClassname = `flex flex-col mt-32 mb-12 space-y-20 items-center`;
  useEffect(() => {
    dispatch(getBlogByIdThunk(id));
  }, [dispatch, id]);
  return (
    <FM_Reveal className={blogDetailsPageClassname}>
      <>
        {isLoading && (
          <div className={spinnerClassname}>
            <Spinner />
          </div>
        )}

        {!blogDetails && !isLoading && <EmptyList />}
        {blogDetails && !isLoading && (
          <>
            <HeadingText blogDetails={blogDetails} />
            <ParagraphRendererWrapper blogDetails={blogDetails} />
          </>
        )}
      </>
    </FM_Reveal>
  );
}

interface BlogDetailsProps {
  blogDetails: GetBlogByIdDto;
}

function HeadingText(props: BlogDetailsProps) {
  const headingTextClassname = `mx-12 text-center space-y-2`;
  const isMediumScreen = useIsMediumScreen();
  const h1Classname = `${FONT_LEXEND.className} ${isMediumScreen ? FONTSTYLE_HEADING2 : FONTSTYLE_HEADING4}`;
  return (
    <div className={headingTextClassname}>
      <h1 className={h1Classname} style={{ color: COLOR_PRIMARY }}>
        {props.blogDetails.title}
      </h1>
    </div>
  );
}

function ParagraphRendererWrapper(props: BlogDetailsProps) {
  const paragraphRendererWrapperClassname = `mx-12 md:mx-56`;
  return (
    <div className={paragraphRendererWrapperClassname}>
      <ParagraphRenderer isHtml paragraph={props.blogDetails?.content} />
    </div>
  );
}
