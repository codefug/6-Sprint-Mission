import { BestItemList } from "../../../widgets/BestItemList";
import { ItemList } from "/src/widgets/ItemList/index.jsx";

import "./items.scss";

export const Items = () => {
  return (
    <>
      <main className="main">
        <div className="main__content">
          <BestItemList />
          <ItemList />
        </div>
      </main>
    </>
  );
};
