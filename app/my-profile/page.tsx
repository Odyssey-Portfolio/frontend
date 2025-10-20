"use client";
import { JSX, useEffect, useState } from "react";
import UserDetails from "./UserDetails";
import { Sidebar } from "./Sidebar";
import FM_Reveal from "../../_components/FramerMotion/FM_Reveal";
import TopSection from "./TopSection";
import { LoggedInUser } from "../../_models/LoggedInUser";
import { getLoggedInUser } from "../../utils/AuthUtils";
import Spinner from "../../_components/AtomicComponents/Spinner";
import { useDispatch, useSelector } from "react-redux";
import Button, {
  ButtonVariants,
} from "../../_components/AtomicComponents/Button";
import Modal from "../../_components/Modal";
import { AUTH_MODES } from "../../_constants/Auth";
import { SUCCESS } from "../../_constants/ResponseCodes";
import { USER_MODES } from "../../_constants/User";
import { selectAuthData, selectAuthMode } from "../../_redux/auth/authSelector";
import { logoutThunk } from "../../_redux/auth/authThunk";
import { AppDispatch } from "../../_redux/store";
import { selectUserData, selectUserMode } from "../../_redux/user/userSelector";

export default function UserProfilePage() {
  const userProfileContainerClassname = `mt-32 md:mx-12
                                items-center justify-between space-y-12`;
  const userProfileClassname = `flex flex-row justify-start mt-32 md:mx-12 mb-12 space-x-12`;

  const sidebarClassname = `flex-shrink-0 w-1/4`;

  const mainSectionClassname = `flex-1`;
  const [selectedSection, setSelectedSection] = useState("profile");
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser>();
  useEffect(() => {
    setLoggedInUser(getLoggedInUser());
  }, []);

  return (
    <>
      <FM_Reveal className={userProfileContainerClassname}>
        {!loggedInUser ? (
          <Spinner />
        ) : (
          <>
            <TopSection loggedInUser={loggedInUser} />
            <div className={userProfileClassname}>
              <div className={sidebarClassname}>
                <Sidebar
                  selectedSection={selectedSection}
                  onSelectSection={(section) => setSelectedSection(section)}
                />
              </div>
              <div className={mainSectionClassname}>
                <UserDetails loggedInUser={loggedInUser} />
              </div>
            </div>
          </>
        )}
      </FM_Reveal>
      <ConfirmLogoutModal />
    </>
  );
}

function ConfirmLogoutModal() {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const authData = useSelector(selectAuthData);
  const authMode = useSelector(selectAuthMode);

  const userData = useSelector(selectUserData);
  const userMode = useSelector(selectUserMode);

  useEffect(() => {
    if (
      userData?.statusCode === SUCCESS &&
      (userMode === USER_MODES.UPDATE_AVATAR ||
        userMode === USER_MODES.UPDATE_PROFILE)
    ) {
      setLogoutDialogOpen(true);
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
      closeAction={() => setLogoutDialogOpen(false)}
      show={logoutDialogOpen}
    >
      <>
        As you have updated your personal information, please re-login to see
        the latest changes!
      </>
    </Modal>
  );
}
