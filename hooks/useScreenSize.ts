import { useState, useLayoutEffect } from "react";

const useScreenSize = () => {
  const getSize = () => {
    const width = window.innerWidth;
    return {
      isMobile: width <= 640,
      isTablet: width > 640 && width <= 1024,
      isDesktop: width > 1024,
    };
  };

  const [screenSize, setScreenSize] = useState(getSize);

  useLayoutEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      // Debounce resize event 100ms
      timeoutId = setTimeout(() => {
        setScreenSize(getSize());
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
