import { useState, useEffect } from "react";

import "./ItemList.scss";
import { INITIAL_VALUE } from "../../../shared/constants/constants";
import { GetDatumProps, TotalProductsData } from "@/shared/api/type";
import { getDatum } from "@/shared/api/api";
import { PageList } from "@/entities/PageList";
import { ItemCard, ItemListHeader } from "@/entities";
import { useScreenDetector } from "@/shared/hooks/useScreenDetector";

export const ItemList = () => {
  const [dataState, setDataState] = useState(INITIAL_VALUE);
  const [items, setItems] = useState<TotalProductsData>();
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const { isDesktop, isMobile, isTablet } = useScreenDetector();

  const handleLoad = async (options: GetDatumProps) => {
    try {
      setDataState((prevState) => ({
        ...prevState,
        isLoading: true,
        errorMessage: null,
      }));
      const newItems = await getDatum(options);
      setItems(newItems);
    } catch (error) {
      if (error instanceof Error) {
        setDataState((prevState) => ({
          ...prevState,
          errorMessage: error.message,
        }));
      }
    } finally {
      setDataState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  const handlePagination = (value: number | ((prev: number) => number)) => {
    setPage(value);
  };

  useEffect(() => {
    handleLoad({
      page,
      orderBy,
      keyword,
      pageSize: isMobile ? 4 : isTablet ? 6 : 10,
    });
  }, [page, orderBy, keyword, isMobile, isDesktop, isTablet]);

  return (
    <>
      <ItemListHeader setOrderBy={setOrderBy} setKeyword={setKeyword} />
      {dataState.errorMessage && <span>{dataState.errorMessage}</span>}
      {dataState.isLoading && <span>로딩 중입니다</span>}
      <div className="ItemList__list">
        {items &&
          items.list.map((item) => {
            return (
              <div key={item.id} className="">
                <ItemCard item={item} cardType="--small" />
              </div>
            );
          })}
      </div>
      <PageList callback={handlePagination} page={page} />
    </>
  );
};
