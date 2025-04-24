import { COLOR_PRIMARY } from "@/_constants/Colors";

type SpinnerProps = {
  size?: number; // Optional prop to adjust size
  color?: string; // Optional override for color
};

export default function Spinner({
  size = 40,
  color = COLOR_PRIMARY,
}: SpinnerProps) {
  return (
    <div
      className="animate-spin rounded-full border-4 border-t-transparent"
      style={{
        width: size,
        height: size,
        borderColor: `${color} transparent ${color} ${color}`,
      }}
    />
  );
}
