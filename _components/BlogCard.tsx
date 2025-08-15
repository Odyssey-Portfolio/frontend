import { ROLE_ADMIN } from "@/_constants/Auth";
import { COLOR_PRIMARY, COLOR_RED } from "@/_constants/Colors";
import {
  FONT_LEXEND,
  FONT_POPPINS,
  FONTSTYLE_PARAGRAPH1,
  FONTSTYLE_SUBTEXT2,
} from "@/_constants/Fonts";
import { GetBlog, GetBlogAdmin } from "@/_models/GetBlog";
import {
  setBlog,
  setIsUpdateMode,
  setVisibility,
} from "@/_redux/blogModal/blogModalSlice";
import { AppDispatch } from "@/_redux/store";
import { BookOpenIcon, XCircleIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Authorizer from "./Authorizer";
import Modal from "./Modal";
import Button, { ButtonVariants } from "./AtomicComponents/Button";
import { JSX, useEffect, useState } from "react";
import { deleteBlogThunk } from "../_redux/blogModal/blogModalThunk";
import { DeleteBlog } from "../_models/DeleteBlog";
import { getUserId } from "../utils/AuthUtils";
import Spinner from "./AtomicComponents/Spinner";

interface BlogCardProps {
  blog: GetBlogAdmin;
  isImageB64: boolean;
}
export default function BlogCard(props: BlogCardProps) {
  const blogCardClassname = `relative rounded-lg flex flex-col md:h-full`;
  const [opacity, setOpacity] = useState<number>(1);
  const imageWrapperClassname = `flex flex-row justify-center`;
  const detailsClassname = `p-2 space-y-3`;

  const isBlogSoftDeleted = props.blog.isDeleted;
  const handleHover = () => {
    if (!isBlogSoftDeleted) return;
    setOpacity(1);
  };
  const handleOffHover = () => {
    if (!isBlogSoftDeleted) return;
    setOpacity(0.5);
  };
  useEffect(() => {
    if (isBlogSoftDeleted) setOpacity(0.5);
  }, []);
  return (
    <div
      className={blogCardClassname}
      style={{ opacity: opacity, transition: "opacity 0.1s ease-in-out" }}
      onMouseEnter={handleHover}
      onMouseLeave={handleOffHover}
    >
      <div className={imageWrapperClassname}>
        <Image
          src={
            props.isImageB64
              ? decodeURIComponent(props.blog.image)
              : props.blog.image
          }
          alt="avatar"
          width={0}
          height={0}
          sizes="100vh"
          style={{
            height: "auto",
            width: "60%",
            borderRadius: 25,
          }}
        />
        <Authorizer roles={[ROLE_ADMIN]}>
          {isBlogSoftDeleted ? (
            <AdminRestoreBlogButton />
          ) : (
            <AdminButtonSection {...props} />
          )}
        </Authorizer>
      </div>
      <div className={detailsClassname}>
        <TitleSection {...props} />
        <GoToBlogSection {...props} />
      </div>
    </div>
  );
}

function AdminButtonSection(props: BlogCardProps) {
  const adminButtonWrapperClassname = `absolute top-2 right-2 px-2 py-1 flex 
    flex-row justify-between space-x-1`;
  const updateBlogButtonClasssname = `${FONT_POPPINS.className} text-white 
    text-xs md:text-lg px-3 py-1 rounded-full shadow-md transition-all`;
  const deleteBlogButtonClasssname = `${FONT_POPPINS.className} text-white 
    text-xs md:text-lg px-3 py-1 rounded-full shadow-md transition-all`;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const openBlogModal = () => {
    dispatch(setBlog(props.blog));
    dispatch(setVisibility(true));
    dispatch(setIsUpdateMode(true));
  };
  return (
    <div className={adminButtonWrapperClassname}>
      <button
        onClick={openBlogModal}
        className={updateBlogButtonClasssname}
        style={{ backgroundColor: COLOR_PRIMARY }}
      >
        Update
      </button>
      <button
        onClick={() => setShowModal(true)}
        className={deleteBlogButtonClasssname}
        style={{ backgroundColor: COLOR_RED }}
      >
        Remove
      </button>
      <ConfirmDeleteBlogModal
        blog={props.blog}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
}

function AdminRestoreBlogButton() {
  const adminButtonWrapperClassname = `absolute top-2 right-2 px-2 py-1 flex 
    flex-row justify-between space-x-1`;
  const restoreBlogButtonClasssname = `${FONT_POPPINS.className} text-white 
    text-xs md:text-lg px-3 py-1 rounded-full shadow-md transition-all`;
  //const dispatch = useDispatch();
  //const [showModal, setShowModal] = useState(false);
  return (
    <div className={adminButtonWrapperClassname}>
      <button
        className={restoreBlogButtonClasssname}
        style={{ backgroundColor: COLOR_PRIMARY }}
      >
        Restore
      </button>
    </div>
  );
}
interface ConfirmDeleteBlogModalProps {
  blog: GetBlog;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}
function ConfirmDeleteBlogModal(props: ConfirmDeleteBlogModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const buildDeleteBlogRequest = (): DeleteBlog => {
    return {
      id: props.blog.id,
      userId: getUserId(),
    };
  };
  const handleDeleteBlog = () => {
    dispatch(deleteBlogThunk(buildDeleteBlogRequest()));
  };
  const bottomActions: JSX.Element[] = [
    <Button
      key="cancel"
      label="Cancel"
      variant={ButtonVariants.PRIMARY}
      onClick={() => props.setShowModal(false)}
    />,
    <Button
      key="ok"
      label="Okay"
      variant={ButtonVariants.DANGER}
      onClick={handleDeleteBlog}
    />,
  ];
  return (
    <>
      <Modal
        title="Confirm Delete"
        bottomActions={bottomActions}
        closeAction={() => props.setShowModal(false)}
        show={props.showModal}
      >
        <>Do you really want to soft delete this blog?</>
      </Modal>
    </>
  );
}

function TitleSection(props: BlogCardProps) {
  const titleClassname = `${FONT_LEXEND.className} ${FONTSTYLE_SUBTEXT2}`;
  const subtitleClassname = `${FONT_POPPINS.className}`;
  return (
    <>
      <div className={titleClassname}>{props.blog.title}</div>
      <div className={subtitleClassname}>{props.blog.description}</div>
    </>
  );
}

function GoToBlogSection(props: BlogCardProps) {
  const goToBlogClassname = `flex flex-row space-x-2 items-center cursor-default select-none`;
  const iconClassname = `col-span-2 w-12 h-12 cursor-default`;
  const labelClassname = `${FONT_POPPINS.className} ${FONTSTYLE_PARAGRAPH1}`;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const goToBlog = () => {
    router.push(`/blogs/${props.blog.id}`);
    setIsLoading(true);
  };
  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div
          className={goToBlogClassname}
          style={{ color: COLOR_PRIMARY }}
          onClick={goToBlog}
        >
          <div className={iconClassname}>
            <BookOpenIcon />
          </div>
          <div className={labelClassname}>Read</div>
        </div>
      )}
    </>
  );
}
