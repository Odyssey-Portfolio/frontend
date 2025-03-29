"use client"; //ONLY FOR NEXT.JS: Lets the client render this component, instead of the server.
import { COLOR_SECONDARY } from "@/_constants/Colors";
import { FONT_POPPINS, FONTSTYLE_PARAGRAPH1 } from "@/_constants/Fonts";
import { useEffect, useState } from "react";

export interface ParagraphRendererProps {
  paragraph: string;
  lineHeight?: number;
}
export default function ParagraphRenderer(props: ParagraphRendererProps) {
  const [chunks, setChunks] = useState<string[]>();
  const chunkClassname = `${FONT_POPPINS.className} ${FONTSTYLE_PARAGRAPH1} grid col-span-8`;
  useEffect(() => {
    setChunks(props.paragraph.split("\n"));
  }, [props.paragraph]); // Runs when paragraph changes

  return (
    <>
      {chunks &&
        chunks.map((chunk, index) => (
          <div
            className={chunkClassname}
            style={{ color: COLOR_SECONDARY, lineHeight: props.lineHeight }}
            key={index}
          >
            {chunk}
          </div>
        ))}
    </>
  );
}
