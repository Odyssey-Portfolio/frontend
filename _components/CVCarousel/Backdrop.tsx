import { XCircleIcon } from "lucide-react";
import { useState } from "react";
import { COLOR_RED, COLOR_WHITE } from "../../_constants/Colors";
import { BackdropProps } from "./types";

export default function Backdrop(props: BackdropProps) {
  const backdropClassname = `fixed inset-0 bg-gray-500/90 z-30 flex items-center justify-center`;
  const childrenWrapperClassname = `flex flex-col justify-center items-center w-full h-full md:h-9/10`;
  const xButtonClassname = `absolute top-0 right-0 p-2`;
  const [exitClicked, setExitClicked] = useState(false);
  return (
    <div className={backdropClassname}>
      <div className={childrenWrapperClassname}>
        <div className={xButtonClassname}>
          <XCircleIcon
            onMouseUp={() => setExitClicked(false)}
            onMouseDown={() => setExitClicked(true)}
            onMouseLeave={() => setExitClicked(false)}
            onClick={props.closeAction}
            className="w-12 h-12"
            style={{ color: exitClicked ? COLOR_RED : COLOR_WHITE }}
          />
        </div>
        {props.children}
      </div>
    </div>
  );
}
