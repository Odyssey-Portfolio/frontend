"use client";
import {
  FONT_LEXEND,
  FONT_POPPINS,
  FONT_POPPINS2,
  FONTSTYLE_HEADING1,
  FONTSTYLE_HEADING4,
  FONTSTYLE_SUBTEXT1,
  FONTSTYLE_SUBTEXT2,
} from "@/_constants/Fonts";
import { useIsMediumScreen } from "@/_hooks/useIsMediumScreen";
import { motion, MotionValue, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export interface WorkExperienceCardProps {
  index: number;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
  image: string;
  companyName: string;
  jobTitle: string;
  years: string;
}
export default function WorkExprienceCard(props: WorkExperienceCardProps) {
  const workExperienceCardRef = useRef(null);
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const isMediumScreen = useIsMediumScreen();
  const cardScale = useTransform(props.progress, props.range, [
    1,
    props.targetScale,
  ]);
  const workExperienceCardClassname = `sticky top-[5rem] relative rounded-lg
                                        overflow-hidden shadow-lg mb-24`;
  const overlayTextClassname = `absolute inset-0 flex items-center p-5
                                justify-center bg-black bg-opacity-0 opacity-0
                                 bg-opacity-70
                                opacity-100`;
  return (
    <motion.div
      ref={workExperienceCardRef}
      className={workExperienceCardClassname}
      style={{
        width: isMediumScreen ? screenWidth * 0.55 : screenWidth * 0.85,
        height: screenHeight * 0.5,
        scale: cardScale,
        top: `calc(10% + ${props.index * 2}rem)`,
      }}
    >
      <>
        <Image src={props.image} alt="avatar" fill />
        <div className={overlayTextClassname}>
          <Description {...props} />
        </div>
      </>
    </motion.div>
  );
}

function Description(props: WorkExperienceCardProps) {
  const descriptionClassname = `flex flex-col text-white select-none cursor-default space-y-16 w-full md:px-5`;
  const companyNameClassname = `${FONT_LEXEND.className} ${FONTSTYLE_HEADING4} md:${FONTSTYLE_HEADING1}`;

  const jobTitleClassname = `${FONT_POPPINS.className} ${FONTSTYLE_SUBTEXT1}`;
  const yearsClassname = `${FONT_POPPINS2.className} ${FONTSTYLE_SUBTEXT2}`;
  return (
    <div className={descriptionClassname}>
      <div className={companyNameClassname}>{props.companyName}</div>
      <div className="flex flex-col space-y-4">
        <div className={jobTitleClassname}>{props.jobTitle}</div>
        <div className={yearsClassname}>{props.years}</div>
      </div>
    </div>
  );
}
