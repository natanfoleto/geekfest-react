import { useState, useEffect } from "react";

const useMediaQuery = (query: string) => {
  const mediaMatch = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });

  return matches;
};

export default useMediaQuery;
