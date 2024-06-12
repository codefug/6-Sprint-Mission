export const INITIAL_VALUE = {
  isLoading: false,
  errorMessage: null,
};

export const INITIAL_PRODUCT_INFO = {
  info: null,
  comments: null,
};

export const PLACEHOLDER_LIST_FOR_REGISTER = [
  {
    value: "상품명",
    placeholder: "상품명을 입력해주세요",
    type: "text",
    name: "title",
  },
  {
    value: "상품 소개",
    placeholder: "상품 소개를 입력해주세요",
    type: "textarea",
    name: "description",
  },
  {
    value: "판매가격",
    placeholder: "판매 가격을 입력해주세요",
    type: "number",
    name: "price",
  },
  {
    value: "태그",
    placeholder: "태그를 입력해주세요",
    type: "text",
    name: "tags",
  },
];

export const FORM_DATA = {
  title: null,
  image: null,
  description: null,
  price: null,
  tags: null,
};

export const INQUIRY_PLACEHOLDER =
  "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.";

export const BASE_URL = `https://panda-market-api.vercel.app`;
