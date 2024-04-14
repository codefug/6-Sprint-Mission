import { createDescriptionContent } from "../common/common.js";

// input에서 벗어날때마다 Button을 처리하는 함수
const checkInputsForButton = () => {
  const input = document.querySelectorAll("input");
  const button = document.querySelector("button");
  Array.from(input).every((v) =>
    Array.from(v.classList).includes("content-form__input--valid")
  )
    ? (() => {
        button.classList.add("button--active");
        button.classList.remove("button--disabled");
      })()
    : (() => {
        button.classList.add("button--disabled");
        button.classList.remove("button--active");
      })();
};

/**
 * description을 가진 invalid처리된 p태그 생성
 * @param {string} description
 * @returns {Object} Node
 */
const createPTagForInvalid = (description) => {
  const newContent = createDescriptionContent("p", description);
  newContent.classList.add("description-invalid");
  return newContent;
};

/**
 * 해당 node에 criteria에 맞춘 Event를 달아준다.
 * description이 없을 경우 조건에 맞는 input 색깔만 바뀜
 * 특정 criteria가 없을 경우 html 기본 조건에만 맞춤
 * @param {Object} node
 * @param {string} description
 * @param {function} criteria
 */
const invalidInputEventHandler = (
  node,
  description = "",
  criteria = () => true
) => {
  const descriptionContent = createPTagForInvalid(description);

  node.addEventListener("focusin", (event) => {
    (() => {
      descriptionContent.remove();
      node.classList.remove("content-form__input--invalid");
      node.classList.remove("content-form__input--valid");
    })();
  });

  node.addEventListener("focusout", (event) => {
    if (node.value === "") {
      descriptionContent.remove();
      node.classList.remove("content-form__input--invalid");
      node.classList.remove("content-form__input--valid");
    } else if (criteria() && node.checkValidity()) {
      descriptionContent.remove();
      node.classList.remove("content-form__input--invalid");
      node.classList.add("content-form__input--valid");
    } else {
      node.after(descriptionContent);
      node.classList.remove("content-form__input--valid");
      node.classList.add("content-form__input--invalid");
    }

    checkInputsForButton();
  });
};

export const invalidEmailHandler = () => {
  const emailNode = document.querySelector(".content-form__input--email");
  invalidInputEventHandler(emailNode, "잘못된 이메일입니다");
};

export const invalidPasswordHandler = () => {
  const passwordNode = document.querySelector(".content-form__input--password");
  invalidInputEventHandler(
    passwordNode,
    "비밀번호를 8자 이상 입력해주세요",
    () => passwordNode.value !== ""
  );
};

export const invalidPasswordAgainHandler = () => {
  const passwordAgainNode = document.querySelector(
    ".content-form__input--password-again"
  );
  const passwordNode = document.querySelector(".content-form__input--password");

  invalidInputEventHandler(
    passwordAgainNode,
    "비밀번호가 일치하지 않습니다.",
    () => passwordNode.value === passwordAgainNode.value
  );
};

export const invalidNickNameHandler = () => {
  const nickNameNode = document.querySelector(".content-form__input--nickname");
  invalidInputEventHandler(nickNameNode);
};
