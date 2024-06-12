import { useMediaQuery } from "react-responsive";

export function useCustomMediaQuery() {
  const isMobile = useMediaQuery({ minWidth: 375, maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1199 });
  const isDesktop = useMediaQuery({ minWidth: 1200 });

  return { isMobile, isTablet, isDesktop };
}
