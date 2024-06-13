import xIcon from "/src/shared/asset/xicon.png";

import "./ImageCard.scss";

export function ImageCard({ src, onClick, className }: ImageCardProps) {
  return (
    <>
      <div className={className}>
        <img src={src} className={`${className} ImageCard__image`} />
        <button
          type="button"
          onClick={() => {
            onClick(src);
          }}
          className="ImageCard__cancel"
        >
          <img src={xIcon} />
        </button>
      </div>
    </>
  );
}
