import FM_Reveal from "@/_components/FramerMotion/FM_Reveal";
import ProjectCard from "@/_components/ProjectCard";
import { COLOR_PRIMARY, COLOR_SECONDARY } from "@/_constants/Colors";
import {
  FONT_LEXEND,
  FONTSTYLE_HEADING1,
  FONTSTYLE_SUBTEXT1,
} from "@/_constants/Fonts";
import { CONTENT_PROJECTS } from "@/_contents/Projects";

export default function ProjectsPage() {
  const projectPageClassname = `flex flex-col mt-32 mx-24 mb-12   
                                items-center justify-between space-y-20`;
  const timelineClassname = `fixed top-1/2 transform -translate-y-1/2 right-2`;
  return (
    <div>
      <div className={projectPageClassname}>
        <HeadingText />
        <ProjectList />
      </div>
      {/* <div className={timelineClassname}> //TODO: Implement year change on scroll
        <ScrollableTimeline />
      </div> */}
    </div>
  );
}

function HeadingText() {
  const headingTextClassname = `text-center space-y-2`;
  const h1Classname = `${FONT_LEXEND.className} ${FONTSTYLE_HEADING1}`;
  const h2Classname = `${FONT_LEXEND.className} ${FONTSTYLE_SUBTEXT1}`;
  return (
    <FM_Reveal className={headingTextClassname}>
      <>
        <h1 className={h1Classname} style={{ color: COLOR_PRIMARY }}>
          Projects
        </h1>
        <h6 className={h2Classname} style={{ color: COLOR_SECONDARY }}>
          A list of projects...
        </h6>
      </>
    </FM_Reveal>
  );
}
function ProjectList() {
  const projectListClassname = `grid grid-cols-3 w-full gap-5`;
  return (
    <div className={projectListClassname}>
      {CONTENT_PROJECTS.map((project, key) => {
        return (
          <FM_Reveal className="h-full" key={key}>
            <ProjectCard {...project} />
          </FM_Reveal>
        );
      })}
    </div>
  );
}
