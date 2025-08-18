import { XCircleIcon } from "lucide-react";
import { useState } from "react";
import { COLOR_RED, COLOR_WHITE } from "../../_constants/Colors";
import { BackdropProps } from "./types";

export default function Backdrop(props: BackdropProps) {
  const backdropClassname = `fixed inset-0 bg-gray-500/50 flex flex-row items-center justify-center z-30`;
  const xButtonClassname = `absolute top-0 right-0 p-2`;
  const [exitClicked, setExitClicked] = useState(false);
  return (
    <div className={backdropClassname}>
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
  );
}
