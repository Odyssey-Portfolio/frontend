import { useEffect, useState } from "react";

export function useIsMediumScreen() {
  const [isMedium, setIsMedium] = useState(false);

  useEffect(() => {
    const check = () => setIsMedium(window.innerWidth >= 768); // Tailwind's md: starts at 768px
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMedium;
}
