import Image from "next/image";
import { FONTSTYLE_PARAGRAPH2, FONT_LEXEND } from "../../_constants/Fonts";
import { Heart, Pin } from "lucide-react";
import { GetCommentDto } from "../../_models/comment/GetCommentDto";
import ParagraphRenderer from "../ParagraphRenderer";
import { CommentLikeButton } from "./CommentLikeButton";
import { v4 as uuidv4 } from 'uuid';
interface CommentProps {
  comment: GetCommentDto;
}
export default function Comment(props: CommentProps) {
  const commentContainerClassname = `w-full flex flex-row space-x-5`;
  return (
    <div className={commentContainerClassname}>
      <Avatar />
      <DetailsSection {...props} />
    </div>
  );
}

function Avatar() {
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
  const detailsSectionClassname = `w-full flex flex-col align-center space-y-3`;
  return (
    <div className={detailsSectionClassname}>
      <HeaderSection {...props} />
      <ParagraphRenderer paragraph={props.comment.content} isHtml />
      <InteractionButtons {...props}/>
    </div>
  );
}
function HeaderSection(props: CommentProps) {
  const headerSectionClassname = `flex flex-col md:flex-row md:items-center md:space-x-3`;
  const userNameClassname = `${FONT_LEXEND.className} ${FONTSTYLE_PARAGRAPH2} `;
  const lastUploadedClassname = `text-right flex flex-row align-center`;
  return (
    <div className={headerSectionClassname}>
      <div className={userNameClassname}>{props.comment.userName}</div>
      <div className={lastUploadedClassname}>{props.comment.elapsedTime}</div>
    </div>
  );
}

function InteractionButtons(props: CommentProps) {
  const interactionButtonsClassname = `flex flex-row space-x-3`;
  return (
    <div className={interactionButtonsClassname}>
      <CommentLikeButton commentId={props.comment.commentId}
      commentLikeId={uuidv4()}
       />
    </div>
  );
}
