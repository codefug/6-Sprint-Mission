import { useEffect, useMemo, useState } from "react";
import "./PageList.scss";
import { PageListProps } from "../type";

export const PageList = ({ callback, page }: PageListProps) => {
  let className = "PageList__li";
  const [maximumNumber, setMaximumNumber] = useState<number>(5);
  const pageNumberList = useMemo(
    () => new Array<number>(maximumNumber),
    [maximumNumber]
  );

  useEffect(() => {
    setMaximumNumber((prev) => prev + 5);
  }, [page]);

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
        {pageNumberList.map((pageNumber) => {
          return +page === pageNumber ? (
            <li
              key={pageNumber}
              className={className + " PageList__li--active"}
              onClick={() => callback(pageNumber)}
            >
              {pageNumber}
            </li>
          ) : (
            <li key={pageNumber} className={className}>
              {pageNumber}
            </li>
          );
        })}
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
