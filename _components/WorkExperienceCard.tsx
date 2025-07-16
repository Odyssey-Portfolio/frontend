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
import { useEffect, useRef, useState } from "react";

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
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState<string>();
  const isMediumScreen = useIsMediumScreen();
  const cardScale = useTransform(props.progress, props.range, [
    1,
    props.targetScale,
  ]);
  const workExperienceCardClassname = `sticky top-[5rem] relative rounded-lg
                                        overflow-hidden shadow-lg mb-24`;
  const overlayTextClassname = `absolute inset-0 flex items-center p-5
                                justify-center bg-black bg-opacity-0 opacity-0
                                 bg-opacity-65
                                opacity-100`;
  const imageWrapperClassname = `absolute flex flex-row justify-center w-full h-full`;
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
    fillEmptySpaceWithDominantColor();
  }, []);

  const fillEmptySpaceWithDominantColor = () => {
    const DOMImage = window.Image;
    const img = new DOMImage();
    img.src = props.image;
    getDominantColorFromImage(img).then((dominantColor) => {
      setBackgroundColor(dominantColor);
    });
  };
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
        <div
          className={imageWrapperClassname}
          style={{
            backgroundColor: backgroundColor,
          }}
        >
          <Image
            src={props.image}
            alt="avatar"
            width={0}
            height={0}
            sizes="100vh"
            style={{
              height: "100%",
              width: "auto",
              borderRadius: 25,
            }}
          />
        </div>
        <div className={overlayTextClassname}>
          <Description {...props} />
        </div>
      </>
    </motion.div>
  );
}

function Description(props: WorkExperienceCardProps) {
  const descriptionClassname = `flex flex-col text-white select-none cursor-default space-y-16 w-full md:p-5`;
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

function getDominantColorFromImage(
  imgElement: HTMLImageElement
): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return reject("Canvas not supported");

    imgElement.onload = () => {
      canvas.width = imgElement.naturalWidth;
      canvas.height = imgElement.naturalHeight;
      ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const colorCount: Record<string, number> = {};
      const step = 10; // Sample every 10 pixels for performance

      for (let i = 0; i < data.length; i += 4 * step) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const color = `${r},${g},${b}`;
        colorCount[color] = (colorCount[color] || 0) + 1;
      }

      const dominantColor = Object.entries(colorCount).sort(
        (a, b) => b[1] - a[1]
      )[0][0];
      resolve(`rgb(${dominantColor})`);
    };

    if (imgElement.complete) {
      imgElement.onload?.(new Event("load"));
    }
  });
}
