import _ from "lodash";
import { useEffect, useState } from "react";

export const useScreenDetector = () => {
  const [screen, setScreen] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  const handleWindowSizeChange = () => {
    if (window.innerWidth <= 744)
      setScreen(() => ({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      }));
    else if (window.innerWidth > 1200)
      setScreen(() => ({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
      }));
    else
      setScreen(() => ({
        isMobile: false,
        isTablet: true,
        isDesktop: false,
      }));
  };

  useEffect(() => {
    window.addEventListener("resize", _.debounce(handleWindowSizeChange, 100));
    return () => {
      window.removeEventListener(
        "resize",
        _.debounce(handleWindowSizeChange, 100)
      );
    };
  }, []);

  return screen;
};
