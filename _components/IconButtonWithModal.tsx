"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

import FM_AppearOnHover from "./FramerMotion/FM_AppearOnHover";
import Modal from "./Modal";
import Button, { ButtonVariants } from "./AtomicComponents/Button";
import { useIsMediumScreen } from "../_hooks/useIsMediumScreen";

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
  const showModalTimeoutRef = useRef<NodeJS.Timeout>(null);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const wrapperClassname = `relative flex flex-col space-y-4 items-center
    justify-center w-24 h-24 md:w-48 md:h-48`;
  const buttonClassname = `absolute w-full
    rounded-lg flex items-center justify-center    
    transform transition duration-500 hover:scale-110
  `;
  const [isClickModalOpen, setIsClickModalOpen] = useState(false);
  const isMediumScreen = useIsMediumScreen();
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (showModalTimeoutRef.current) clearTimeout(showModalTimeoutRef.current);
  };
  const handleClick = () => {
    if (url && isMediumScreen) window.open(url);
    else {
      setIsClickModalOpen(true);
    }
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

  const shouldShowHoverModal =
    isHovered && isMediumScreen && position && name && description;

  return (
    <>
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
              width: "50%",
            }}
          />
        </div>
      </div>

      {shouldShowHoverModal && (
        <FM_AppearOnHover>
          <HoverModal
            icon={icon}
            name={name}
            description={description}
            url={url}
            top={position.top}
            left={position.left}
            width={position.width}
          />
        </FM_AppearOnHover>
      )}

      <ClickModal
        name={name}
        description={description}
        url={url}
        setShowModal={setIsClickModalOpen}
        showModal={isClickModalOpen}
      />
    </>
  );
};

interface HoverModalProps extends IconButtonWithModalProps {
  top: number;
  left: number;
  width: number;
}
function HoverModal(props: HoverModalProps) {
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

type ClickModalType = Omit<IconButtonWithModalProps, "icon">;
interface ClickModalProps extends ClickModalType {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

function ClickModal(props: ClickModalProps) {
  const bottomActions = [
    <Button
      key="goto"
      label="Go to Website"
      variant={ButtonVariants.PRIMARY}
      onClick={() => window.open(props.url)}
    />,
  ];
  const handleClose = () => {
    props.setShowModal(false);
  };
  return (
    <Modal
      closeAction={handleClose}
      title={props.name as string}
      bottomActions={bottomActions}
      show={props.showModal}
    >
      <>{props.description as string}</>
    </Modal>
  );
}
export default IconButtonWithModal;
