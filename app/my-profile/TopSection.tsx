import { LoggedInUser } from "../../_models/LoggedInUser";
import {
  FONTSTYLE_HEADING3,
  FONTSTYLE_SUBTEXT2,
  FONT_LEXEND,
  FONT_POPPINS,
} from "../../_constants/Fonts";
import { COLOR_PRIMARY } from "../../_constants/Colors";
import AvatarUploader from "../../_components/AtomicComponents/AvatarUploader";

interface TopSectionProps {
  loggedInUser: LoggedInUser;
}
export default function TopSection(props: TopSectionProps) {
  const topSectionClassname =
    "flex flex-row justify-center items-center space-x-4";
  const greetingTextClassname = `${FONT_LEXEND.className} ${FONTSTYLE_SUBTEXT2}`;
  const usernameTextClassname = `${FONT_POPPINS.className} ${FONTSTYLE_HEADING3}`;

  return (
    <div className={topSectionClassname}>
      <AvatarUploader loggedInUser={props.loggedInUser} />
      <div>
        <div className={greetingTextClassname}>Good Morning</div>
        <div className={usernameTextClassname} style={{ color: COLOR_PRIMARY }}>
          {props.loggedInUser.name}
        </div>
      </div>
    </div>
  );
}
