import FM_Reveal from "../../_components/FramerMotion/FM_Reveal";
import IconButtonWithModal from "../../_components/IconButtonWithModal";
import { COLOR_PRIMARY } from "../../_constants/Colors";
import {
  FONT_LEXEND,
  FONT_POPPINS,
  FONTSTYLE_HEADING1,
  FONTSTYLE_SUBTEXT1,
} from "../../_constants/Fonts";
import {
  ABOUT_PORTFOLIO_FLATICON,
  ABOUT_PORTFOLIO_GITHUB,
  ABOUT_PORTFOLIO_TECH_STACKS,
} from "../../_contents/AboutPortfolio";

const headingTextClassname = `${FONTSTYLE_SUBTEXT1} ${FONT_POPPINS.className}`;
export default function AboutPortfolioPage() {
  const aboutPortfolioPageClassname = `flex flex-col mt-32 md:mx-24 mb-12   
                                items-center justify-between space-y-12`;
  return (
    <div>
      <FM_Reveal className={aboutPortfolioPageClassname}>
        <HeadingText />
      </FM_Reveal>
      <FM_Reveal className={aboutPortfolioPageClassname}>
        <TechStackSection />
      </FM_Reveal>
      <FM_Reveal className={aboutPortfolioPageClassname}>
        <ExtraInfoSection />
      </FM_Reveal>
    </div>
  );
}

function HeadingText() {
  const h1Classname = `${FONT_LEXEND.className} ${FONTSTYLE_HEADING1}`;
  //const h2Classname = `${FONT_LEXEND.className} ${FONTSTYLE_SUBTEXT2}`;
  return (
    <FM_Reveal>
      <h1 className={h1Classname} style={{ color: COLOR_PRIMARY }}>
        About Portfolio
      </h1>
    </FM_Reveal>
  );
}

function TechStackSection() {
  const techStackSectionWrapperClassname = `flex flex-col space-y-5 items-center`;
  const techStackContainerClassname = `flex flex-row justify-center
  space-x-3 w-full md:space-x-12 overflow-x-auto`;
  return (
    <div className={techStackSectionWrapperClassname}>
      <div className={headingTextClassname}>Tech Stack</div>
      <div className={techStackContainerClassname}>
        {ABOUT_PORTFOLIO_TECH_STACKS.map((item, key) => {
          return (
            <IconButtonWithModal
              key={key}
              icon={item.icon}
              name={item.name}
              description={item.description}
              url={item.url}
            />
          );
        })}
      </div>
    </div>
  );
}
function ExtraInfoSection() {
  const extraInfoSectionWrapper = `columns-2 w-full`;
  return (
    <div className={extraInfoSectionWrapper}>
      <ResourcesSection />
      <PortfolioRepositorySection />
    </div>
  );
}

function ResourcesSection() {
  const techStackSectionWrapperClassname = `flex flex-col space-y-5 items-center`;
  const techStackContainerClassname = `flex flex-col md:flex-row justify-center md:space-x-12`;
  return (
    <div className={techStackSectionWrapperClassname}>
      <div className={headingTextClassname}>Resources</div>
      <div className={techStackContainerClassname}>
        <IconButtonWithModal
          icon={ABOUT_PORTFOLIO_FLATICON.icon}
          name={ABOUT_PORTFOLIO_FLATICON.name}
          description={ABOUT_PORTFOLIO_FLATICON.description}
          url={ABOUT_PORTFOLIO_FLATICON.url}
        />
      </div>
    </div>
  );
}

function PortfolioRepositorySection() {
  const gitHubSectionWrapperClassname = `flex flex-col space-y-5 items-center w-full`;
  return (
    <div className={gitHubSectionWrapperClassname}>
      <div className={headingTextClassname}>Repository</div>
      <IconButtonWithModal
        icon={ABOUT_PORTFOLIO_GITHUB.icon}
        name={ABOUT_PORTFOLIO_GITHUB.name}
        description={ABOUT_PORTFOLIO_GITHUB.description}
        url={ABOUT_PORTFOLIO_GITHUB.url}
      />
    </div>
  );
}
