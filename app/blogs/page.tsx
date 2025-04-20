"use client";
import Authorizer from "@/_components/Authorizer";
import BlogCard from "@/_components/BlogCard";
import CreateBlogModal from "@/_components/CreateBlogModal";
import ExpandOnFocusButton from "@/_components/ExpandOnFocusButton";
import FM_Reveal from "@/_components/FramerMotion/FM_Reveal";
import LoadingOverlay from "@/_components/LoadingOverlay";
import SearchBar from "@/_components/SearchBar";
import { ROLE_ADMIN } from "@/_constants/Auth";
import { COLOR_PRIMARY, COLOR_SECONDARY } from "@/_constants/Colors";
import {
  FONT_LEXEND,
  FONTSTYLE_HEADING1,
  FONTSTYLE_SUBTEXT1,
} from "@/_constants/Fonts";
import {
  selectIsLoading as selectIsCreatingBlog,
  selectVisiblity,
} from "@/_redux/createBlogModal/createBlogModalSelector";
import { setVisibility } from "@/_redux/createBlogModal/createBlogModalSlice";
import {
  selectBlogs,
  selectIsLoading as selectIsGettingBlogs,
  selectSearchParams,
} from "@/_redux/getBlogs/getBlogsSelector";
import { getBlogsThunk } from "@/_redux/getBlogs/getBlogsThunk";
import { AppDispatch } from "@/_redux/store";
import { FunnelIcon, PencilIcon } from "@heroicons/react/16/solid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function BlogsPage() {
  const blogPageClassname = `flex flex-col mt-32 mx-24 mb-12   
                                items-center justify-between space-y-20`;
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
  const modalVisibility = useSelector(selectVisiblity);
  const dispatch = useDispatch();
  const featureButtons: any[] = [
    {
      icon: <FunnelIcon />,
      label: "Filter by...",
    },
    {
      icon: <PencilIcon />,
      label: "New Post",
      action: () => dispatch(setVisibility(true)),
      authorize: true,
    },
  ];
  return (
    <div className={blogListClassname}>
      <SearchBar />
      <div className={buttonGrids}>
        {featureButtons.map((btn, key) => {
          if (btn.authorize)
            return (
              <Authorizer key={key} roles={[ROLE_ADMIN]}>
                <ExpandOnFocusButton
                  key={key}
                  icon={btn.icon}
                  label={btn.label}
                  action={btn.action}
                />
              </Authorizer>
            );
          return (
            <ExpandOnFocusButton
              key={key}
              icon={btn.icon}
              label={btn.label}
              action={btn.action}
            />
          );
        })}
      </div>
      {modalVisibility == true && <CreateBlogModal />}
    </div>
  );
}

function BlogList() {
  const blogListClassname = `grid grid-cols-3 gap-5`;
  const blogs = useSelector(selectBlogs);
  const dispatch = useDispatch<AppDispatch>();
  const isCreatingBlog = useSelector(selectIsCreatingBlog);
  const isGettingBlogs = useSelector(selectIsGettingBlogs);
  const searchParams = useSelector(selectSearchParams);
  useEffect(() => {
    dispatch(getBlogsThunk(searchParams));
  }, []);

  return (
    <div className={blogListClassname}>
      {blogs.map((blog, key) => {
        return <BlogCard key={key} isImageB64 blog={blog} />;
      })}
      {(isCreatingBlog || isGettingBlogs) && <LoadingOverlay />}
    </div>
  );
}
