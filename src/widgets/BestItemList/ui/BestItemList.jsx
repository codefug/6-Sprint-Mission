import { useState, useEffect } from "react";
import { getDatum } from "/src/shared/api/api";
import { ItemCard } from "../../../entities/ItemCard/ui/ItemCard";
import { INITIAL_VALUE } from "../../../shared/constants/constants";

import "./BestItemList.scss";

export const BestItemList = () => {
  const [dataState, setDataState] = useState(INITIAL_VALUE);
  const [items, setItems] = useState([]);
  const order = "favorite";

  const getBestItems = async (options) => {
    try {
      setDataState((prevState) => ({
        ...prevState,
        isLoading: true,
        errorMessage: null,
      }));
      const newItems = await getDatum(options);
      const newBestItems = newItems.list.slice(0, 4);
      options.offset === 0 ? setItems() : setItems(newBestItems);
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

  useEffect(() => {
    getBestItems({ pageSize: 100, orderBy: order });
  }, []);

  return (
    <>
      <h1 className="BestItemList__title">베스트 상품</h1>
      {dataState.errorMessage?.message && (
        <span>{dataState.errorMessage.message}</span>
      )}
      {dataState.isLoading && <span>로딩 중입니다</span>}
      <div className="BestItemList__list">
        {items &&
          items.map((item) => {
            return (
              <div key={item.createdAt} className="BestItemList__card">
                <ItemCard item={item} cardType="--big" />
              </div>
            );
          })}
      </div>
    </>
  );
};
