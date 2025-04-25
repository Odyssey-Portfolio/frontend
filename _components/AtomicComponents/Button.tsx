import { COLOR_PRIMARY, COLOR_RED } from "@/_constants/Colors";

export enum ButtonVariants {
  PRIMARY,
  DANGER,
}
interface ButtonProps {
  label: string;
  variant?: ButtonVariants;
  isLoading?: boolean;
  onClick?: () => void;
}
export default function Button(props: ButtonProps) {
  const buttonClassname = `w-full h-full justify-center rounded-md px-3 
    py-2 text-sm font-semibold text-white shadow-xs    `;
  const variantStyles: Record<ButtonVariants, React.CSSProperties> = {
    [ButtonVariants.PRIMARY]: { backgroundColor: COLOR_PRIMARY },
    [ButtonVariants.DANGER]: { backgroundColor: COLOR_RED },
  };

  return (
    <button
      type="button"
      className={buttonClassname}
      style={variantStyles[props.variant ?? ButtonVariants.PRIMARY]}
      onClick={props.onClick}
    >
      {props.isLoading ? <Spinner /> : <>{props.label}</>}
    </button>
  );
}

function Spinner() {
  return (
    <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
  );
}
