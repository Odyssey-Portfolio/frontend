import { JSX } from "react/jsx-dev-runtime";
import { COLOR_PRIMARY, COLOR_RED, COLOR_WHITE } from "../_constants/Colors";
import Image from "next/image";
import { createPortal } from "react-dom";
import {
  XCircleIcon,
  ArrowBigRight,
  ArrowBigLeft,
  DownloadIcon,
} from "lucide-react";
import {
  FONTSTYLE_PARAGRAPH2,
  FONTSTYLE_SUBTEXT1,
  FONTSTYLE_SUBTEXT2,
  FONT_LEXEND,
  FONT_POPPINS,
} from "../_constants/Fonts";
import { DUMMYTEXT_LOREMIPSUMSHORT } from "../_constants/DummyText";
import { useEffect, useRef, useState } from "react";

interface CVCarouselProps {
  closeAction: () => void;
}
export default function CVCarousel(props: CVCarouselProps) {
  return createPortal(
    <Backdrop closeAction={props.closeAction}>
      <CVHorizontalScroll />
    </Backdrop>,
    document.body
  );
}

interface BackdropProps extends CVCarouselProps {
  children: JSX.Element;
}
function Backdrop(props: BackdropProps) {
  const backdropClassname = `fixed inset-0 bg-gray-500/50 flex flex-row items-center justify-center`;
  const xButtonClassname = `absolute top-0 right-0 p-2`;
  return (
    <div className={backdropClassname}>
      <div className={xButtonClassname}>
        <XCircleIcon
          onClick={props.closeAction}
          className="w-12 h-12"
          style={{ color: COLOR_RED }}
        />
      </div>
      {props.children}
    </div>
  );
}

//interface CVHorizontalScrollProps {}
function CVHorizontalScroll() {
  const cvHorizontalScrollClassname = `flex flex-row gap-5 w-5/6
    overflow-hidden scroll-smooth items-center`;
  const indexes = [0, 1, 2];
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCard, setActiveCard] = useState(0);
  const goToNextCard = () => {
    if (activeCard < indexes.length - 1) setActiveCard(activeCard + 1);
  };
  const goToPrevCard = () => {
    if (activeCard > 0) setActiveCard(activeCard - 1);
  };
  useEffect(() => {
    if (cardRefs.current[activeCard]) {
      cardRefs.current[activeCard]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeCard]);
  return (
    <>
      <ArrowBigLeft
        onClick={goToPrevCard}
        className="w-12 h-12"
        style={{ color: COLOR_RED }}
      />
      <div className={cvHorizontalScrollClassname}>
        {indexes.map((index, key) => {
          const isActive = index === activeCard;
          return (
            <div
              ref={(ref) => {
                cardRefs.current[index] = ref;
              }}
              key={key}
            >
              <CVCard
                index={index}
                onClick={(index) => setActiveCard(index)}
                image="/next.svg"
                isActive={isActive}
              />
            </div>
          );
        })}
      </div>
      <ArrowBigRight
        onClick={goToNextCard}
        className="w-12 h-12"
        style={{ color: COLOR_RED }}
      />
    </>
  );
}

interface CVCardProps {
  index: number;
  image: string;
  isActive?: boolean;
  onClick: (index: number) => void;
}
function CVCard({ index, image, isActive, onClick }: CVCardProps) {
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const cvContentClassname = "p-3";
  const cvCardClassname = `rounded-lg grid grid-flow-col grid-rows-12 justify-center mx-2`;
  const cvThumbnailClassname = `${isActive ? "row-span-7" : "row-span-12"} 
    flex flex-row justify-center align-center select-none`;
  const cvNameClassname = `${cvContentClassname} ${FONTSTYLE_SUBTEXT1} 
    ${FONT_LEXEND.className} row-span-1 select-none`;
  const cvDescriptionClassname = `${cvContentClassname} ${FONTSTYLE_PARAGRAPH2} 
    ${FONT_POPPINS.className} row-span-3 select-none`;
  const downloadIconClassname = `row-span-1 select-none`;
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  }, []);
  return (
    <div
      className={cvCardClassname}
      style={{
        backgroundColor: COLOR_WHITE,
        width: isActive ? screenWidth * 0.4 : screenWidth * 0.21,
        height: isActive ? screenHeight * 0.85 : screenWidth * 0.25,
      }}
      onClick={() => onClick(index)}
    >
      <div className={cvThumbnailClassname}>
        <Image src={image} alt="avatar" width={500} height={100} />
      </div>
      {isActive && (
        <>
          <div className={cvNameClassname}>My CV</div>
          <div className={cvDescriptionClassname}>
            {DUMMYTEXT_LOREMIPSUMSHORT}
          </div>
          <div className={downloadIconClassname}>
            <DownloadButton />
          </div>
        </>
      )}
    </div>
  );
}

function DownloadButton() {
  const downloadButtonWrapperClassname = `select-none 
    flex flex-row justify-center items-center h-full space-x-3
    rounded-bl-lg rounded-br-lg p-1`;
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
