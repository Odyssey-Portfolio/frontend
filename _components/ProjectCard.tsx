import { COLOR_PRIMARY, COLOR_PRIMARY_LIGHT } from "@/_constants/Colors";
import {
  DUMMYTEXT_IMAGE,
  DUMMYTEXT_LOREMIPSUMSHORT,
} from "@/_constants/DummyText";
import { FONT_LEXEND, FONT_POPPINS } from "@/_constants/Fonts";
import { PresentationChartBarIcon } from "@heroicons/react/16/solid";
import Image from "next/image";

export default function ProjectCard() {
  const projectCardClassname = `relative rounded-lg flex flex-col `;
  const overlayClassname = `absolute inset-0 flex items-center rounded-lg
                            justify-center bg-black bg-opacity-0 opacity-0
                            transition-all duration-300 hover:bg-opacity-50
                            hover:opacity-100`;
  const topSectionClassname = `p-5 flex flex-row items-center space-x-5`;
  const projectIconClassname = `w-16`;
  const projectNameClassname = `${FONT_LEXEND.className} cursor-default`;
  const paragraphClassname = `p-5 ${FONT_POPPINS.className}`;
  return (
    <div
      className={projectCardClassname}
      style={{ backgroundColor: COLOR_PRIMARY_LIGHT }}
    >
      <div className={topSectionClassname}>
        <div className={projectIconClassname} style={{ color: COLOR_PRIMARY }}>
          <PresentationChartBarIcon />
        </div>
        <div className={projectNameClassname}>DUMMYPROJECTNAME</div>
      </div>
      <div style={{ width: "100%", height: "14rem" }}>
        <Image
          src={DUMMYTEXT_IMAGE}
          alt="avatar"
          width={0}
          height={0}
          sizes="100vh"
          style={{ height: "100%", width: "100%" }}
        />
      </div>
      <div className={paragraphClassname}>{DUMMYTEXT_LOREMIPSUMSHORT}</div>
      <div className={overlayClassname}>
        <span className="text-white font-semibold text-lg cursor-default">
          View on GitHub
        </span>
      </div>
    </div>
  );
}
