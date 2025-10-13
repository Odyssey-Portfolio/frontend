"use client";
import { useState } from "react";
import UserDetails from "./UserDetails";
import { Sidebar } from "./Sidebar";
import FM_Reveal from "../../_components/FramerMotion/FM_Reveal";
import { COLOR_PRIMARY, COLOR_SECONDARY } from "../../_constants/Colors";
import {
  FONT_LEXEND,
  FONTSTYLE_HEADING1,
  FONTSTYLE_SUBTEXT2,
} from "../../_constants/Fonts";

export default function UserProfilePage() {
  const userProfileContainerClassname = `mt-32 md:mx-12 mb-12 
                                items-center justify-between space-y-4`;
  const userProfileColumnClassname = `grid grid-cols-12 mt-32 md:mx-12 mb-12 space-x-12   
                                items-center justify-between space-y-20`;
  const sidebarClassname = `col-span-3`;
  const mainSectionClassname = `col-span-9`;
  const [selectedSection, setSelectedSection] = useState("profile");
  return (
    <div className={userProfileContainerClassname}>
      <HeadingText />
      <div className={userProfileColumnClassname}>
        <div className={sidebarClassname}>
          <Sidebar
            selectedSection={selectedSection}
            onSelectSection={(section) => setSelectedSection(section)}
          />
        </div>
        <div className={mainSectionClassname}>
          <UserDetails />
        </div>
      </div>
    </div>
  );
}

function HeadingText() {
  const headingTextClassname = `text-center space-y-5`;
  const h1Classname = `${FONT_LEXEND.className} ${FONTSTYLE_HEADING1}`;
  const h2Classname = `${FONT_LEXEND.className} ${FONTSTYLE_SUBTEXT2} px-5`;
  return (
    <FM_Reveal className={headingTextClassname}>
      <>
        <h1 className={h1Classname} style={{ color: COLOR_PRIMARY }}>
          My Profile
        </h1>
      </>
    </FM_Reveal>
  );
}
