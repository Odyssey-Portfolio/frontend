import RoundedImage from "@/_components/RoundedImage";

import IconWithContent, {
  IconWithContentType,
} from "@/_components/IconWithContent";
import { COLOR_PRIMARY, COLOR_SECONDARY } from "@/_constants/Colors";

import FM_Reveal from "@/_components/FramerMotion/FM_Reveal";
import ImageButtonWithModal from "@/_components/ImageButtonWithModal";
import NumberedTitleContent from "@/_components/NumberedTitleContent";
import ParagraphRenderer from "@/_components/ParagraphRenderer";
import {
  CONTENT_FUTUREGOALS,
  CONTENT_HOBBIES,
  CONTENT_LIFESTORY,
  CONTENT_SHORTINTRO,
} from "@/_contents/Home";
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
  FONTSTYLE_SUBTEXT2,
} from "../_constants/Fonts";

export default function HomePage() {
  const homepageClassname = `flex flex-col mt-32 mx-12 mb-12 items-center justify-between space-y-20`;
  return (
    <div>
      <FM_Reveal className={homepageClassname}>
        <>
          <WelcomeText />
          <AvatarAndBio />
        </>
      </FM_Reveal>
      <FM_Reveal className={homepageClassname}>
        <AboutMe />
      </FM_Reveal>
      <FM_Reveal className={homepageClassname}>
        <MyLifeStory />
      </FM_Reveal>
      <FM_Reveal className={homepageClassname}>
        <FutureGoals />
      </FM_Reveal>
      <FM_Reveal className={homepageClassname}>
        <Hobbies />
      </FM_Reveal>
    </div>
  );
}

function WelcomeText() {
  const welcomeClassname = `text-center space-y-5`;
  const h1Classname = `${FONT_LEXEND.className} ${FONTSTYLE_HEADING1}`;
  const h2Classname = `${FONT_LEXEND.className} ${FONTSTYLE_SUBTEXT2}`;
  return (
    <div className={welcomeClassname}>
      <h1 className={h1Classname} style={{ color: COLOR_PRIMARY }}>
        Howdey hey! I&lsquo;m Anh.
      </h1>
      <h6 className={h2Classname} style={{ color: COLOR_SECONDARY }}>
        Or you can call me Andy!
      </h6>
    </div>
  );
}
function AvatarAndBio() {
  const avatarAndBioClassname = `flex flex-col space-y-6 items-center
    md:flex-row md:w-4/5 md:space-x-5 md:space-y-0`;
  return (
    <div className={avatarAndBioClassname}>
      <RoundedImage src={`/my-profile-pic.jpg`} height={300} width={200} />
      <ParagraphRenderer paragraph={CONTENT_SHORTINTRO} isHtml />
    </div>
  );
}
function AboutMe() {
  const aboutMeClassname = `flex flex-col w-4/5 items-center space-y-3`;
  const headingClassname = `${FONT_LEXEND.className} ${FONTSTYLE_HEADING2} text-center`;
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
  const headingClassname = `${FONT_LEXEND.className} ${FONTSTYLE_HEADING2} text-center md:text-left`;
  const aboutMeClassname = `flex flex-col w-4/5 items-center space-y-5`;
  return (
    <div className={aboutMeClassname}>
      <h1 className={headingClassname} style={{ color: COLOR_PRIMARY }}>
        My Software development Story
      </h1>
      <ParagraphRenderer
        paragraph={CONTENT_LIFESTORY}
        lineHeight={2.2}
        isHtml
      />
    </div>
  );
}

function FutureGoals() {
  const headingClassname = `${FONT_LEXEND.className} ${FONTSTYLE_HEADING2} mb-5 text-center md:text-left`;
  const futureGoalsClassname = `flex flex-col w-4/5 items-center space-y-4`;
  const numberedTitleContent = `grid grid-cols-1 md:grid-cols-12 gap-12`;
  return (
    <div className={futureGoalsClassname}>
      <h1 className={headingClassname} style={{ color: COLOR_PRIMARY }}>
        And the next steps?
      </h1>
      <div className={numberedTitleContent}>
        {CONTENT_FUTUREGOALS.map((goal, key) => {
          return (
            <div className={"col-span-6"} key={key}>
              <NumberedTitleContent
                number={key + 1}
                title={goal.title}
                description={goal.description}
                lineHeight={2.2}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Hobbies() {
  const responsiveTextClassname = `text-center md:text-left`;
  const headingClassname = `${FONT_LEXEND.className} ${FONTSTYLE_HEADING2} ${responsiveTextClassname}`;
  const hobbiesClassname = `flex flex-col w-4/5 items-center space-y-4`;
  const subtextClassname = `${FONT_LEXEND.className} ${FONTSTYLE_SUBTEXT2} ${responsiveTextClassname}`;
  const imageButtonWithModalClassname = `flex flex-col space-y-4 md:grid md:grid-cols-12 md:items-center md:space-y-0`;

  return (
    <div className={hobbiesClassname}>
      <h1 className={headingClassname} style={{ color: COLOR_PRIMARY }}>
        It&lsquo;s hobbies time!
      </h1>
      <h1 className={subtextClassname} style={{ color: COLOR_SECONDARY }}>
        If you share any of these with me, let&lsquo;s connect!
      </h1>
      <div className={imageButtonWithModalClassname}>
        {CONTENT_HOBBIES.map((hobby, key) => {
          return (
            <div className={"md:col-span-4 md:mx-5"} key={key}>
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
