import { COLOR_PRIMARY, COLOR_SECONDARY } from "@/_constants/Colors";
import {
  FONT_LEXEND,
  FONTSTYLE_PARAGRAPH1,
  FONTSTYLE_SUBTEXT1,
} from "@/_constants/Fonts";
import Image from "next/image";

type EmptyListProps = {
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export default function EmptyList({
  title = "Woopsie...",
  description = "Can you please try again later? Thanks <3",
  imageSrc = "/question-mark.png",
  imageAlt = "Empty list",
}: EmptyListProps) {
  const h1Classname = `${FONT_LEXEND.className} ${FONTSTYLE_SUBTEXT1}`;
  const h2Classname = `${FONT_LEXEND.className} ${FONTSTYLE_PARAGRAPH1}`;
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-4 px-4">
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={160}
        height={160}
        className="object-contain"
      />
      <div className="space-y-1">
        <h1 className={h1Classname} style={{ color: COLOR_PRIMARY }}>
          {title}
        </h1>
        <p className={h2Classname} style={{ color: COLOR_SECONDARY }}>
          {description}
        </p>
      </div>
    </div>
  );
}
