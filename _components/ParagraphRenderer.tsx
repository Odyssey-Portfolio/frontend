"use client"; //ONLY FOR NEXT.JS: Lets the client render this component, instead of the server.
import { COLOR_SECONDARY } from "@/_constants/Colors";
import { FONT_POPPINS } from "@/_constants/Fonts";
import { useEffect, useState } from "react";

export interface ParagraphRendererProps {
  paragraph: string;
}
export default function ParagraphRenderer(props: ParagraphRendererProps) {
  const [chunks, setChunks] = useState<string[]>();
  const chunkClassname = `${FONT_POPPINS.className} text-lg/8 grid col-span-8`;
  useEffect(() => {
    setChunks(props.paragraph.split("\n"));
  }, [props.paragraph]); // Runs when paragraph changes

  return (
    <>
      {chunks &&
        chunks.map((chunk, index) => (
          <div
            className={chunkClassname}
            style={{ color: COLOR_SECONDARY }}
            key={index}
          >
            {chunk}
          </div>
        ))}
    </>
  );
}
