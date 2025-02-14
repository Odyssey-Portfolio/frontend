"use client";
import { COLOR_PRIMARY, COLOR_SECONDARY } from "@/_constants/Colors";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import useScrollPercentage from "../_hooks/useScrollPercentage";

export default function ScrollableTimeline() {
  const variants = {
    hidden: { opacity: 0, x: 75 },
    visible: { opacity: 1, x: 0 },
  };
  const scrollPercentage = useScrollPercentage();
  console.log("Current scroll percentage: ", scrollPercentage);
  const timelineBgClassname = `flex flex-col-reverse relative 
                                rounded-3xl bg-white
                                border-2 w-8 h-96`;
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
      <div
        className={timelineBgClassname}
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
    </motion.div>
  );
}
