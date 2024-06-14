// import { useCustomMediaQuery } from "/src/shared/hooks/useCustomMediaQuery.ts";
// import { Button } from "/src/shared/ui/Button.tsx";
// import { ToggleList } from "/src/shared/ui/ToggleList.tsx";
import { Link } from "react-router-dom";

import "./ItemListHeader.scss";
import { Dispatch, SetStateAction, useRef } from "react";
import { useScreenDetector } from "@/shared/hooks/useScreenDetector";
import { Button } from "@/shared/ui/Button";
import { ToggleList } from "@/shared/ui/ToggleList";

interface ItemListHeaderProps {
  setOrderBy: Dispatch<SetStateAction<string>>;
  setKeyword: Dispatch<SetStateAction<string>>;
}

export function ItemListHeader({
  setOrderBy,
  setKeyword,
}: ItemListHeaderProps) {
  const { isDesktop, isMobile } = useScreenDetector();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleRecentSort = () => {
    setOrderBy("recent");
  };

  const handleFavoriteSort = () => {
    setOrderBy("favorite");
  };
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current) return;
    setKeyword(inputRef.current.value);
  };
  if (!isMobile) {
    return (
      <div className="ItemList__header--desktop">
        <span className="ItemList__title">
          {isDesktop ? "전체상품" : "판매 중인 상품"}
        </span>
        <form onSubmit={handleSearchSubmit} className="ItemList__form">
          <input
            name="search"
            placeholder={"검색할 상품을 입력해주세요"}
            className="ItemList__input"
            ref={inputRef}
          />
        </form>
        <Link to="/additem" className="ItemList__link">
          <Button
            classNames={["button--blue", "button--small"]}
            value={"상품 등록하기"}
          />
        </Link>
        <div className="ItemList__ToggleList">
          <ToggleList
            options={[
              { name: "최신순", callback: handleRecentSort },
              { name: "좋아요순", callback: handleFavoriteSort },
            ]}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="ItemList__header">
        <div className="flex-wrapper">
          <span className="ItemList__title">판매 중인 상품</span>
          <Link to="/additem" className="ItemList__link">
            <Button
              classNames={["button--blue", "button--small"]}
              value={"상품 등록하기"}
            />
          </Link>
        </div>
        <div className="flex-wrapper">
          <form onSubmit={handleSearchSubmit} className="ItemList__form">
            <input
              name="search"
              placeholder={"검색할 상품을 입력해주세요"}
              className="ItemList__input"
            />
          </form>
          <ToggleList
            options={[
              { name: "최신순", callback: handleRecentSort },
              { name: "좋아요순", callback: handleFavoriteSort },
            ]}
          />
        </div>
      </div>
    );
  }
}
