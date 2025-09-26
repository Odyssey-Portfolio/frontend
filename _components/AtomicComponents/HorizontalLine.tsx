import { CSSProperties } from "react";
import { COLOR_PRIMARY_20_OPACITY } from "../../_constants/Colors";

export default function HorizontalLine() {
  const horizontalLineClassname = "w-12 md:w-96 h-1 rounded-full border-0";
  const horizontalLineStyle: CSSProperties = {
    backgroundColor: COLOR_PRIMARY_20_OPACITY,
  };
  return <hr className={horizontalLineClassname} style={horizontalLineStyle} />;
}
