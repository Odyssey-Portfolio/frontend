import { COLOR_PRIMARY, COLOR_RED } from "@/_constants/Colors";
import { FONT_POPPINS } from "../../_constants/Fonts";
import { JSX } from "react";

export enum ButtonVariants {
  PRIMARY,
  DANGER,
}
interface ButtonProps {
  label: string;
  variant?: ButtonVariants;
  icon?: JSX.Element;
  isLoading?: boolean;
  onClick?: () => void;
  extraCss?: React.CSSProperties;
}
export default function Button(props: ButtonProps) {
  const buttonClassname = `${FONT_POPPINS.className} w-full h-full justify-center rounded-md px-3 
    py-2 text-sm text-white shadow-xs`;
  const buttonIconTextClassname = `flex flex-row justify-center items-center gap-3 `;
  const variantStyles: Record<ButtonVariants, React.CSSProperties> = {
    [ButtonVariants.PRIMARY]: { backgroundColor: COLOR_PRIMARY },
    [ButtonVariants.DANGER]: { backgroundColor: COLOR_RED },
  };
  const combinedStyles: React.CSSProperties = {
    ...variantStyles[props.variant || ButtonVariants.PRIMARY],
    ...props.extraCss,
  };
  return (
    <button
      type="button"
      className={buttonClassname}
      style={combinedStyles}
      onClick={props.onClick}
    >
      {props.isLoading ? (
        <Spinner />
      ) : (
        <div className={buttonIconTextClassname}>
          <div>{props.icon}</div> <div>{props.label}</div>
        </div>
      )}
    </button>
  );
}

function Spinner() {
  return (
    <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
  );
}
