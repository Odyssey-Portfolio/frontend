import Image from "next/image";
import { FONTSTYLE_PARAGRAPH2, FONT_POPPINS } from "../../_constants/Fonts";
import { Heart, Pin } from "lucide-react";
import { GetCommentDto } from "../../_models/comment/GetCommentDto";

interface CommentProps {
  comment: GetCommentDto;
}
export default function Comment(props: CommentProps) {
  const commentContainerClassname = `w-full div flex flex-row space-x-5`;
  return (
    <div className={commentContainerClassname}>
      <AvatarSection />
      <DetailsSection {...props} />
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
function DetailsSection(props: CommentProps) {
  const detailsSectionClassname = `flex flex-col justify-between align-center space-y-3`;
  return (
    <div className={detailsSectionClassname}>
      <MainSection {...props} />
      <CommentTextSection {...props} />
      <InteractionButtons />
    </div>
  );
}
function MainSection(props: CommentProps) {
  const headerSectionClassname = `flex flex-col md:flex-row md:items-center md:justify-between`;
  const userNameClassname = `${FONT_POPPINS.className} ${FONTSTYLE_PARAGRAPH2} `;
  const lastUploadedClassname = `text-right flex flex-row align-center`;
  return (
    <div className={headerSectionClassname}>
      <div className={userNameClassname}>{props.comment.userName}</div>
      <div className={lastUploadedClassname}>{props.comment.elapsedTime}</div>
    </div>
  );
}

function CommentTextSection(props: CommentProps) {
  const detailsSectionContainer = ``;
  return <div className={detailsSectionContainer}>{props.comment.content}</div>;
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
