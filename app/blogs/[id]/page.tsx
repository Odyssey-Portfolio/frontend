"use client";
import FM_Reveal from "@/_components/FramerMotion/FM_Reveal";
import ParagraphRenderer from "@/_components/ParagraphRenderer";
import { COLOR_PRIMARY } from "@/_constants/Colors";
import {
  FONT_LEXEND,
  FONT_POPPINS,
  FONTSTYLE_HEADING2,
  FONTSTYLE_HEADING4,
  FONTSTYLE_PARAGRAPH1,
} from "@/_constants/Fonts";
import { GetBlog } from "@/_models/GetBlog";
import { selectBlogDetails } from "@/_redux/blogDetailsPage/blogDetailsPageSelector";
import { useSelector } from "react-redux";
import { useIsMediumScreen } from "../../../_hooks/useIsMediumScreen";

export default function BlogDetailsPage() {
  const blogDetails = useSelector(selectBlogDetails);
  const blogDetailsPageClassname = `flex flex-col mt-32 mb-12 space-y-20`;
  return (
    <FM_Reveal className={blogDetailsPageClassname}>
      <>
        {blogDetails && (
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
  blogDetails: GetBlog;
}

function HeadingText(props: BlogDetailsProps) {
  const headingTextClassname = `mx-12 text-center space-y-2`;
  const isMediumScreen = useIsMediumScreen()
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
      <ParagraphRenderer
        isHtml
        customTailwindStyle={`${FONT_POPPINS.className} ${FONTSTYLE_PARAGRAPH1} leading-10`}
        paragraph={props.blogDetails?.content}
      />
    </div>
  );
}
