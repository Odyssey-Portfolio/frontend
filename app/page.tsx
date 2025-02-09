import RoundedImage from "@/_components/RoundedImage";

import IconWithContent, {
  IconWithContentType,
} from "@/_components/IconWithContent";
import { COLOR_PRIMARY, COLOR_SECONDARY } from "@/_constants/Colors";

import NumberedTitleContent from "@/_components/NumberedTitleContent";
import ParagraphRenderer from "@/_components/ParagraphRenderer";
import { CONTENT_LIFESTORY } from "@/_constants/Content";
import {
  DUMMYTEXT_LOREMIPSUM,
  DUMMYTEXT_LOREMIPSUMSHORT,
} from "@/_constants/DummyText";
import {
  CalendarDaysIcon,
  EnvelopeOpenIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import {
  FONT_LEXEND,
  FONT_POPPINS,
  FONTSTYLE_HEADING1,
  FONTSTYLE_HEADING2,
  FONTSTYLE_SUBTEXT1,
} from "../_constants/Fonts";

export default function HomePage() {
  const aboutMeClassname = `flex flex-col m-12 items-center justify-center space-y-10`;
  return (
    <div className={aboutMeClassname}>
      <WelcomeText />
      <AvatarAndBio />
      <AboutMe />
      <MyLifeStory />
      <FutureGoals />
    </div>
  );
}

function WelcomeText() {
  const welcomeClassname = `text-center space-y-2`;
  const h1Classname = `${FONT_LEXEND.className} ${FONTSTYLE_HEADING1}`;
  const h2Classname = `${FONT_LEXEND.className} ${FONTSTYLE_SUBTEXT1}`;
  return (
    <div className={welcomeClassname}>
      <h1 className={h1Classname} style={{ color: COLOR_PRIMARY }}>
        Howdey hey! I'm Anh.
      </h1>
      <h6 className={h2Classname} style={{ color: COLOR_SECONDARY }}>
        Or you can call me Andy!
      </h6>
    </div>
  );
}
function AvatarAndBio() {
  const avatarAndBioClassname = `flex flex-row w-4/5 grid grid-cols-12 items-center`;
  const roundedImageClassname = `col-span-4`;
  const bioClassname = `${FONT_POPPINS.className} text-lg/8 grid col-span-8`;
  const dummyImage = `https://i.pinimg.com/736x/85/a8/6b/85a86b60879d179538179b27e126a18f.jpg`;
  return (
    <div className={avatarAndBioClassname}>
      <div className={roundedImageClassname}>
        <RoundedImage src={dummyImage} height={300} width={200} />
      </div>
      <p className={bioClassname}>{DUMMYTEXT_LOREMIPSUM}</p>
    </div>
  );
}
function AboutMe() {
  const headingClassname = `${FONT_LEXEND.className} ${FONTSTYLE_HEADING2}`;
  const aboutMeClassname = `flex flex-col w-4/5 items-center space-y-3`;
  const iconWithContentClassname = `space-y-2`;
  const information: IconWithContentType[] = [
    { icon: <UserIcon />, content: "Đào Việt Anh (Andy)" },
    { icon: <CalendarDaysIcon />, content: "March 06, 2003" },
    {
      icon: <EnvelopeOpenIcon />,
      content: "anhdv6303@gmail.com",
    },
    { icon: <MapPinIcon />, content: "Ho Chi Minh City, Vietnam" },
  ];
  return (
    <div className={aboutMeClassname}>
      <h1 className={headingClassname} style={{ color: COLOR_PRIMARY }}>
        About Me
      </h1>
      <div className={iconWithContentClassname}>
        {information.map((info, key) => {
          return (
            <IconWithContent
              key={key}
              icon={info.icon}
              content={info.content}
            />
          );
        })}
      </div>
    </div>
  );
}

function MyLifeStory() {
  const headingClassname = `${FONT_LEXEND.className} ${FONTSTYLE_HEADING2}`;
  const aboutMeClassname = `flex flex-col w-4/5 items-center space-y-4`;
  return (
    <div className={aboutMeClassname}>
      <h1 className={headingClassname} style={{ color: COLOR_PRIMARY }}>
        My Software development Story
      </h1>
      <ParagraphRenderer paragraph={CONTENT_LIFESTORY} />
    </div>
  );
}

function FutureGoals() {
  const headingClassname = `${FONT_LEXEND.className} ${FONTSTYLE_HEADING2}`;
  const aboutMeClassname = `flex flex-col w-4/5 items-center space-y-4`;
  const numberedTitleContentClassname = `flex flex-row grid grid-cols-12`;
  const numbers = [0, 1, 2, 3];
  return (
    <div className={aboutMeClassname}>
      <h1 className={headingClassname} style={{ color: COLOR_PRIMARY }}>
        And the next steps?
      </h1>
      <div className={numberedTitleContentClassname}>
        {numbers.map((number, key) => {
          return (
            <div className={"col-span-6 p-4"} key={key}>
              <NumberedTitleContent
                number={number + 1}
                title="Dummy Title"
                description={DUMMYTEXT_LOREMIPSUMSHORT}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
