"use client";
import { createPortal } from "react-dom";

import {
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
import CVCard from "./CVCard";
import NavigationButton from "./NavigationButton";
import { RESUMES } from "../../_contents/Resumes";

export default function CVCarousel(props: CVCarouselProps) {
  if (typeof window === "undefined") return null; // SSR-safe
  return createPortal(
    <FM_FadeIn showChildren={props.showCarousel || false}>
      <Backdrop closeAction={props.closeAction}>
        <CVHorizontalScrollWrapper />
      </Backdrop>
    </FM_FadeIn>,
    document.body
  );
}

function CVHorizontalScrollWrapper() {
  const cvHorizontalScrollWrapperClassname = `flex flex-row items-center justify-center`;
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
    const cvHorizontalScrollClassname = `flex flex-row w-3/5
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
            <div
              ref={(ref) => {
                cardRefs.current[key] = ref;
              }}
              key={key}
            >
              <CVCard
                index={key}
                onClick={(index) => setActiveCard(index)}
                isActive={isActive}
                item={resume}
              />
            </div>
          );
        })}
      </div>
    );
  }
);
CVHorizontalScroll.displayName = "CVHorizontalScroll";
