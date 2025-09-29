import { useEffect } from "react";

interface UseInfiniteScrollProps {
  fetchMoreCallback: () => void;
}
export function useInfiniteScroll({
  fetchMoreCallback,
}: UseInfiniteScrollProps) {
  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    console.log("Fetch more list items!");
    fetchMoreCallback();
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
