import { useCallback, useEffect, useRef, useState } from "react";
import { getDatum } from "../../shared/api/api";

const INITIALVALUE = {
  isLoading: false,
  errorMessage: null,
};

export function useFetchData({
  options,
  isMobile = false,
  isDesktop = false,
  isTablet = false,
}) {
  const [dataState, setDataState] = useState(INITIALVALUE);
  const data = useRef();

  const fetchData = useCallback(async (options) => {
    try {
      setDataState((prevState) => ({
        ...prevState,
        isLoading: true,
        errorMessage: null,
      }));
      const newItems = await getDatum(options);
      data.current = newItems;
    } catch (error) {
      setDataState((prevState) => ({
        ...prevState,
        errorMessage: error,
      }));
    } finally {
      setDataState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  }, []);

  useEffect(() => {
    fetchData(options);
  }, [...options, fetchData, isMobile, isDesktop, isTablet]);

  return { ...dataState, data };
}

// 보류........
