"use client";
import { COLOR_BLACK_1, COLOR_PRIMARY, COLOR_WHITE } from "@/_constants/Colors";
import {
  FONT_LEXEND,
  FONT_POPPINS,
  FONTSTYLE_PARAGRAPH1,
  FONTSTYLE_SUBTEXT3,
} from "@/_constants/Fonts";
import {
  CalendarIcon,
  CodeBracketIcon,
  InformationCircleIcon,
} from "@heroicons/react/16/solid";
import Image from "next/image";
import { ReactNode, useState } from "react";

export interface ProjectCardProps {
  name: string;
  image: string;
  duration: string;
  description: string;
  stack: string;
  github: string;
  imagePadding?: number;
  languages?: string[];
}
export default function ProjectCard(props: ProjectCardProps) {
  const projectCardClassname = `relative rounded-lg flex flex-col h-full`;
  return (
    <div
      className={projectCardClassname}
      // style={{ backgroundColor: COLOR_PRIMARY_LIGHT }}
    >
      <ProjectImage {...props} />
      <TopSection {...props} />
      <Actions {...props} />
      <ProjectDescription {...props} />
    </div>
  );
}

function TopSection(props: ProjectCardProps) {
  const topSectionClassname = `p-5 flex flex-row items-center space-x-5 justify-center`;
  const projectIconClassname = `w-16`;
  const projectNameClassname = `${FONT_LEXEND.className} ${FONTSTYLE_SUBTEXT3} font-bold cursor-default`;
  return (
    <div className={topSectionClassname}>
      <div className={projectNameClassname}>{props.name}</div>
    </div>
  );
}

function ProjectImage(props: ProjectCardProps) {
  return (
    <div style={{ width: "100%", height: "14rem" }}>
      <Image
        src={props.image ? props.image : "/coffee.jpg"}
        alt="avatar"
        width={0}
        height={0}
        sizes="100vh"
        style={{
          height: "100%",
          width: "100%",
          padding: "2rem",
          borderRadius: 25,
        }}
      />
    </div>
  );
}

function Actions(props: ProjectCardProps) {
  const [buttonBackgroundColor, setButtonBackgroundColor] = useState<
    string | undefined
  >(undefined);
  const [buttonTextColor, setButtonTextColor] = useState<string | undefined>(
    undefined
  );
  const [githubImage, setGithubImage] = useState<string>("/github.png");
  const actionsWrapperClassname = `flex flex-row p-5`;
  const githubButtonClassname = `flex flex-row space-x-2 p-2 rounded-l-lg 
                                 rounded-r-lg border-2 justify-center
                                 items-center w-full`;
  const handleOnMouseDown = () => {
    setButtonBackgroundColor(COLOR_PRIMARY);
    setButtonTextColor(COLOR_WHITE);
    setGithubImage("/github-inverted.png");
  };
  const handleOnMouseUp = () => {
    setButtonBackgroundColor(undefined);
    setButtonTextColor(COLOR_BLACK_1);
    setGithubImage("/github.png");
    window.open(props.github, "_blank");
  };
  return (
    <div className={actionsWrapperClassname}>
      <div
        className={githubButtonClassname}
        onMouseDown={handleOnMouseDown}
        onMouseUp={handleOnMouseUp}
        style={{
          borderColor: COLOR_PRIMARY,
          backgroundColor: buttonBackgroundColor,
        }}
      >
        <Image src={githubImage} alt="avatar" width={50} height={0} />
        <span
          className={`${FONT_LEXEND.className} ${FONTSTYLE_PARAGRAPH1} cursor-pointer select-none`}
          style={{ color: buttonTextColor }}
        >
          View on GitHub
        </span>
      </div>
    </div>
  );
}

type ProjectDescriptionItem = {
  icon: ReactNode;
  description: string;
};

function ProjectDescription(props: ProjectCardProps) {
  const [isHover, setIsHover] = useState<boolean>();
  const projectDescriptionClassname = `flex flex-col p-5 justify-between gap-5`;
  const descriptionItemClassname = `flex flex-row grid grid-cols-12 items-center space-x-3`;
  const iconClassname = `col-span-2 w-12 h-12`;
  const paragraphClassname = `${
    FONT_POPPINS.className
  } col-span-10 cursor-default ${isHover ? "" : "line-clamp-3"}`;

  const projectDescriptions: ProjectDescriptionItem[] = [
    { icon: <InformationCircleIcon />, description: props.description },
    { icon: <CalendarIcon />, description: props.duration },
  ];
  return (
    <div className={projectDescriptionClassname}>
      {projectDescriptions.map((desc, key) => {
        return (
          <div key={key} className={descriptionItemClassname}>
            <div className={iconClassname} style={{ color: COLOR_PRIMARY }}>
              {desc.icon}
            </div>
            <div
              className={paragraphClassname}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              {desc.description}
            </div>
          </div>
        );
      })}
      <Languages {...props} />
    </div>
  );
}

function Languages(props: ProjectCardProps) {
  if (!props.languages || props.languages.length === 0) return null;
  return (
    <div className="flex-row grid grid-cols-12 items-center space-x-3">
      <div className="col-span-2 w-12 h-12" style={{ color: COLOR_PRIMARY }}>
        <CodeBracketIcon />
      </div>
      <div className="col-span-10 flex flex-wrap gap-3">
        {props.languages.map((lang, idx) => (
          <Image
            key={idx}
            src={`/languages/${lang}.svg`}
            alt={`language-${idx}`}
            width={40}
            height={40}
            className="object-contain"
          />
        ))}
      </div>
    </div>
  );
}

function Overlay(props: ProjectCardProps) {
  const overlayClassname = `absolute inset-0 flex items-center rounded-lg
                            justify-center bg-black bg-opacity-0 opacity-100
                            transition-all duration-300`; /* hover:bg-opacity-50
                            hover:opacity-100 */
  const githubButtonClassname = `flex flex-col items-center rounded-lg bg-white
                                border-2 p-2 active:bg-transparent active:text-white`;
  return (
    <div className={overlayClassname}>
      <div
        className={githubButtonClassname}
        style={{ borderColor: COLOR_WHITE }}
      >
        <Image src="/github.png" alt="avatar" width={100} height={200} />
        <span
          className={`${FONT_LEXEND.className} ${FONTSTYLE_PARAGRAPH1} cursor-pointer`}
        >
          View on GitHub
        </span>
      </div>
    </div>
  );
}
