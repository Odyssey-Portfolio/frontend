"use client";
import { createPortal } from "react-dom";

import {
  CSSProperties,
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import FM_FadeIn from "../FramerMotion/FM_FadeIn";
import { CVCarouselProps } from "./types";
import Backdrop from "./Backdrop";

import NavigationButton from "./NavigationButton";
import { RESUMES } from "../../_contents/Resumes";
import {
  FONTSTYLE_HEADING3,
  FONTSTYLE_PARAGRAPH1,
  FONT_LEXEND,
  FONT_POPPINS,
} from "../../_constants/Fonts";
import { COLOR_WHITE } from "../../_constants/Colors";
import { CVCard } from "./CVCard";

export default function CVCarousel(props: CVCarouselProps) {
  if (typeof window === "undefined") return null; // SSR-safe
  return createPortal(
    <FM_FadeIn showChildren={props.showCarousel || false}>
      <Backdrop closeAction={props.closeAction}>
        <>
          <Title />
          <CVHorizontalScrollWrapper />
        </>
      </Backdrop>
    </FM_FadeIn>,
    document.body
  );
}

function Title() {
  const titleWrapperClassName = `w-full flex flex-col justify-center items-center gap-y-6`;
  const sharedStyle: CSSProperties = {
    color: COLOR_WHITE,
  };
  const titleClassname = `${FONT_LEXEND.className} ${FONTSTYLE_HEADING3}`;
  const subtitleClassname = `${FONT_POPPINS.className} ${FONTSTYLE_PARAGRAPH1} `;
  return (
    <div className={titleWrapperClassName} style={sharedStyle}>
      <div className={titleClassname} style={sharedStyle}>
        {" "}
        My CVs
      </div>
      <div className={subtitleClassname}> </div>
    </div>
  );
}
function CVHorizontalScrollWrapper() {
  const cvHorizontalScrollWrapperClassname = `flex flex-row items-center justify-center w-96 md:w-full`;
  const cvHorizontalScrollRef = useRef<CVHorizontalScrollRef>(null);
  return (
    <div className={cvHorizontalScrollWrapperClassname}>
      <NavigationButton
        variant="left"
        goToPrevCard={() => cvHorizontalScrollRef.current?.goToPrevCard()}
      />
      <CVHorizontalScroll ref={cvHorizontalScrollRef} />
      <NavigationButton
        variant="right"
        goToNextCard={() => cvHorizontalScrollRef.current?.goToNextCard()}
      />
    </div>
  );
}

interface CVHorizontalScrollRef {
  goToPrevCard: () => void;
  goToNextCard: () => void;
}

const CVHorizontalScroll = forwardRef(
  (_: unknown, ref: Ref<CVHorizontalScrollRef>) => {
    const cvHorizontalScrollClassname = `flex flex-row w-96 h-96 md:w-3/5 
    overflow-hidden scroll-smooth items-center rounded-lg`;
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeCard, setActiveCard] = useState(0);
    useImperativeHandle(ref, () => {
      return {
        goToPrevCard() {
          if (activeCard > 0) setActiveCard(activeCard - 1);
        },
        goToNextCard() {
          if (activeCard < RESUMES.length - 1) setActiveCard(activeCard + 1);
        },
      };
    });

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
      <div className={cvHorizontalScrollClassname}>
        {RESUMES.map((resume, key) => {
          const isActive = key === activeCard;
          return (
            <CVCard
              key={key}
              ref={(ref: HTMLDivElement | null) => {
                cardRefs.current[key] = ref;
              }}
              index={key}
              onClick={(index: number) => setActiveCard(index)}
              isActive={isActive}
              item={resume}
            />
          );
        })}
      </div>
    );
  }
);
CVHorizontalScroll.displayName = "CVHorizontalScroll";
