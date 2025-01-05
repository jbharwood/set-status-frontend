import { useEffect, useState } from "react";

// requires hidden-in-fullscreen class to work
export function useFullScreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
      console.log("Fullscreen changed");
    }

    document.addEventListener("fullscreenchange", onFullscreenChange);

    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  return { isFullscreen };
}
