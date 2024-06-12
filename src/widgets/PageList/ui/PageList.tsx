import "./PageList.scss";

export const PageList = ({ callback, page }) => {
  let className = "PageList__li";
  return (
    <>
      <ul className="PageList">
        <li key="<" className={className}>
          {"<"}
        </li>
        {[1, 2, 3, 4, 5].map((v) => {
          return +page === v ? (
            <li
              key={v}
              className={className + " PageList__li--active"}
              onClick={callback}
            >
              {v}
            </li>
          ) : (
            <li key={v} className={className} onClick={callback}>
              {v}
            </li>
          );
        })}
        <li key=">" className={className}>
          {">"}
        </li>
      </ul>
    </>
  );
};
