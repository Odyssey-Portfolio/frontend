"use client";
import { COLOR_PRIMARY, COLOR_WHITE } from "@/_constants/Colors";
import { FONT_POPPINS, FONTSTYLE_PARAGRAPH1 } from "@/_constants/Fonts";
import { useState } from "react";

export interface ExpandOnFocusButtonProps {
  icon: React.ReactNode;
  label: string;
  action?: () => void;
}
export default function ExpandOnFocusButton(props: ExpandOnFocusButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const baseClassname = `flex items-center justify-center gap-2 
                            transition-all duration-300 h-full rounded-full cursor-default 
                            ${FONT_POPPINS.className} z-10`;
  const nonFocusClassname = `w-24`;
  const focusClassname = `w-48 px-4 py-2 overflow-hidden`;
  const iconClassname = `h-9 w-9 transition-transform duration-300`;
  const labelClassname = `${FONT_POPPINS.className} ${FONTSTYLE_PARAGRAPH1} whitespace-nowrap select-none`;
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={props.action}
      className={`${baseClassname} ${
        isHovered ? focusClassname : nonFocusClassname
      }`}
      style={{ backgroundColor: COLOR_PRIMARY, color: COLOR_WHITE }}
    >
      <div className={iconClassname}>{props.icon}</div>
      {isHovered && <span className={labelClassname}>{props.label}</span>}
    </div>
  );
}
