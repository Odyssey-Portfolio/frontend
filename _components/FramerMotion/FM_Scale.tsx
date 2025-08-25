"use client";
import { motion, useAnimation } from "motion/react";
import { CSSProperties, JSX, useEffect } from "react";

interface FMScaleProps {
  children: JSX.Element;
  className?: string;
  style?: CSSProperties;
  duration?: number;
  delay?: number;
  shouldScale: boolean;
  fromScale?: number; // default is 0.5 (50%)
  toScale?: number; // default is 1 (100%)
}

export default function FM_Scale(props: FMScaleProps) {
  const duration = props.duration ?? 0.3;
  const delay = props.delay ?? 0;
  const fromScale = props.fromScale ?? 0.5;
  const toScale = props.toScale ?? 1;

  const mainControls = useAnimation();

  useEffect(() => {
    if (props.shouldScale) mainControls.start("scaled");
    else mainControls.start("initial");
  }, [props.shouldScale]);

  return (
    <motion.div
      variants={{
        initial: { scale: fromScale },
        scaled: { scale: toScale },
      }}
      animate={mainControls}
      className={props.className}
      transition={{ duration, delay }}
      style={props.style}
    >
      {props.children}
    </motion.div>
  );
}
