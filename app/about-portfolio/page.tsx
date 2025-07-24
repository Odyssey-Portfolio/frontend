import FM_Reveal from "../../_components/FramerMotion/FM_Reveal";
import IconButtonWithModal from "../../_components/IconButtonWithModal";
import { COLOR_PRIMARY } from "../../_constants/Colors";
import {
  FONT_LEXEND,
  FONT_POPPINS,
  FONT_POPPINS2,
  FONTSTYLE_HEADING1,
  FONTSTYLE_SUBTEXT1,
  FONTSTYLE_SUBTEXT2,
} from "../../_constants/Fonts";
import {
  ABOUT_PORTFOLIO_RESOURCES,
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
        <ResourcesSection />
      </FM_Reveal>
      <FM_Reveal className={aboutPortfolioPageClassname}>
        <GitHubSection />
      </FM_Reveal>
    </div>
  );
}

function HeadingText() {
  const headingTextClassname = `text-center space-y-5`;
  const h1Classname = `${FONT_LEXEND.className} ${FONTSTYLE_HEADING1}`;
  //const h2Classname = `${FONT_LEXEND.className} ${FONTSTYLE_SUBTEXT2}`;
  return (
    <FM_Reveal className={headingTextClassname}>
      <>
        <h1 className={h1Classname} style={{ color: COLOR_PRIMARY }}>
          About Portfolio
        </h1>
      </>
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
            />
          );
        })}
      </div>
    </div>
  );
}

function ResourcesSection() {
  const techStackSectionWrapperClassname = `flex flex-col space-y-5 items-center`;
  const techStackContainerClassname = `flex flex-col md:flex-row justify-center md:space-x-12`;
  return (
    <div className={techStackSectionWrapperClassname}>
      <div className={headingTextClassname}>Extra Resources</div>
      <div className={techStackContainerClassname}>
        {ABOUT_PORTFOLIO_RESOURCES.map((item, key) => {
          return (
            <div key={key}>
              <IconButtonWithModal
                icon={item.icon}
                name={item.name}
                description={item.description}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GitHubSection() {
  const gitHubSectionWrapperClassname = `flex flex-col space-y-5 items-center w-full`;
  const gitHubContainerClassname = `flex flex-row justify-center h-full space-x-3  overflow-auto 
  md:space-x-12 `;
  return (
    <div className={gitHubSectionWrapperClassname}>
      <div className={headingTextClassname}>Repository</div>
      <div className={gitHubContainerClassname}>
        {ABOUT_PORTFOLIO_TECH_STACKS.map((item, key) => {
          return (
            <IconButtonWithModal
              key={key}
              icon={item.icon}
              name={item.name}
              description={item.description}
            />
          );
        })}
      </div>
    </div>
  );
}
