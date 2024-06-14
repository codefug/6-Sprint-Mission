import { RegisterHeader } from "../../../entities";
import { ImageList } from "../../../widgets/ImageList";
import { ItemInput } from "../../../entities/ItemInput";
import React, { useEffect, useRef, useState } from "react";

import "./RegisterPage.scss";
import { TagList } from "../../../entities/TagList";
import {
  FORM_DATA,
  PLACEHOLDER_LIST_FOR_REGISTER,
} from "../../../shared/constants/constants";
import { Main, MainContent } from "../../../shared/ui/MainContent";
import { ItemTextArea } from "@/entities/ItemInput/ui/ItemInput";

const tagPlaceholder =
  PLACEHOLDER_LIST_FOR_REGISTER[PLACEHOLDER_LIST_FOR_REGISTER.length - 1];

export function RegisterPage() {
  const [tags, setTags] = useState<string[]>([]);
  const [file, setFile] = useState(FORM_DATA);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const active: boolean =
    file.title !== null &&
    file.description !== null &&
    file.price !== null &&
    file.image !== null &&
    file.tags !== null;

  const handleDelete = (value: string) => {
    setTags((prevTags) =>
      prevTags.length == 1 ? [] : prevTags.filter((v) => v !== value)
    );
  };

  const handleChange = (name: string, value: string) => {
    setFile((prevFile) => ({
      ...prevFile,
      [name]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name, value);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(file);
  };

  useEffect(() => {
    setFile((prevFile) => ({ ...prevFile, tags }));
  }, [tags]);

  return (
    <>
      <Main className="register">
        <MainContent as="form" onSubmit={handleSubmit}>
          <RegisterHeader active={active} />
          <ImageList onChange={setFile} />
          <div className="register__inputList">
            {PLACEHOLDER_LIST_FOR_REGISTER.map(
              (list, index) =>
                index !== PLACEHOLDER_LIST_FOR_REGISTER.length - 1 && (
                  <ItemInput
                    name={list.name}
                    value={list.value}
                    placeholder={list.placeholder}
                    type={list.type}
                    key={index}
                    onChange={handleInputChange}
                  />
                )
            )}
            <div className="register__Tags">
              <ItemTextArea
                name={tagPlaceholder.name}
                value={tagPlaceholder.value}
                placeholder={tagPlaceholder.placeholder}
                type={tagPlaceholder.type}
                key={-1}
                onKeyDown={handleKeyPress}
                ref={textAreaRef}
              />
              <TagList tags={tags} onDelete={handleDelete} />
            </div>
          </div>
        </MainContent>
      </Main>
    </>
  );
}
