"use client";
import { useScroll } from "motion/react";
import { JSX, useEffect, useRef } from "react";
interface FM_DownscaleOnScrollProps {
  children: JSX.Element;
}
export default function FM_DownscaleOnScroll(props: FM_DownscaleOnScrollProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });    
  return <div ref={containerRef}></div>;
}
