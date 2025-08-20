"use client";
import { DownloadIcon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { COLOR_WHITE, COLOR_PRIMARY } from "../../_constants/Colors";
import {
  FONTSTYLE_SUBTEXT1,
  FONT_LEXEND,
  FONTSTYLE_PARAGRAPH2,
  FONT_POPPINS,
  FONTSTYLE_SUBTEXT2,
} from "../../_constants/Fonts";
import FM_Scale from "../FramerMotion/FM_Scale";
import { CVCardItem, CVCardProps } from "./types";
import Image from "next/image";
import { usePdfThumbnail } from "../../_hooks/usePdfThumbnail/usePdfThumbnail";

export default function CVCard({
  index,
  isActive,
  onClick,
  item,
}: CVCardProps) {
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const thumbnail = usePdfThumbnail({
    pdfUrl: item.pdfPath,
    thumbnailHeight: screenHeight * 0.85,
    thumbnailWidth: screenWidth * 0.3,
  });
  const cardHeight = screenHeight * 0.85;
  const cardWidth = screenWidth * 0.4;
  const fallbackImagePath = "/question-mark.png";

  const cvContentClassname = "p-3";
  const cvCardClassname = `relative rounded-lg grid grid-flow-col grid-rows-12 justify-center`;
  const cvThumbnailClassname = `row-span-12
    flex flex-row justify-center align-center select-none`;
  const cvDescriptionWrapperClassname = `absolute rounded-b-lg bg-white z-30 row-span-5 grid-rows-5 bottom-0`;
  const cvNameClassname = `${cvContentClassname} ${FONTSTYLE_SUBTEXT1} 
    ${FONT_LEXEND.className} row-span-1 select-none`;
  const cvDescriptionClassname = `${cvContentClassname} ${FONTSTYLE_PARAGRAPH2} 
    ${FONT_POPPINS.className} row-span-2 select-none`;
  const downloadIconClassname = `row-span-2 select-none`;

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  }, [item]);
  if (typeof window === "undefined") return null; // SSR-safe
  return (
    <FM_Scale shouldScale={isActive || false} fromScale={0.65} toScale={0.88}>
      <div
        className={cvCardClassname}
        style={{
          backgroundColor: COLOR_WHITE,
          height: cardHeight,
          width: cardWidth,
        }}
        onClick={() => onClick(index)}
      >
        <div className={cvThumbnailClassname}>
          <Image
            src={thumbnail || fallbackImagePath}
            alt="avatar"
            fill
            className="rounded-lg"
          />
        </div>
        {isActive && (
          <div className={cvDescriptionWrapperClassname}>
            <div className={cvNameClassname}>{item.title}</div>
            <div className={cvDescriptionClassname}>{item.description}</div>
            <div className={downloadIconClassname}>
              <DownloadButton item={item} />
            </div>
          </div>
        )}
      </div>
    </FM_Scale>
  );
}

interface DownloadButtonProps {
  item: CVCardItem;
}
function DownloadButton({ item }: DownloadButtonProps) {
  const downloadButtonWrapperClassname = `select-none 
    flex flex-row justify-center items-center h-full space-x-3
    rounded-bl-lg rounded-br-lg p-2`;
  const downloadTextClassname = `${FONT_POPPINS.className} ${FONTSTYLE_SUBTEXT2}`;

  return (
    <Link href={item.pdfPath}>
      <div
        className={downloadButtonWrapperClassname}
        style={{
          backgroundColor: COLOR_PRIMARY,
        }}
      >
        <DownloadIcon className="w-8 h-8" style={{ color: COLOR_WHITE }} />
        <div
          className={downloadTextClassname}
          style={{
            color: COLOR_WHITE,
          }}
        >
          Download
        </div>
      </div>
    </Link>
  );
}
