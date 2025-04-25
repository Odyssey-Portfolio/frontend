"use client";
import FM_Reveal from "@/_components/FramerMotion/FM_Reveal";
import WorkExperienceCard from "@/_components/WorkExperienceCard";
import { COLOR_PRIMARY, COLOR_SECONDARY } from "@/_constants/Colors";
import {
  FONT_LEXEND,
  FONTSTYLE_HEADING1,
  FONTSTYLE_SUBTEXT2,
} from "@/_constants/Fonts";
import { CONTENT_WORKEXPERIENCE } from "@/_contents/WorkExperience";
import { useScroll } from "motion/react";
import { useRef } from "react";

export default function WorkExperiencePage() {
  const workExperiencePageClassname = `flex flex-col mt-32 mx-24 mb-12   
                                items-center justify-between space-y-20 h-96`;
  return (
    <div className={workExperiencePageClassname}>
      <HeadingText />
      <WorkExperienceSection />
    </div>
  );
}

function HeadingText() {
  const headingTextClassname = `text-center space-y-5`;
  const h1Classname = `${FONT_LEXEND.className} ${FONTSTYLE_HEADING1}`;
  const h2Classname = `${FONT_LEXEND.className} ${FONTSTYLE_SUBTEXT2}`;
  return (
    <FM_Reveal className={headingTextClassname}>
      <>
        <h1 className={h1Classname} style={{ color: COLOR_PRIMARY }}>
          Work Experience
        </h1>
        <h6 className={h2Classname} style={{ color: COLOR_SECONDARY }}>
          My career so far!
        </h6>
      </>
    </FM_Reveal>
  );
}

function WorkExperienceSection() {
  const containerRef = useRef(null);
  const workExperienceContainerClassname =
    "mt-[5rem] w-full flex flex-col items-center";
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });
  return (
    <div ref={containerRef} className={workExperienceContainerClassname}>
      {CONTENT_WORKEXPERIENCE.map((exp, key) => {
        const scale = 1 - (CONTENT_WORKEXPERIENCE.length - key) * 0.03;
        const prog = [key * 0.25, 1];
        return (
          <WorkExperienceCard
            key={key}
            progress={scrollYProgress}
            range={prog}
            targetScale={scale}
            index={key}
            companyName={exp.companyName}
            image={exp.image}
            jobTitle={exp.jobTitle}
            years={exp.years}
          />
        );
      })}
    </div>
  );
}
