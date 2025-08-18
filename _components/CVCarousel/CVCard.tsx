import { DownloadIcon } from "lucide-react";
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
import { CVCardProps } from "./types";
import Image from "next/image";
import { thumbnailFromPdf } from "../../utils/PdfUtils";
export default function CVCard({
  index,
  isActive,
  onClick,
  item,
}: CVCardProps) {
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const fallbackImagePath = "/question-mark.png";
  const [thumbnail, setThumbnail] = useState<string>();
  const cvContentClassname = "p-3";
  const cvCardClassname = `rounded-lg grid grid-flow-col grid-rows-12 justify-center`;
  const cvThumbnailClassname = `${isActive ? "row-span-7" : "row-span-12"} 
    flex flex-row justify-center align-center select-none`;
  const cvNameClassname = `${cvContentClassname} ${FONTSTYLE_SUBTEXT1} 
    ${FONT_LEXEND.className} row-span-1 select-none`;
  const cvDescriptionClassname = `${cvContentClassname} ${FONTSTYLE_PARAGRAPH2} 
    ${FONT_POPPINS.className} row-span-3 select-none`;
  const downloadIconClassname = `row-span-1 select-none`;

  const updateThumbnail = async () => {
    const res = await thumbnailFromPdf({ pdfPath: item.pdfPath });
    setThumbnail(res);
  };
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
    updateThumbnail();
  }, []);

  return (
    <FM_Scale shouldScale={isActive || false} fromScale={0.65} toScale={0.88}>
      <div
        className={cvCardClassname}
        style={{
          backgroundColor: COLOR_WHITE,
          height: screenHeight * 0.85,
          width: screenWidth * 0.4,
        }}
        onClick={() => onClick(index)}
      >
        <div className={cvThumbnailClassname}>
          <Image
            src={thumbnail || fallbackImagePath}
            alt="avatar"
            width={500}
            height={100}
          />
        </div>
        {isActive && (
          <>
            <div className={cvNameClassname}>{item.title}</div>
            <div className={cvDescriptionClassname}>{item.description}</div>
            <div className={downloadIconClassname}>
              <DownloadButton />
            </div>
          </>
        )}
      </div>
    </FM_Scale>
  );
}

function DownloadButton() {
  const downloadButtonWrapperClassname = `select-none 
    flex flex-row justify-center items-center h-full space-x-3
    rounded-bl-lg rounded-br-lg p-2`;
  const downloadTextClassname = `${FONT_POPPINS.className} ${FONTSTYLE_SUBTEXT2}`;
  return (
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
  );
}
