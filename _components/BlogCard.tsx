import { COLOR_PRIMARY } from "@/_constants/Colors";
import {
    FONT_LEXEND,
    FONT_POPPINS,
    FONTSTYLE_PARAGRAPH1,
    FONTSTYLE_SUBTEXT2,
} from "@/_constants/Fonts";
import { BookOpenIcon } from "@heroicons/react/16/solid";
import Image from "next/image";

interface BlogCardProps {
  image: string;
  title: string;
  subtitle: string;
  url: string;
}
export default function BlogCard(props: BlogCardProps) {
  const blogCardClassname = `relative rounded-lg flex flex-col h-full`;
  const imageClassname = `h-64 w-full`;
  const detailsClassname = `p-2 space-y-3`;
  return (
    <div className={blogCardClassname}>
      <div className={imageClassname}>
        <Image
          src={props.image}
          alt="avatar"
          width={0}
          height={0}
          sizes="100vh"
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 25,
          }}
        />
      </div>
      <div className={detailsClassname}>
        <TitleSection {...props} />
        <GoToBlogSection {...props} />
      </div>
    </div>
  );
}

function TitleSection(props: BlogCardProps) {
  const titleClassname = `${FONT_LEXEND.className} ${FONTSTYLE_SUBTEXT2}`;
  const subtitleClassname = `${FONT_POPPINS.className}`;
  return (
    <>
      <div className={titleClassname}>
        {props.title}
      </div>
      <div className={subtitleClassname}>{props.subtitle}</div>
    </>
  );
}

function GoToBlogSection(props: BlogCardProps) {
  const goToBlogClassname = `flex flex-row space-x-2 items-center cursor-default select-none`;
  const iconClassname = `col-span-2 w-12 h-12`;
  const labelClassname = `${FONT_POPPINS.className} ${FONTSTYLE_PARAGRAPH1}`;
  const goToBlog = () => {
    console.log("blogUrl", props.url);
  };
  return (
    <div
      className={goToBlogClassname}
      style={{ color: COLOR_PRIMARY }}
      onClick={goToBlog}
    >
      <div className={iconClassname}>
        <BookOpenIcon />
      </div>
      <div className={labelClassname}>Read</div>
    </div>
  );
}
