import { JSX } from "react";

export interface CVCarouselProps {
  closeAction: () => void;
  showCarousel?: boolean;
}

export interface BackdropProps extends CVCarouselProps {
  children: JSX.Element;
}

export interface CVCardProps {
  index: number;
  item: CVCardItem;
  isActive?: boolean;
  onClick: (index: number) => void;
}

export interface CVCardItem {
  title: string;
  period: string;
  description: string;
  pdfPath: string;
}

export interface NavigationButtonProps {
  variant: "left" | "right";
  goToPrevCard?: () => void | undefined;
  goToNextCard?: () => void | undefined;
}
