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
    "flex flex-col space-y-5 items-center md:flex-row md:space-x-8";
  const contentClassname = `${FONT_POPPINS.className} ${FONTSTYLE_SUBTEXT1} 
                            text-center md:text-left md:col-span-1`;
  return (
    <div className={iconWithContentClassname}>
      <Icon {...props} />
      <div className={contentClassname}>{props.content}</div>
    </div>
  );
}

function Icon(props: IconWithContentProps) {
  const iconBgClassname = "w-24 h-24 rounded-full p-4";
  const iconClassname = "w-16 h-16 h-full";

  return (
    <div className={iconBgClassname} style={{ backgroundColor: COLOR_PRIMARY }}>
      <div className={iconClassname} style={{ color: COLOR_WHITE }}>
        {props.icon}
      </div>
    </div>
  );
}
