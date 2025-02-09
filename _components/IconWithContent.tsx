import { COLOR_PRIMARY, COLOR_WHITE } from "@/_constants/Colors";
import { FONT_POPPINS2, FONTSTYLE_SUBTEXT2 } from "@/_constants/Fonts";

import { ReactNode } from "react";
export type IconWithContentType = {
  icon: ReactNode;
  content: string;
};

export interface IconWithContentProps {
  icon: ReactNode;
  content: string;
}
export default function IconWithContent(props: IconWithContentProps) {
  const iconWithContentClassname =
    "flex flex-row items-center grid-cols-12 space-x-8";
  const iconBgClassname = "col-span-5 w-32 h-32 rounded-full p-4";
  const iconClassname = "w-24 h-24 h-full";
  const contentClassname = `${FONT_POPPINS2.className} ${FONTSTYLE_SUBTEXT2} col-span-7`;
  return (
    <div className={iconWithContentClassname}>
      <div
        className={iconBgClassname}
        style={{ backgroundColor: COLOR_PRIMARY }}
      >
        <div className={iconClassname} style={{ color: COLOR_WHITE }}>
          {props.icon}
        </div>
      </div>
      <div className={contentClassname}>{props.content}</div>
    </div>
  );
}
