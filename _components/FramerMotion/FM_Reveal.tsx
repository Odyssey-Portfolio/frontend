"use client";
import { motion, useAnimation, useInView } from "motion/react";
import { JSX, useEffect, useRef } from "react";

interface FMRevealProps {
  children: JSX.Element;
  className?: string;
}

export default function FM_Reveal(props: FMRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const mainControls = useAnimation();
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Smooth scroll to top
      });
    } else {
      mainControls.start("hidden");
    }
  }, [isInView]);
  return (
    <div ref={ref}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 68 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        className={props.className}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        {props.children}
      </motion.div>
    </div>
  );
}
