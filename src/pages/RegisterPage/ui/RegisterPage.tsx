import { ItemInput } from "../../../entities/ItemInput";
import React, { Fragment, useEffect, useRef, useState } from "react";

import "./RegisterPage.scss";
import { TagList } from "../../../entities/TagList";
import {
  FORM_DATA,
  PLACEHOLDER_LIST_FOR_REGISTER,
} from "../../../shared/constants/constants";
import { Main, MainContent } from "../../../shared/ui/MainContent";
import { ItemTextArea } from "@/entities/ItemInput/ui/ItemInput";
import { Button } from "@/shared/ui/Button";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerScema } from "../schema";
import { postImagesUpload, postProducts } from "@/shared/api/api";
import icplus from "@/shared/asset/ic_plus.png";
import { ImageCard } from "@/entities/ImageCard";

const tagPlaceholder =
  PLACEHOLDER_LIST_FOR_REGISTER[PLACEHOLDER_LIST_FOR_REGISTER.length - 1];

export function RegisterPage() {
  const [tags, setTags] = useState<string[]>([]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { register, handleSubmit, formState, setValue, getValues } = useForm({
    resolver: zodResolver(registerScema),
  });
  const [previewImages, setPreviewImages] = useState<File[]>([]);
  let fileRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = async () => {
    const fileList = fileRef?.current?.files;
    if (fileList) {
      setPreviewImages([...fileList]);
      setValue("images", [...fileList]);
    }
  };

  const handleImageDelete = () => {
    setPreviewImages([]);
    setValue("images", []);
  };

  const handleDelete = (value: string) => {
    setTags((prevTags) =>
      prevTags.length == 1 ? [] : prevTags.filter((v) => v !== value)
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!textAreaRef.current) return;
      const newValue = textAreaRef.current.value;
      setTags((prevTag) => [...prevTag, newValue]);
      textAreaRef.current.value = "";
    }
  };

  const onSubmit = async (d: FieldValues) => {
    try {
      const url = await postImagesUpload(previewImages[0]);
      const data = await postProducts({
        images: [url.url],
        tags: d.tags,
        price: d.price,
        description: d.description,
        name: d.name,
      });
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("이미지 업로드에 실패했습니다.");
    }
  };

  useEffect(() => {
    setValue("tags", tags);
  }, [tags]);

  return (
    <>
      <Main className="register">
        <MainContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <header className="RegisterHeader">
            <h1>상품 등록하기</h1>
            <Button
              active={formState.isValid}
              type="submit"
              value="등록"
              classNames={["button--blue", "button--small"]}
            />
          </header>
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
              {previewImages.length > 0 &&
                previewImages.map((v, index) => {
                  return (
                    <ImageCard
                      src={new URL(URL.createObjectURL(v)).toString()}
                      key={index}
                      className="ImageList__card"
                      onClick={handleImageDelete}
                    />
                  );
                })}
            </ul>
          </div>
          {formState.errors.images && (
            <p className="register__error">
              {formState.errors.images?.message as string}
            </p>
          )}
          <div className="register__inputList">
            {PLACEHOLDER_LIST_FOR_REGISTER.map(
              (list, index) =>
                index !== PLACEHOLDER_LIST_FOR_REGISTER.length - 1 && (
                  <Fragment key={list.name}>
                    <ItemInput
                      id={list.name}
                      value={list.value}
                      placeholder={list.placeholder}
                      type={list.type}
                      registerData={
                        list.name === "price"
                          ? { ...register(list.name, { valueAsNumber: true }) }
                          : { ...register(list.name) }
                      }
                    />
                    {formState.errors[list.name] && (
                      <p className="register__error">
                        {formState.errors[list.name]?.message as string}
                      </p>
                    )}
                  </Fragment>
                )
            )}
            <div className="register__Tags">
              <ItemTextArea
                name={tagPlaceholder.name}
                id={tagPlaceholder.name}
                value={tagPlaceholder.value}
                placeholder={tagPlaceholder.placeholder}
                type={tagPlaceholder.type}
                key={tagPlaceholder.name}
                onKeyDown={handleKeyPress}
                ref={textAreaRef}
              />
              {formState.errors.tags && (
                <p className="register__error">
                  {formState.errors.tags?.message as string}
                </p>
              )}
              <TagList tags={tags} onDelete={handleDelete} />
            </div>
          </div>
        </MainContent>
      </Main>
    </>
  );
}
