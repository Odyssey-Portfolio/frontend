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
  const expandOnFocusButtonClassname = `flex items-center justify-center gap-2 
                            rounded-full select-none
                            w-24 h-full transition-all duration-300
                            ease-out hover:w-60
                            ${FONT_POPPINS.className}`;
  const iconClassname = `h-9 w-9 transition-transform duration-300`;
  const labelClassname = `${FONT_POPPINS.className} ${FONTSTYLE_PARAGRAPH1} whitespace-nowrap select-none`;
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={props.action}
      className={`${expandOnFocusButtonClassname}`}
      style={{ backgroundColor: COLOR_PRIMARY, color: COLOR_WHITE }}
    >
      <div className={iconClassname}>{props.icon}</div>
      {isHovered && <span className={labelClassname}>{props.label}</span>}
    </div>
  );
}
