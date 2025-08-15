import { JSX } from "react/jsx-dev-runtime";
import { COLOR_PRIMARY, COLOR_RED, COLOR_WHITE } from "../_constants/Colors";
import Image from "next/image";
import { createPortal } from "react-dom";
import {
  XCircleIcon,
  DownloadIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  FONTSTYLE_PARAGRAPH2,
  FONTSTYLE_SUBTEXT1,
  FONTSTYLE_SUBTEXT2,
  FONT_LEXEND,
  FONT_POPPINS,
} from "../_constants/Fonts";
import { DUMMYTEXT_LOREMIPSUMSHORT } from "../_constants/DummyText";
import {
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface CVCarouselProps {
  closeAction: () => void;
}
export default function CVCarousel(props: CVCarouselProps) {
  return createPortal(
    <Backdrop closeAction={props.closeAction}>
      <CVHorizontalScrollWrapper />
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

function CVHorizontalScrollWrapper() {
  const cvHorizontalScrollWrapperClassname = `flex flex-row space-x-12 items-center justify-center`;
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
    const cvHorizontalScrollClassname = `flex flex-row space-x-5 w-3/5
    overflow-hidden scroll-smooth items-center rounded-lg`;
    const indexes = [0, 1, 2];
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeCard, setActiveCard] = useState(0);
    useImperativeHandle(ref, () => {
      return {
        goToPrevCard() {
          if (activeCard > 0) setActiveCard(activeCard - 1);
        },
        goToNextCard() {
          if (activeCard < indexes.length - 1) setActiveCard(activeCard + 1);
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
    );
  }
);
CVHorizontalScroll.displayName = "CVHorizontalScroll";
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

interface NavigationButtonProps {
  variant: "left" | "right";
  goToPrevCard?: () => void | undefined;
  goToNextCard?: () => void | undefined;
}
function NavigationButton({
  variant,
  goToPrevCard,
  goToNextCard,
}: NavigationButtonProps) {
  const [clicked, setClicked] = useState(false);
  const buttonSizeClassname = "w-24 h-24";
  const handleClick = () => {
    setClicked(true); // set clicked state
    setTimeout(() => setClicked(false), 100); // reset after 200ms

    // Trigger the correct action
    if (variant === "left" && goToPrevCard) goToPrevCard();
    if (variant === "right" && goToNextCard) goToNextCard();
  };

  const iconColor = clicked ? COLOR_PRIMARY : COLOR_WHITE;
  return (
    <>
      {variant === "left" ? (
        <ChevronLeft
          onClick={handleClick}
          className={buttonSizeClassname}
          style={{ color: iconColor }}
        />
      ) : (
        <ChevronRight
          onClick={handleClick}
          className={buttonSizeClassname}
          style={{ color: iconColor }}
        />
      )}
    </>
  );
}
