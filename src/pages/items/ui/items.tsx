import { ItemList } from "@/widgets/ItemList";

import "./items.scss";
import { BestItemList } from "@/widgets/BestItemList";

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
