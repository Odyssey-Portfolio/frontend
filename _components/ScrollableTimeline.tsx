"use client";
import {
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_WHITE,
} from "@/_constants/Colors";
import { FONT_LEXEND, FONTSTYLE_SUBTEXT2 } from "@/_constants/Fonts";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import useScrollPercentage from "../_hooks/useScrollPercentage";

export default function ScrollableTimeline() {
  const variants = {
    hidden: { opacity: 0, x: 75 },
    visible: { opacity: 1, x: 0 },
  };
  const scrollPercentage = useScrollPercentage();
  const wrapperClassname = "flex flex-row h-96";
  const scrollableTimelineClassname = `flex flex-col-reverse relative 
                                rounded-3xl bg-white
                                border-2 w-8`;
  const innerTimelineClassname = `w-full rounded-3xl flex-reverse`;
  const [isVisible, setIsVisible] = useState(false);
  let hideTimeout: NodeJS.Timeout;
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(true);
      clearTimeout(hideTimeout);

      hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      <div className={wrapperClassname}>
        <YearIndicator scrollPercentage={scrollPercentage} />
        <div
          className={scrollableTimelineClassname}
          style={{ borderColor: COLOR_PRIMARY }}
        >
          <div
            className={innerTimelineClassname}
            style={{
              height: `${100 - scrollPercentage}%`,
              backgroundColor: COLOR_SECONDARY,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

interface YearIndicatorProps {
  scrollPercentage: number;
}
function YearIndicator(props: YearIndicatorProps) {
  const yearIndicatorWrapperClassname = "relative flex flex-row h-12";
  const yearIndicatorClassname = `rounded-l-3xl p-5 ${FONT_LEXEND.className} 
                                  ${FONTSTYLE_SUBTEXT2}
                                  flex flex-row items-center`;
  return (
    <div
      className={yearIndicatorWrapperClassname}
      style={{ top: `${props.scrollPercentage}%` }}
    >
      <div
        className={yearIndicatorClassname}
        style={{
          color: COLOR_WHITE,
          backgroundColor: COLOR_SECONDARY,
        }}
      >
        2024
      </div>
      <div
        className={`w-12`}
        style={{
          clipPath: `polygon(0 0, 50% 50%, 0 100%)`,
          backgroundColor: COLOR_SECONDARY,
        }}
      />
    </div>
  );
}
