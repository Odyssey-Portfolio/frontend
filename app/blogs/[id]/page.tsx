"use client";
import FM_Reveal from "@/_components/FramerMotion/FM_Reveal";
import ParagraphRenderer from "@/_components/ParagraphRenderer";
import { COLOR_PRIMARY, COLOR_SECONDARY } from "@/_constants/Colors";
import {
  FONT_LEXEND,
  FONTSTYLE_HEADING2,
  FONTSTYLE_SUBTEXT1,
} from "@/_constants/Fonts";
import { GetBlog } from "@/_models/GetBlog";
import { selectBlogDetails } from "@/_redux/blogDetailsPage/blogDetailsPageSelector";
import { useSelector } from "react-redux";

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
  const h1Classname = `${FONT_LEXEND.className} ${FONTSTYLE_HEADING2}`;
  const h2Classname = `${FONT_LEXEND.className} ${FONTSTYLE_SUBTEXT1}`;
  return (
    <div className={headingTextClassname}>
      <h1 className={h1Classname} style={{ color: COLOR_PRIMARY }}>
        {props.blogDetails.title}
      </h1>
      <h6 className={h2Classname} style={{ color: COLOR_SECONDARY }}>
        {props.blogDetails.description}
      </h6>
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
