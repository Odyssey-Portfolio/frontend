"use client";
import Image from "next/image";
import { useState } from "react";
import Modal from "./Modal";
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

      <Modal
        title={props.title}
        show={isModalOpen || false}
        closeAction={() => {
          setIsModalOpen(false);
        }}
      >
        <ParagraphRenderer isHtml paragraph={props.htmlContent} />
      </Modal>
    </div>
  );
}
