"use client";
import { useEffect, useState } from "react";
import UserDetails from "./UserDetails";
import { Sidebar } from "./Sidebar";
import FM_Reveal from "../../_components/FramerMotion/FM_Reveal";
import { COLOR_PRIMARY } from "../../_constants/Colors";
import {
  FONT_LEXEND,
  FONTSTYLE_HEADING1,
  FONTSTYLE_SUBTEXT2,
} from "../../_constants/Fonts";
import TopSection from "./TopSection";
import { LoggedInUser } from "../../_models/LoggedInUser";
import { getLoggedInUser } from "../../utils/AuthUtils";

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
      <>
        <TopSection loggedInUser={loggedInUser || ({} as LoggedInUser)} />
        <div className={userProfileColumnClassname}>
          <div className={sidebarClassname}>
            <Sidebar
              selectedSection={selectedSection}
              onSelectSection={(section) => setSelectedSection(section)}
            />
          </div>
          <div className={mainSectionClassname}>
            <UserDetails loggedInUser={loggedInUser || ({} as LoggedInUser)} />
          </div>
        </div>
      </>
    </FM_Reveal>
  );
}
