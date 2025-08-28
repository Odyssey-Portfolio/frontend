"use client";
import { DownloadIcon } from "lucide-react";
import Link from "next/link";
import { forwardRef, Ref } from "react";
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
import { useIsMediumScreen } from "../../_hooks/useIsMediumScreen";
import FM_FadeIn from "../FramerMotion/FM_FadeIn";

export const CVCard = forwardRef<HTMLDivElement, CVCardProps>(
  (
    { index, isActive, onClick, item }: CVCardProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const isMediumScreen = useIsMediumScreen();

    const fallbackImagePath = "/question-mark.png";
    const shouldFillScreen = isActive && !isMediumScreen;
    const cvContentClassname = "p-3";
    const cvCardClassname = `flex-shrink-0 rounded-lg`;
    const cvDescriptionWrapperClassname = `${shouldFillScreen && "h-48 overflow-y-scroll"} absolute rounded-b-lg bg-white z-30 row-span-3 grid-rows-3 bottom-0 `;
    const cvNameClassname = `${cvContentClassname} ${FONTSTYLE_SUBTEXT1} 
    ${FONT_LEXEND.className} row-span-1 select-none`;
    const cvPeriodClassname = `${cvContentClassname} ${FONTSTYLE_SUBTEXT2} 
    ${FONT_POPPINS.className} row-span-1 select-none`;
    const cvDescriptionClassname = `${cvContentClassname} ${FONTSTYLE_PARAGRAPH2} 
    ${FONT_POPPINS.className} row-span-2 select-none`;
    const downloadIconClassname = `row-span-2 select-none`;

    const calculateCardWidth = (): string | number => {
      if (!isMediumScreen && isActive) return "100%";
      if (!isMediumScreen && !isActive) return "0%";
      if (!isActive && isMediumScreen) return screenWidth * 0.2;
      return screenWidth * 0.45;
    };

    const calculateCardHeight = (): string | number => {
      if (!isMediumScreen && isActive) return "100%";
      if (!isMediumScreen && !isActive) return "0%";
      if (!isActive && isMediumScreen) return screenHeight * 0.6;
      return screenHeight * 0.75;
    };
    const calculatedCardWidth = calculateCardWidth();
    const calculatedCardHeight = calculateCardHeight();
    const calculateThumbnailWidth = () => {
      //below-medium screen
      if (typeof calculatedCardWidth === "string" && !isActive)
        return screenWidth * 0;
      if (typeof calculatedCardWidth === "string" && isActive)
        return screenWidth * 1;
      //medium-or-above screen
      if (typeof calculatedCardWidth === "number" && !isActive)
        return calculatedCardWidth * 1;
      if (typeof calculatedCardWidth === "number" && isActive)
        return calculatedCardWidth;
    };
    const calculateThumbnailHeight = () => {
      //below-medium screen
      if (typeof calculatedCardHeight === "string" && !isActive)
        return screenHeight * 0;
      if (typeof calculatedCardHeight === "string" && isActive)
        return screenHeight * 0.8;
      //medium-or-above screen
      if (typeof calculatedCardHeight === "number" && !isActive)
        return calculatedCardHeight * 1;
      if (typeof calculatedCardHeight === "number" && isActive)
        return calculatedCardHeight;
    };

    const thumbnail = usePdfThumbnail({
      pdfUrl: item.pdfPath,
      thumbnailWidth: calculateThumbnailWidth(),
      thumbnailHeight: calculateThumbnailHeight(),
    });

    if (typeof window === "undefined") return null; // SSR-safe
    return (
      <FM_Scale
        shouldScale={isActive || false}
        fromScale={0.65}
        toScale={0.88}
        className={cvCardClassname}
        style={{
          width: calculatedCardWidth,
          height: calculatedCardHeight,
        }}
      >
        <div onClick={() => onClick(index)} ref={ref}>
          <Image
            src={thumbnail || fallbackImagePath}
            alt="avatar"
            fill
            className="rounded-lg select-none"
          />

          <FM_FadeIn
            className={cvDescriptionWrapperClassname}
            showChildren={isActive || false}
          >
            <>
              <div className={cvNameClassname}>{item.title}</div>
              <div className={cvPeriodClassname}>{item.period}</div>
              <div className={cvDescriptionClassname}>{item.description}</div>
              <div className={downloadIconClassname}>
                <DownloadButton item={item} />
              </div>
            </>
          </FM_FadeIn>
        </div>
      </FM_Scale>
    );
  }
);

CVCard.displayName = `CVCard`;
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
