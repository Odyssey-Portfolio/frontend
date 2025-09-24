import { FONTSTYLE_SUBTEXT2, FONT_POPPINS } from "../../_constants/Fonts";
import Comment from "./Comment";
import { Funnel } from "lucide-react";
export default function CommentContainer() {
  const testList = [0, 1, 2, 3];
  const commentContainerClassname = `w-full flex flex-col space-y-5 items-center`;
  const commentSpaceClassname = `space-y-2 `;
  return (
    <div className={commentContainerClassname}>
      <HeaderSection />
      <div>
        {testList.map((item, key) => {
          return (
            <div className={commentSpaceClassname} key={key}>
              <Comment />
            </div>
          );
        })}
      </div>
    </div>
  );
}
function HeaderSection() {
  const headerSectionClassname = `flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-4`;
  const commentTextClassname = `${FONT_POPPINS.className} ${FONTSTYLE_SUBTEXT2}`;
  return (
    <div className={headerSectionClassname}>
      <div className={commentTextClassname}>Comments</div>
      <div>
        <FilterCommentsButton />
      </div>
    </div>
  );
}

function FilterCommentsButton() {
  const filterCommentsButtonClassname = `flex flex-row items-center space-x-2`;
  const filterTextClassname = `${FONT_POPPINS.className} ${FONTSTYLE_SUBTEXT2}`;
  return (
    <div className={filterCommentsButtonClassname}>
      <Funnel />
      <div className={filterTextClassname}>Filter</div>
    </div>
  );
}
