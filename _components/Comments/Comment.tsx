import Image from "next/image";
import { FONTSTYLE_PARAGRAPH2, FONT_POPPINS } from "../../_constants/Fonts";
import { DUMMYTEXT_LOREMIPSUMSHORT } from "../../_constants/DummyText";
import { Heart, Pin } from "lucide-react";
export default function Comment() {
  const commentContainerClassname = `w-full div flex flex-row space-x-5`;
  return (
    <div className={commentContainerClassname}>
      <AvatarSection />
      <DetailsSection />
    </div>
  );
}

function AvatarSection() {
  const avatarSectionClassname = `flex flex-col`;
  const avatarBorderClassname = `relative w-full rounded-2xl`;
  return (
    <div className={avatarSectionClassname} style={{ paddingTop: "0.5rem" }}>
      <div
        className={avatarBorderClassname}
        style={{ borderRadius: 25, width: 50, height: 50 }}
      >
        <Image src={"/docker.png"} alt="avatar" fill className="absolute" />
      </div>
    </div>
  );
}
function DetailsSection() {
  const detailsSectionClassname = `flex flex-col justify-between align-center space-y-3`;
  return (
    <div className={detailsSectionClassname}>
      <HeaderSection />
      <CommentTextSection />
      <InteractionButtons />
    </div>
  );
}
function HeaderSection() {
  const headerSectionClassname = `flex flex-col md:flex-row`;
  const userNameClassname = `${FONT_POPPINS.className} ${FONTSTYLE_PARAGRAPH2} `;
  const lastUploadedClassname = `text-right flex flex-row align-center`;
  return (
    <div className={headerSectionClassname}>
      <div className={userNameClassname}>Dummy Username</div>
      <div className={lastUploadedClassname}>3 minutes ago</div>
    </div>
  );
}

function CommentTextSection() {
  const detailsSectionContainer = ``;
  return (
    <div className={detailsSectionContainer}>{DUMMYTEXT_LOREMIPSUMSHORT}</div>
  );
}

function InteractionButtons() {
  const interactionButtonsClassname = `flex flex-row space-x-3`;
  return (
    <div className={interactionButtonsClassname}>
      <Heart />
      <Pin />
    </div>
  );
}
