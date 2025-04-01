"use client";
import BlogCard from "@/_components/BlogCard";
import CreateBlogModal from "@/_components/CreateBlogModal";
import ExpandOnFocusButton from "@/_components/ExpandOnFocusButton";
import FM_Reveal from "@/_components/FramerMotion/FM_Reveal";
import SearchBar from "@/_components/SearchBar";
import { COLOR_PRIMARY, COLOR_SECONDARY } from "@/_constants/Colors";
import { DUMMYTEXT_LOREMIPSUMSHORT } from "@/_constants/DummyText";
import {
  FONT_LEXEND,
  FONTSTYLE_HEADING1,
  FONTSTYLE_SUBTEXT1,
} from "@/_constants/Fonts";
import { selectVisiblity } from "@/_redux/createBlogModal/createBlogModalSelector";
import { setVisibility } from "@/_redux/createBlogModal/createBlogModalSlice";
import { FunnelIcon, PencilIcon } from "@heroicons/react/16/solid";
import { useDispatch, useSelector } from "react-redux";
import { ExpandOnFocusButtonProps } from "../../_components/ExpandOnFocusButton";

export default function BlogsPage() {
  const blogPageClassname = `flex flex-col mt-32 mx-24 mb-12   
                                items-center justify-between space-y-20`;
  const timelineClassname = `fixed top-1/2 transform -translate-y-1/2 right-2`;
  return (
    <div className={blogPageClassname}>
      <HeadingText />
      <BlogPageActions />
      <BlogList />
    </div>
  );
}

function HeadingText() {
  const headingTextClassname = `text-center space-y-2`;
  const h1Classname = `${FONT_LEXEND.className} ${FONTSTYLE_HEADING1}`;
  const h2Classname = `${FONT_LEXEND.className} ${FONTSTYLE_SUBTEXT1}`;
  return (
    <FM_Reveal className={headingTextClassname}>
      <>
        <h1 className={h1Classname} style={{ color: COLOR_PRIMARY }}>
          Blogs
        </h1>
        <h6 className={h2Classname} style={{ color: COLOR_SECONDARY }}>
          A list of Blogs...
        </h6>
      </>
    </FM_Reveal>
  );
}
function BlogPageActions() {
  const blogListClassname = `flex flex-row justify-center  w-full gap-5`;
  const buttonGrids = `flex flex-row items-center gap-5 relative`;  
  
  const modalVisibility = useSelector(selectVisiblity)
  const dispatch = useDispatch()
  const featureButtons: ExpandOnFocusButtonProps[] = [
    {
      icon: <FunnelIcon />,
      label: "Filter by...",
    },
    {
      icon: <PencilIcon />,
      label: "New Post",
      action: () => dispatch(setVisibility(true))
    },
  ];  
  return (
    <div className={blogListClassname}>
      <SearchBar />   
      <div className={buttonGrids}>
        {featureButtons.map((btn, key) => {
          return <ExpandOnFocusButton key={key} {...btn} />;
        })}
      </div>
      {modalVisibility == true && (
        <CreateBlogModal          
        />
      )}
    </div>
  );
}

function BlogList() {
  const arr = [0, 1, 2, 3, 4];
  const blogListClassname = `grid grid-cols-3 gap-5`;
  return (
    <div className={blogListClassname}>
      {arr.map((ar, key) => {
        return (
          <BlogCard
            key={key}
            title="Lorem ipsum"
            subtitle={DUMMYTEXT_LOREMIPSUMSHORT}
            image="/mtb-touring.jpg"
            url="asasas"
          />
        );
      })}
    </div>
  );
}
