import { JSX, useEffect, useState } from "react";
import Image from "next/image";
import { LoggedInUser } from "../../_models/LoggedInUser";
import {
  FONTSTYLE_PARAGRAPH1,
  FONTSTYLE_SUBTEXT3,
  FONT_POPPINS,
} from "../../_constants/Fonts";
import Button, { ButtonVariants } from "./Button";
import { UploadCloudIcon, XCircleIcon } from "lucide-react";
import ImageUploader from "./ImageUploader";
import FM_FadeIn from "../FramerMotion/FM_FadeIn";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAvatarThunk } from "../../_redux/user/userThunk";
import { AppDispatch } from "../../_redux/store";
import {
  selectIsLoading,
  selectUserData,
  selectUserMode,
} from "../../_redux/user/userSelector";
import Modal from "../Modal";
import { logoutThunk } from "../../_redux/auth/authThunk";
import { selectAuthData, selectAuthMode } from "../../_redux/auth/authSelector";
import { SUCCESS } from "../../_constants/ResponseCodes";
import { AUTH_MODES } from "../../_constants/Auth";
import { USER_MODES } from "../../_constants/User";

interface AvatarUploaderProps {
  loggedInUser: LoggedInUser;
}
export default function AvatarUploader(props: AvatarUploaderProps) {
  const [hovered, setHovered] = useState(false);
  const [uploadDialogOpen, setUploadModalOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const avatar = props.loggedInUser.avatar;
  const topSectionClassname =
    "flex flex-row justify-center items-center space-x-12";
  const avatarWrapperClassname = `relative w-32 h-32 rounded-full items-center overflow-hidden transition-all duration-300 ${
    hovered ? "border-blue-500 scale-105" : "border-gray-300"
  }`;
  const avatarOverlayClassname = `
  ${FONT_POPPINS.className} ${FONTSTYLE_PARAGRAPH1}
  absolute inset-0 bg-black bg-opacity-40 flex select-none
      items-center justify-center text-white`;

  return (
    <div className={topSectionClassname}>
      <div
        className={avatarWrapperClassname}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setUploadModalOpen(true)}
      >
        <Image
          src={avatar ? decodeURIComponent(avatar) : "/airplane.png"}
          alt="User Avatar"
          fill
          className="object-cover w-full"
        />
        {hovered && <div className={avatarOverlayClassname}>Change</div>}
      </div>

      <FM_FadeIn showChildren={uploadDialogOpen}>
        <UploadDialog
          closeAction={() => setUploadModalOpen(false)}
          avatar={avatar}
        />
      </FM_FadeIn>
      <ConfirmLogoutModal
        toggleViewLogoutModal={setLogoutDialogOpen}
        toggleViewUploadModal={setUploadModalOpen}
        showModal={logoutDialogOpen}
      />
    </div>
  );
}

interface UploadDialogProps {
  closeAction: () => void;
  avatar: string;
}
function UploadDialog({ avatar, closeAction }: UploadDialogProps) {
  const [avatarFile, setAvatarFile] = useState<File>();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);
  const preview = avatar ? decodeURIComponent(avatar) : "/airplane.png";

  const dialogBackdropClassname =
    "fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50";
  const dialogContainerClassname =
    "bg-white rounded-xl p-6 shadow-lg space-y-4 w-80 text-center flex flex-col items-center";
  const dialogTitleClassname = `${FONT_POPPINS} ${FONTSTYLE_SUBTEXT3}`;
  const modalRoot = document.body;
  const imageUploaderClassname = `w-full`;

  const uploadAvatar = () => {
    dispatch(
      updateUserAvatarThunk({
        avatar: avatarFile as File,
        userId: "teehe",
      })
    );
  };
  if (typeof window === "undefined") return null;

  if (!modalRoot) return null;

  return (
    <div className={dialogBackdropClassname}>
      <div className={dialogContainerClassname}>
        <div className={dialogTitleClassname}>Choose an image</div>
        <div className={imageUploaderClassname}>
          <ImageUploader
            defaultImage={preview}
            onChange={(image) => setAvatarFile(image as File)}
          />
        </div>
        <Button
          icon={<UploadCloudIcon />}
          label="Upload"
          onClick={uploadAvatar}
          isLoading={isLoading}
        />
        <Button icon={<XCircleIcon />} label="Cancel" onClick={closeAction} />
      </div>
    </div>
  );
}

interface ConfirmLogoutModalProps {
  showModal: boolean;
  toggleViewUploadModal: (value: boolean) => void;
  toggleViewLogoutModal: (value: boolean) => void;
}
function ConfirmLogoutModal(props: ConfirmLogoutModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const authData = useSelector(selectAuthData);
  const authMode = useSelector(selectAuthMode);

  const userData = useSelector(selectUserData);
  const userMode = useSelector(selectUserMode);

  useEffect(() => {
    if (
      userData?.statusCode === SUCCESS &&
      userMode === USER_MODES.UPDATE_AVATAR
    ) {
      props.toggleViewLogoutModal(true);
      props.toggleViewUploadModal(false);
    }
  }, [userData, userMode]);

  useEffect(() => {
    if (authData?.statusCode === SUCCESS && authMode === AUTH_MODES.LOGOUT)
      window.location.href = "/";
  }, [authData, authMode]);

  const bottomActions: JSX.Element[] = [
    <Button
      key="ok"
      label="Yep sure!"
      variant={ButtonVariants.PRIMARY}
      onClick={() => dispatch(logoutThunk())}
    />,
  ];
  return (
    <Modal
      title="Confirm Logout"
      bottomActions={bottomActions}
      closeAction={() => props.toggleViewLogoutModal(false)}
      show={props.showModal}
    >
      <>
        As you have updated your personal information, please re-login to see
        the latest changes!
      </>
    </Modal>
  );
}
