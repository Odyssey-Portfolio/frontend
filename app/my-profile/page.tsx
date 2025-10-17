"use client";
import { useEffect, useState } from "react";
import UserDetails from "./UserDetails";
import { Sidebar } from "./Sidebar";
import FM_Reveal from "../../_components/FramerMotion/FM_Reveal";
import TopSection from "./TopSection";
import { LoggedInUser } from "../../_models/LoggedInUser";
import { getLoggedInUser } from "../../utils/AuthUtils";
import Spinner from "../../_components/AtomicComponents/Spinner";

export default function UserProfilePage() {
  const userProfileContainerClassname = `mt-32 md:mx-12 mb-12 
                                items-center justify-between space-y-2`;
  const userProfileColumnClassname = `grid grid-cols-12 mt-32 md:mx-12 mb-12 space-x-12   
                                items-center justify-between space-y-20`;
  const sidebarClassname = `col-span-3`;
  const mainSectionClassname = `col-span-9`;
  const [selectedSection, setSelectedSection] = useState("profile");
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser>();
  useEffect(() => {
    setLoggedInUser(getLoggedInUser());
  }, []);

  return (
    <FM_Reveal className={userProfileContainerClassname}>
      {!loggedInUser ? (
        <Spinner />
      ) : (
        <>
          <TopSection loggedInUser={loggedInUser} />
          <div className={userProfileColumnClassname}>
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
  );
}
