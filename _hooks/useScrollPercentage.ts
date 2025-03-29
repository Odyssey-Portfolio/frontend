"use client";
import { useEffect, useState } from "react";

export default function useScrollPercentage() {
  const [completion, setCompletion] = useState(0);
  const updateScrollPercentage = () => {
    const currentProgress = window.scrollY;
    const topSectionHeight = 300;
    const totalScrollableHeight = document.body.scrollHeight - topSectionHeight;

    const remainingScrollHeight = totalScrollableHeight - window.innerHeight;
    if (currentProgress > topSectionHeight) {
      const adjustedProgress = currentProgress - topSectionHeight;
      const adjustedTotalHeight = totalScrollableHeight - topSectionHeight;
      if (remainingScrollHeight) {
        const completion =
          Number((adjustedProgress / adjustedTotalHeight).toFixed(2)) * 100;
        setCompletion(completion);
      }
    } else {
      setCompletion(0);
    }
  };
  useEffect(() => {
    /*
     * scrollY: distance from current scroll position to top of page.
     * scrollHeight: full Height of the page.
     * innerHeight: height of the viewport (content you're seeing)
     */

    window.addEventListener("scroll", updateScrollPercentage);
    return () => {
      window.removeEventListener("scroll", updateScrollPercentage);
    };
  }, []);
  return completion;
}
