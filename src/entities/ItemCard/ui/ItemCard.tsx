import { Link } from "react-router-dom";
import likeIcon from "../../../shared/asset/ic_heart.png";
import { formatPrice } from "../../../shared/util/util";
import "./ItemCard.scss";
import { TotalProductsData } from "@/shared/api/type";

interface ItemCardProps {
  item: TotalProductsData["list"][0];
  cardType: string;
}

export const ItemCard = ({ item, cardType }: ItemCardProps) => {
  const { images, price, name, favoriteCount, id } = item;

  return (
    <Link className="card" to={`/items/${id}`}>
      <img
        src={images.join("")}
        alt={name}
        className={"card__image card__image" + cardType}
      />
      <h2 className="card__name">{name}</h2>
      <p className="card__price">{formatPrice(price)}원</p>
      <div className="card__footer">
        <img src={likeIcon} alt="like button" />
        <p className="card__favoriteCount">{favoriteCount}</p>
      </div>
    </Link>
  );
};
