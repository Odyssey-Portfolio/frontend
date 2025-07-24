"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

import FM_AppearOnHover from "./FramerMotion/FM_AppearOnHover";
import { useIsMediumScreen } from "../_hooks/useIsMediumScreen";
import { COLOR_WHITE } from "../_constants/Colors";

export interface IconButtonWithModalProps {
  icon: string;
  name?: string;
  description?: string;
  url?: string;
}

const IconButtonWithModal: React.FC<IconButtonWithModalProps> = ({
  icon,
  name,
  description,
  url,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const timeout = 2000;
  const isMediumScreen = useIsMediumScreen();
  const showModalTimeoutRef = useRef<NodeJS.Timeout>(null);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const wrapperClassname = `relative flex flex-col space-y-4 items-center
    justify-center w-24 h-24 md:w-48 md:h-48`;
  const buttonClassname = `absolute
    rounded-lg flex items-center justify-center    
    transform transition duration-500 hover:scale-110
  `;
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (showModalTimeoutRef.current) clearTimeout(showModalTimeoutRef.current);
  };
  const handleClick = () => {
    if (url) window.open(url);
  };
  useEffect(() => {
    if (!isHovered && showModalTimeoutRef.current)
      clearTimeout(showModalTimeoutRef.current);
    showModalTimeoutRef.current = setTimeout(() => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setPosition({
          top: rect.top, // below the icon
          left: rect.left + 120, // center-ish align (adjust as needed)
          width: rect.width,
        });
      }
    }, timeout);
  }, [isHovered]);

  const shouldShowModal = isHovered && position && name && description;

  return (
    <div
      ref={buttonRef}
      className={`${wrapperClassname} ${isHovered ? "scale-up" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Button with Icon */}
      <div className={buttonClassname}>
        <Image
          src={icon}
          alt="avatar"
          width={0}
          height={0}
          sizes="100vh"
          style={{
            width: isMediumScreen ? "60%" : "50%",
          }}
        />
      </div>

      {shouldShowModal && (
        <FM_AppearOnHover>
          <IconModal
            icon={icon}
            name={name}
            description={description}
            top={position.top}
            left={position.left}
            width={position.width}
          />
        </FM_AppearOnHover>
      )}
    </div>
  );
};

interface IconModalProps extends IconButtonWithModalProps {
  top: number;
  left: number;
  width: number;
}
function IconModal(props: IconModalProps) {
  const modalClassname = `fixed p-3 rounded-md shadow-lg
  bg-white border border-gray-200 z-10 cursor-default
`;
  const modalTitleClassname = "font-semibold text-gray-800";
  const modalDescriptionClassname = "text-gray-600 text-sm mt-1";
  //const documentBody = document.body;
  return createPortal(
    <div
      className={modalClassname}
      style={{
        top: props.top,
        left: props.left,
        width: props.width,
      }}
    >
      <div className={modalTitleClassname}>{props.name}</div>
      <div className={modalDescriptionClassname}>{props.description}</div>
    </div>,
    document.body
  );
}
export default IconButtonWithModal;
