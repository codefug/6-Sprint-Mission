import { useEffect, useMemo, useState } from "react";
import "./PageList.scss";
import { PageListProps } from "../type";

export const PageList = ({ callback, page }: PageListProps) => {
  let className = "PageList__li";
  const [maximumNumber, setMaximumNumber] = useState<number>(6);
  const pageNumberList = useMemo(
    () => [...new Array(maximumNumber).keys()].slice(1),
    []
  );
  console.log(maximumNumber);
  console.log(page);

  useEffect(() => {
    setMaximumNumber((prev) => prev + 1);
  }, []);

  return (
    <>
      <ul className="PageList">
        <li
          key="<"
          className={className}
          onClick={() =>
            callback((prev) => {
              if (prev !== 1) {
                return prev - 1;
              } else {
                return prev;
              }
            })
          }
        >
          {"<"}
        </li>
        {pageNumberList.map((pageNumber) => (
          <li
            key={pageNumber}
            className={
              className +
              `${page === pageNumber ? " PageList__li--active" : ""}`
            }
            onClick={() => callback(pageNumber)}
          >
            {pageNumber}
          </li>
        ))}
        <li
          key=">"
          className={className}
          onClick={() => {
            callback((prev) => {
              if (prev !== pageNumberList.length - 1) {
                return prev + 1;
              } else {
                return prev;
              }
            });
          }}
        >
          {">"}
        </li>
      </ul>
    </>
  );
};
