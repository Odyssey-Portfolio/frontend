"use client";
import Spinner from "@/_components/AtomicComponents/Spinner";
import Authorizer from "@/_components/Authorizer";
import BlogCard from "@/_components/BlogCard";
import BlogModal from "@/_components/BlogModal";
import EmptyList from "@/_components/EmptyList";
import ExpandOnFocusButton from "@/_components/ExpandOnFocusButton";
import FM_Reveal from "@/_components/FramerMotion/FM_Reveal";
import LoadingOverlay from "@/_components/LoadingOverlay";
import Modal from "@/_components/Modal";
import SearchBar from "@/_components/SearchBar";
import { ROLE_ADMIN } from "@/_constants/Auth";
import { COLOR_PRIMARY, COLOR_SECONDARY } from "@/_constants/Colors";
import {
  FONT_LEXEND,
  FONTSTYLE_HEADING1,
  FONTSTYLE_SUBTEXT2,
} from "@/_constants/Fonts";
import {
  CONTENT_BLOG_ABOUT_CONTENT,
  CONTENT_BLOG_ABOUT_TITLE,
} from "@/_contents/Blog";
import { useDebounce } from "@/_hooks/useDebounce";
import {
  selectIsLoading as selectIsCreatingBlog,
  selectVisiblity,
} from "@/_redux/blogModal/blogModalSelector";
import {
  setIsUpdateMode,
  setVisibility,
} from "@/_redux/blogModal/blogModalSlice";
import {
  selectBlogs,
  selectIsLoading as selectIsGettingBlogs,
  selectSearchParams,
} from "@/_redux/getBlogs/getBlogsSelector";
import { getBlogsThunk } from "@/_redux/getBlogs/getBlogsThunk";
import { AppDispatch } from "@/_redux/store";
import { InformationCircleIcon, PencilIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ParagraphRenderer from "../../_components/ParagraphRenderer";

export default function BlogsPage() {
  const blogPageClassname = `flex flex-col mt-32 mx-12 md:mx-24 mb-12   
                                items-center justify-between space-y-20`;
  const blogModalVisibility = useSelector(selectVisiblity);
  return (
    <div className={blogPageClassname}>
      <HeadingText />
      <BlogPageActions />
      <BlogList />
      {blogModalVisibility && <BlogModal />}
    </div>
  );
}

function HeadingText() {
  const headingTextClassname = `text-center space-y-5`;
  const h1Classname = `${FONT_LEXEND.className} ${FONTSTYLE_HEADING1}`;
  const h2Classname = `${FONT_LEXEND.className} ${FONTSTYLE_SUBTEXT2} max-w-lg`;
  return (
    <FM_Reveal className={headingTextClassname}>
      <>
        <h1 className={h1Classname} style={{ color: COLOR_PRIMARY }}>
          Blogs
        </h1>
        <h6 className={h2Classname} style={{ color: COLOR_SECONDARY }}>
          Self-taught lessons that I would like to share
        </h6>
      </>
    </FM_Reveal>
  );
}

function BlogPageActions() {
  const blogListClassname = `flex flex-col items-center md:flex-row md:justify-center w-full gap-5`;
  const buttonGrids = `flex flex-row items-center gap-5 relative h-full`;
  const [aboutBlogPageModalVisibility, setAboutBlogPageModalVisibility] =
    useState<boolean>();
  const dispatch = useDispatch<AppDispatch>();
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const featureButtons: any[] = [
    // {
    //   icon: <FunnelIcon />,
    //   label: "Filter by...",
    // },
    {
      icon: <PencilIcon />,
      label: "New Post",
      action: () => {
        dispatch(setIsUpdateMode(false));
        dispatch(setVisibility(true));
      },
      authorize: true,
    },
    {
      icon: <InformationCircleIcon />,
      label: "About this Page",
      action: () => setAboutBlogPageModalVisibility(true),
      authorize: false,
    },
  ];

  return (
    <FM_Reveal className={blogListClassname}>
      <>
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

        {aboutBlogPageModalVisibility && (
          <Modal
            title={CONTENT_BLOG_ABOUT_TITLE}
            closeAction={() => setAboutBlogPageModalVisibility(false)}
          >
            <ParagraphRenderer isHtml paragraph={CONTENT_BLOG_ABOUT_CONTENT} />
          </Modal>
        )}
      </>
    </FM_Reveal>
  );
}

function BlogList() {
  const blogListClassname = `grid grid-cols-1 md:grid-cols-3 gap-5`;
  const emptyListClassname = `col-span-3`;
  const spinnerClassname = `col-span-3 flex flex-row justify-center`;
  const blogs = useSelector(selectBlogs);
  const dispatch = useDispatch<AppDispatch>();
  const isCreatingBlog = useSelector(selectIsCreatingBlog);
  const isGettingBlogs = useSelector(selectIsGettingBlogs);
  const searchParams = useSelector(selectSearchParams);
  const debouncedSearchParams = useDebounce(searchParams, 800);
  useEffect(() => {
    dispatch(getBlogsThunk(debouncedSearchParams));
  }, [dispatch, debouncedSearchParams]);

  return (
    <FM_Reveal className={blogListClassname}>
      <>
        {isGettingBlogs && (!blogs || !blogs.length) && (
          <div className={spinnerClassname}>
            <Spinner />
          </div>
        )}
        {!isGettingBlogs && (!blogs || !blogs.length) ? (
          <div className={emptyListClassname}>
            <EmptyList />
          </div>
        ) : (
          blogs.map((blog, key) => {
            return <BlogCard key={key} isImageB64 blog={blog} />;
          })
        )}
        {isCreatingBlog && <LoadingOverlay />}
      </>
    </FM_Reveal>
  );
}
