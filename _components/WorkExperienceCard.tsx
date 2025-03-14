"use client";
import {
  FONT_LEXEND,
  FONT_POPPINS,
  FONT_POPPINS2,
  FONTSTYLE_HEADING3,
  FONTSTYLE_SUBTEXT1,
  FONTSTYLE_SUBTEXT2,
} from "@/_constants/Fonts";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";
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
  const { scrollYProgress } = useScroll({
    target: workExperienceCardRef,

    offset: ["start end", "start start"],
    /*
        start end: offset starts working when: the start of target (workExperienceCard) 
                    meets the end of its container (WorkExperiencePage)
        start start: offset stops working when: the start of target (workExperienceCard) 
                    meets the START of its container (WorkExperiencePage)
    */
  });
  const cardScale = useTransform(props.progress, props.range, [
    1,
    props.targetScale,
  ]);
  const workExperienceCardClassname = `sticky top-[12rem] relative rounded-lg w-[56rem] h-[32rem]
                                        overflow-hidden shadow-lg mb-12`;
  const overlayTextClassname = `absolute inset-0 flex items-center p-5
                                justify-center bg-black bg-opacity-0 opacity-0
                                 bg-opacity-70
                                opacity-100`;
  return (
    <motion.div
      ref={workExperienceCardRef}
      className={workExperienceCardClassname}
      style={{
        scale: cardScale,
        top: `calc(-10% + ${props.index * 2}rem)`,
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
  const descriptionClassname = `flex flex-col text-white select-none cursor-default space-y-16`;
  const companyNameClassname = `${FONT_LEXEND.className} ${FONTSTYLE_HEADING3}`;

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
