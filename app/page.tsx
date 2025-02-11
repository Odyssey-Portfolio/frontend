import RoundedImage from "@/_components/RoundedImage";

import IconWithContent, {
  IconWithContentType,
} from "@/_components/IconWithContent";
import { COLOR_PRIMARY, COLOR_SECONDARY } from "@/_constants/Colors";

import ImageButtonWithModal from "@/_components/ImageButtonWithModal";
import NumberedTitleContent from "@/_components/NumberedTitleContent";
import ParagraphRenderer from "@/_components/ParagraphRenderer";
import {
  CONTENT_HOBBIES,
  CONTENT_LIFESTORY,
  CONTENT_SHORTINTRO,
} from "@/_constants/Content";
import {
  DUMMYTEXT_IMAGE,
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
  FONTSTYLE_HEADING1,
  FONTSTYLE_HEADING2,
  FONTSTYLE_SUBTEXT1,
} from "../_constants/Fonts";

export default function HomePage() {
  const homepageClassname = `flex flex-col m-12 items-center justify-center space-y-10`;
  return (
    <div className={homepageClassname}>
      <WelcomeText />
      <AvatarAndBio />
      <AboutMe />
      <MyLifeStory />
      <FutureGoals />
      <Hobbies />
    </div>
  );
}

function WelcomeText() {
  const welcomeClassname = `text-center space-y-2 mt-12`;
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
  const bioClassname = `grid col-span-8`;
  return (
    <div className={avatarAndBioClassname}>
      <div className={roundedImageClassname}>
        <RoundedImage src={DUMMYTEXT_IMAGE} height={300} width={200} />
      </div>
      <div className={bioClassname}>
        <ParagraphRenderer paragraph={CONTENT_SHORTINTRO} />
      </div>
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
  const futureGoalsClassname = `flex flex-col w-4/5 items-center space-y-4`;
  const numberedTitleContent = `flex flex-row grid grid-cols-12`;
  const numbers = [0, 1, 2, 3];
  return (
    <div className={futureGoalsClassname}>
      <h1 className={headingClassname} style={{ color: COLOR_PRIMARY }}>
        And the next steps?
      </h1>
      <div className={numberedTitleContent}>
        {numbers.map((number, key) => {
          return (
            <div className={"col-span-6 p-4"} key={key}>
              <NumberedTitleContent
                number={key + 1}
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

function Hobbies() {
  const headingClassname = `${FONT_LEXEND.className} ${FONTSTYLE_HEADING2}`;
  const hobbiesClassname = `flex flex-col w-4/5 items-center space-y-4`;
  const imageButtonWithModalClassname = `flex flex-row grid grid-cols-12`;

  return (
    <div className={hobbiesClassname}>
      <h1 className={headingClassname} style={{ color: COLOR_PRIMARY }}>
        Time for some hobbiez!
      </h1>
      <div className={imageButtonWithModalClassname}>
        {CONTENT_HOBBIES.map((hobby, key) => {
          return (
            <div className={"col-span-4 p-4"} key={key}>
              <ImageButtonWithModal
                image={hobby.image}
                title={hobby.title}
                htmlContent={hobby.htmlContent}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
