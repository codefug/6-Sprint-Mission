import { Link } from "react-router-dom";
import likeIcon from "../../shared/asset/ic_heart.png";
import { formatPrice } from "../../shared/util/util";
import "./ItemCard.scss";

export const ItemCard = ({ item, cardType }) => {
  const { images, price, name, favoriteCount, id } = item;

  return (
    <Link className="card" to={`/products/${id}`}>
      <img
        src={images}
        alt={name}
        className={"card__image card__image" + cardType}
      />
      <h2 className="card__name">{name}</h2>
      <p className="card__price">{formatPrice(price)}</p>
      <div className="card__footer">
        <img src={likeIcon} alt="like button" />
        <p className="card__favoriteCount">{favoriteCount}</p>
      </div>
    </Link>
  );
};
