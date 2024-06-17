import "./ToggleList.scss";
import { useMediaQuery } from "react-responsive";
import icSort from "../asset/ic_sort.png";
import { useState } from "react";
import { ToggleListProps } from "./type";

/**
 * name과 callback들이 있는 객체들의 리스트를 받으면
 * 반응형 ToggleList 생성
 * @param {Array} options {String} name {String} callback
 * @returns ToggleList
 */
export const ToggleList = ({ options }: ToggleListProps) => {
  const isMobile = useMediaQuery({ minWidth: 375, maxWidth: 767 });
  const [selectedOption, setSelectedOption] = useState("최신순");

  const changeDefault = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <div className="ToggleList">
      <div className="ToggleList__default">
        {isMobile ? <img src={icSort} /> : <div>{selectedOption}</div>}
      </div>
      <div className="ToggleList__itemList">
        {options.map((option, index) => {
          return (
            <div
              key={index}
              className="ToggleList__item"
              onClick={() => {
                option.callback();
                changeDefault(option.name);
              }}
            >
              {option.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
