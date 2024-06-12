import { useEffect, useRef, useState } from "react";
import { ImageCard } from "/src/entities/ImageCard";
import icplus from "/src/shared/asset/ic_plus.png";

import "./ImageList.scss";

export function ImageList({ onChange }) {
  const [images, setImages] = useState([]);

  let fileRef = useRef(null);

  const handleFileSelect = () => {
    if (!fileRef.current) {
      return;
    }
    const newFile = Array.from(fileRef.current.files).map((v) =>
      URL.createObjectURL(v)
    );
    setImages((prevImages) => [...prevImages, newFile]);
    fileRef = null;
  };

  const handleDelete = (src) => {
    setImages((prevImages) => prevImages.filter((v) => v !== src));
  };

  useEffect(() => {
    onChange((prevItem) => ({
      ...prevItem,
      image: images,
    }));
  }, [images]);

  return (
    <div className="ImageList">
      <div>
        <h2 className="ImageList__subtitle">상품 이미지</h2>
      </div>
      <ul className="ImageList__list">
        <li key="title">
          <label
            htmlFor="fileInput"
            className="ImageList__FileInput ImageList__card"
          >
            <div className="ImageList__plus">
              <img
                className="ImageList__placeholder"
                src={icplus}
                alt="이미지 등록"
              />
              <span className="ImageList__plus-message">이미지 등록</span>
            </div>
            <input
              type="file"
              className="ImageList__file-input"
              onChange={handleFileSelect}
              id="fileInput"
              ref={fileRef}
              accept=".png,.jpeg"
            />
          </label>
        </li>
        {!!images.length &&
          images.map((v, index) => {
            return (
              <ImageCard
                src={v}
                key={index}
                className="ImageList__card"
                onClick={handleDelete}
              />
            );
          })}
      </ul>
    </div>
  );
}
