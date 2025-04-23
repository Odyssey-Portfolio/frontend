"use client";
import { FONT_LEXEND, FONTSTYLE_SUBTEXT3 } from "@/_constants/Fonts";
import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";
import ParagraphRenderer from "./ParagraphRenderer";

export type ImageButtonWithModalType = {
  image: string;
  title: string;
  htmlContent: string;
};
interface ImageButtonWithModalProps {
  image: string;
  title: string;
  htmlContent: string;
}
export default function ImageButtonWithModal(props: ImageButtonWithModalProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>();
  const imageButtonWithModalClassname = `relative w-64 h-40 rounded-lg 
                                        overflow-hidden shadow-lg transition-all
                                        duration-300 hover:scale-105`;
  const overlayTextClassname = `absolute inset-0 flex items-center 
                                justify-center bg-black bg-opacity-0 opacity-0
                                transition-all duration-300 hover:bg-opacity-50
                                hover:opacity-100`;
  return (
    <div>
      <div
        className={imageButtonWithModalClassname}
        onClick={() => setIsModalOpen(true)}
      >
        <Image src={props.image} alt="avatar" width={500} height={100} />
        <div className={overlayTextClassname}>
          <span className="text-white font-semibold text-lg cursor-default">
            {props.title}
          </span>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title={props.title}
          htmlContent={props.htmlContent}
          closeAction={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

interface ModalProps {
  title: string;
  htmlContent: string;
  closeAction: () => void;
}
function Modal(props: ModalProps) {
  if (typeof window === "undefined") return null; // SSR-safe
  const modalRoot = document.body;
  if (!modalRoot) return null;
  return createPortal(
    <div aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div
        className="fixed inset-0 bg-gray-500/50 transition-opacity z-30"
        aria-hidden="true"
      ></div>
      <div className="fixed inset-0 z-40 w-screen flex items-center justify-center">
        <div className="flex justify-center sm:p-0 h-5/6">
          <div className="relative rounded-lg bg-white text-left shadow-xl transition-all w-8/12">
            <div
              className=" flex flex-row rounded-t-lg bg-gray-50 items-center 
                            justify-between px-4 py-3 sm:flex sm:flex-row sm:px-6"
            >
              <div className={`${FONT_LEXEND.className} ${FONTSTYLE_SUBTEXT3}`}>
                {props.title}
              </div>
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                onClick={props.closeAction}
              >
                Close
              </button>
            </div>
            <div className="m-5 overflow-y-scroll h-5/6">
              <ParagraphRenderer isHtml paragraph={props.htmlContent} />
            </div>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
