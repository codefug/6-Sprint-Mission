import { BASE_URL } from "../constants/constants";
import { GetCommentsProps, GetDatumProps, GetProductProps } from "./type";

// 나중에 전부 axios로 바꾸기
export async function getDatum({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
}: GetDatumProps) {
  const searchParams = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    orderBy,
    keyword,
  });
  const response = await fetch(
    `${BASE_URL}/products?${searchParams.toString()}`
  );
  if (!response.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다.");
  }
  const data = await response.json();
  return data;
}

export const getProduct = async ({ productId = null }: GetProductProps) => {
  const response = await fetch(`${BASE_URL}/products/${productId}`);
  if (!response.ok) {
    throw new Error(`${productId}의 데이터를 가져오지 못했습니다.`);
  }
  const data = await response.json();
  return data;
};

export const getComments = async ({
  productId = null,
  limit,
}: GetCommentsProps) => {
  const response = await fetch(
    `${BASE_URL}/products/${productId}/comments?limit=${limit}`
  );
  if (!response.ok) {
    throw new Error(`${productId}의 comments 데이터를 가져오지 못했습니다.`);
  }
  const data = await response.json();
  return data;
};
