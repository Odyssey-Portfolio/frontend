import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { COLOR_PRIMARY, COLOR_WHITE } from "../../_constants/Colors";
import { NavigationButtonProps } from "./types";

export default function NavigationButton({
  variant,
  goToPrevCard,
  goToNextCard,
}: NavigationButtonProps) {
  const [clicked, setClicked] = useState(false);
  const buttonSizeClassname = "w-24 h-24";
  const handleClick = () => {
    setClicked(true); // set clicked state
    setTimeout(() => setClicked(false), 100); // reset after 200ms

    // Trigger the correct action
    if (variant === "left" && goToPrevCard) goToPrevCard();
    if (variant === "right" && goToNextCard) goToNextCard();
  };

  const iconColor = clicked ? COLOR_PRIMARY : COLOR_WHITE;
  return (
    <>
      {variant === "left" ? (
        <ChevronLeft
          onClick={handleClick}
          className={buttonSizeClassname}
          style={{ color: iconColor }}
        />
      ) : (
        <ChevronRight
          onClick={handleClick}
          className={buttonSizeClassname}
          style={{ color: iconColor }}
        />
      )}
    </>
  );
}
