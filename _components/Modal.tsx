import { FONT_LEXEND, FONTSTYLE_SUBTEXT3 } from "@/_constants/Fonts";
import { useIsMediumScreen } from "@/_hooks/useIsMediumScreen";
import { XCircleIcon } from "@heroicons/react/16/solid";
import { createPortal } from "react-dom";
import { COLOR_RED } from "../_constants/Colors";
import { JSX } from "react";

export interface ModalProps {
  title: string;
  children: JSX.Element;
  bottomActions?: JSX.Element[];
  closeAction: () => void;
}
export default function Modal(props: ModalProps) {
  if (typeof window === "undefined") return null; // SSR-safe
  const modalRoot = document.body;
  if (!modalRoot) return null;

  return createPortal(
    <ModalBackdrop {...props}>
      <>
        <ModalBody {...props}>{props.children}</ModalBody>
        <ModalBottomActions {...props} />
      </>
    </ModalBackdrop>,
    modalRoot
  );
}

interface ModalChildrenProps extends ModalProps {
  children: JSX.Element;
}
function ModalBackdrop(props: ModalChildrenProps) {
  const backdropClassname = `fixed inset-0 bg-gray-500/50 transition-opacity 
    z-30 flex flex-row items-center justify-center`;
  const modalBackgroundClassname = `relative rounded-lg bg-white text-left shadow-xl 
    transition-all max-w-[80%] max-h-[80%] flex flex-col`;
  return (
    <>
      <div className={backdropClassname}>
        <div className={modalBackgroundClassname}>{props.children}</div>
      </div>
    </>
  );
}

function ModalBody(props: ModalChildrenProps) {
  const isMdScreen = useIsMediumScreen();
  const paddingClassname = `p-5`;
  const modalHeaderClassname = `flex flex-row rounded-t-lg bg-gray-50 items-center 
                              justify-between sm:flex sm:flex-row h-3/12`;
  const modalBodyClassname = `overflow-y-auto`;
  const closeButtonClassname = `inline-flex w-full justify-center rounded-md 
    bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500
    sm:ml-3 sm:w-auto`;
  return (
    <>
      <div className={`${paddingClassname} ${modalHeaderClassname}`}>
        <div className={`${FONT_LEXEND.className} ${FONTSTYLE_SUBTEXT3}`}>
          {props.title}
        </div>
        {isMdScreen ? (
          <button
            type="button"
            className={closeButtonClassname}
            onClick={props.closeAction}
          >
            Close
          </button>
        ) : (
          <XCircleIcon
            onClick={props.closeAction}
            className="w-12 h-12"
            style={{ color: COLOR_RED }}
          />
        )}
      </div>
      <div className={`${paddingClassname} ${modalBodyClassname}`}>
        {props.children}
      </div>
    </>
  );
}

function ModalBottomActions(props: ModalChildrenProps) {
  return (
    <div className="flex w-full flex-row justify-end">
      <div className="flex flex-row w-2/3 space-x-1 p-5">
        {props.bottomActions &&
          props.bottomActions.map((bottomAction) => {
            return bottomAction;
          })}
      </div>
    </div>
  );
}
