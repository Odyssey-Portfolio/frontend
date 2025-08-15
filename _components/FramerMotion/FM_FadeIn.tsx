"use client";
import { motion, useAnimation } from "motion/react";
import { JSX, useEffect } from "react";

interface FMFadeInProps {
  children: JSX.Element;
  className?: string;
  duration?: number;
  delay?: number;
  showChildren: boolean;
}

export default function FM_FadeIn(props: FMFadeInProps) {
  const duration = props.duration;
  const delay = props.delay;
  const mainControls = useAnimation();
  const visibilityClassname = props.showChildren
    ? ``
    : `invisible pointer-events-none`;
  const fmFadeInClassname = `${visibilityClassname} ${props.className}`;
  useEffect(() => {
    if (props.showChildren) mainControls.start("visible");
    else mainControls.start("hidden");
  }, [props.showChildren]);
  return (
    <div>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 0 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        className={fmFadeInClassname}
        transition={{ duration: duration, delay: delay }}
      >
        {props.children}
      </motion.div>
    </div>
  );
}
