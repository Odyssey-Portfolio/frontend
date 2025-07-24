"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

import FM_AppearOnHover from "./FramerMotion/FM_AppearOnHover";

export interface IconButtonWithModalProps {
  icon: string;
  name: string;
  description: string;
}

const IconButtonWithModal: React.FC<IconButtonWithModalProps> = ({
  icon,
  name,
  description,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
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
  const hoverStyle: React.CSSProperties = {
    transform: isHovered ? "scale(1.1)" : "scale(1)",
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + rect.height + 2, // below the icon
        left: rect.left, // center-ish align (adjust as needed)
        width: rect.width,
      });
    }
  };

  return (
    <div
      ref={buttonRef}
      className={wrapperClassname}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Button with Icon */}
      <div className={buttonClassname} style={hoverStyle}>
        <Image
          src={icon}
          alt="avatar"
          width={0}
          height={0}
          sizes="100vh"
          style={{
            width: "60%",
          }}
        />
      </div>

      {isHovered && position && (
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
  bg-white border border-gray-200 z-10
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
