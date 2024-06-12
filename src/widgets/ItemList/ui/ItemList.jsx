import { useState, useEffect } from "react";
import { getDatum } from "/src/shared/api/api.jsx";
import { ItemCard } from "/src/entities/ItemCard";
import { ItemListHeader } from "/src/entities/index.jsx";

import "./ItemList.scss";
import { PageList } from "/src/widgets/PageList/index.jsx";
import { useCustomMediaQuery } from "/src/shared/hooks/useCustomMediaQuery.jsx";
import { INITIAL_VALUE } from "../../../shared/constants/constants";

export const ItemList = () => {
  const [dataState, setDataState] = useState(INITIAL_VALUE);
  const [items, setItems] = useState([]);
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const { isMobile, isTablet, isDesktop } = useCustomMediaQuery();

  const handleload = async (options) => {
    try {
      setDataState((prevState) => ({
        ...prevState,
        isLoading: true,
        errorMessage: null,
      }));
      const newItems = await getDatum(options);
      setItems(newItems);
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
  };

  const handlePagination = (e) => {
    setPage(e.target.innerText);
  };

  useEffect(() => {
    handleload({
      page,
      orderBy,
      keyword,
      pageSize: isMobile ? 4 : isTablet ? 6 : 10,
    });
  }, [page, orderBy, keyword, isMobile, isDesktop, isTablet]);

  return (
    <>
      <ItemListHeader setOrderBy={setOrderBy} setKeyword={setKeyword} />
      {dataState.errorMessage?.message && (
        <span>{dataState.errorMessage.message}</span>
      )}
      {dataState.isLoading && <span>로딩 중입니다</span>}
      <div className="ItemList__list">
        {items.list &&
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
