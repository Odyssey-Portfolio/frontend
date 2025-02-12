import { COLOR_PRIMARY } from "@/_constants/Colors";
import {
  FONT_POPPINS,
  FONTSTYLE_HEADING1,
  FONTSTYLE_PARAGRAPH1,
  FONTSTYLE_SUBTEXT1,
} from "@/_constants/Fonts";

export type NumberedTitleContentType = {
  title: string;
  description: string;
};
interface NumberedTitleContentProps {
  number: number;
  title: string;
  description: string;
  lineHeight?: number;
}
export default function NumberedTitleContent(props: NumberedTitleContentProps) {
  const numberedTitleContentClassname = `flex flex-col w-full space-y-2`;
  const numberClassname = `${FONTSTYLE_HEADING1}`;
  const titleClassname = `${FONT_POPPINS.className} ${FONTSTYLE_SUBTEXT1} line-clamp-2 min-h-20`;
  const descriptionClassname = `${FONT_POPPINS.className} ${FONTSTYLE_PARAGRAPH1}`;
  return (
    <div className={numberedTitleContentClassname}>
      <div className={numberClassname} style={{ color: COLOR_PRIMARY }}>
        {props.number}
      </div>
      <div className={titleClassname} style={{ color: COLOR_PRIMARY }}>
        {props.title}
      </div>
      <div
        className={descriptionClassname}
        style={{ lineHeight: props.lineHeight }}
      >
        {props.description}
      </div>
    </div>
  );
}
