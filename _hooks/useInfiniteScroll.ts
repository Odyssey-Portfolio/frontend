import { useEffect } from "react";

interface UseInfiniteScrollProps {
  fetchMoreCallback: () => void;
  offset?: number; // optional buffer before exact bottom
}

export function useInfiniteScroll({
  fetchMoreCallback,
  offset = 50, // default: trigger when 50px from bottom
}: UseInfiniteScrollProps) {
  useEffect(() => {
    function handleScroll() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = window.innerHeight;

      if (scrollTop + clientHeight >= scrollHeight - offset) {
        fetchMoreCallback();
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchMoreCallback, offset]);
}
