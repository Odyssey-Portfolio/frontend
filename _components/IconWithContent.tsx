import { COLOR_PRIMARY, COLOR_WHITE } from "@/_constants/Colors";
import { FONT_POPPINS, FONTSTYLE_SUBTEXT1 } from "@/_constants/Fonts";

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
  const iconBgClassname = "col-span-5 w-24 h-24 rounded-full p-4";
  const iconClassname = "w-16 h-16 h-full";
  const contentClassname = `${FONT_POPPINS.className} ${FONTSTYLE_SUBTEXT1} col-span-7`;
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
