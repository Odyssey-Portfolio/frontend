import ProjectCard from "@/_components/ProjectCard";
import ScrollableTimeline from "@/_components/ScrollableTimeline";
import { COLOR_PRIMARY, COLOR_SECONDARY } from "@/_constants/Colors";
import {
  FONT_LEXEND,
  FONTSTYLE_HEADING1,
  FONTSTYLE_SUBTEXT1,
} from "@/_constants/Fonts";

export default function ProjectsPage() {
  const projectPageClassname = `flex flex-col mt-32 mx-24 mb-12 
  items-center justify-between space-y-20`;
  return (
    <div className={projectPageClassname}>
      <HeadingText />
      <ProjectList />
      <ScrollableTimeline />
    </div>
  );
}

function HeadingText() {
  const headingTextClassname = `text-center space-y-2`;
  const h1Classname = `${FONT_LEXEND.className} ${FONTSTYLE_HEADING1}`;
  const h2Classname = `${FONT_LEXEND.className} ${FONTSTYLE_SUBTEXT1}`;
  return (
    <div className={headingTextClassname}>
      <h1 className={h1Classname} style={{ color: COLOR_PRIMARY }}>
        Projects
      </h1>
      <h6 className={h2Classname} style={{ color: COLOR_SECONDARY }}>
        A list of projects...
      </h6>
    </div>
  );
}
function ProjectList() {
  const projectListClassname = `grid grid-cols-3 w-full gap-5`;
  const numbers = [0, 1, 2, 3, 4, 5];
  return (
    <div className={projectListClassname}>
      {numbers.map((number, key) => {
        return <ProjectCard key={key} />;
      })}
    </div>
  );
}
