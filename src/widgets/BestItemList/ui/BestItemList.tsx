import { useState, useEffect } from "react";
import { ItemCard } from "../../../entities/ItemCard/ui/ItemCard";
import { INITIAL_VALUE } from "../../../shared/constants/constants";

import "./BestItemList.scss";
import { getDatum } from "@/shared/api/api";
import { BestItemListProps } from "../type";
import { TotalProductsData } from "@/shared/api/type";

export const BestItemList = () => {
  const [dataState, setDataState] = useState(INITIAL_VALUE);
  const [items, setItems] = useState<TotalProductsData["list"] | null>(null);
  const orderBy = "favorite";

  const getBestItems = async (options: BestItemListProps) => {
    try {
      setDataState((prevState) => ({
        ...prevState,
        isLoading: true,
        errorMessage: null,
      }));
      const newBestItems = await getDatum(options);
      setItems(newBestItems.list);
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

  useEffect(() => {
    getBestItems({ pageSize: 4, orderBy });
  }, []);

  return (
    <>
      <h1 className="BestItemList__title">베스트 상품</h1>
      {dataState.errorMessage && <span>{dataState.errorMessage}</span>}
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
