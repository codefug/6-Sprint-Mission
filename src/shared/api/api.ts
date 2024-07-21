import { AxiosError } from "axios";
import { instance, instanceWithoutInterceptors } from "./axios";
import {
  GetCommentsProps,
  GetDatumProps,
  GetProductProps,
  PostAuthRefreshToken,
  SignInRequestData,
  SignInResponseData,
  SignUpRequestData,
  SignUpResponseData,
  SpecificCommentsData,
  SpecificProductData,
} from "./type";
import Cookies from "js-cookie";

// 나중에 전부 axios로 바꾸기
export async function getDatum({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword,
}: GetDatumProps) {
  try {
    const searchParams = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      orderBy,
    });
    if (keyword) searchParams.set("keyword", keyword);
    const response = await instanceWithoutInterceptors(`/products?`, {
      params: searchParams,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    alert(error);
    throw new Error();
  }
}

export const getProduct = async ({ productId }: GetProductProps) => {
  try {
    const response = await instanceWithoutInterceptors(
      `/products/${productId}`
    );
    const data: SpecificProductData = response.data;
    return data;
  } catch (error) {
    console.error(error);
    alert(error);
    throw Error();
  }
};

export const getComments = async ({
  productId = null,
  limit,
}: GetCommentsProps) => {
  try {
    const searchParams = new URLSearchParams({
      limit: limit.toString(),
    });
    const response = await instanceWithoutInterceptors(
      `/products/${productId}/comments`,
      {
        params: searchParams,
      }
    );
    const data: SpecificCommentsData = response.data;
    return data;
  } catch (error) {
    console.error(error);
    alert(error);
    throw new Error(`${productId}의 comments 데이터를 가져오지 못했습니다.`);
  }
};

export const postSignUp = async ({
  email,
  nickname,
  password,
  passwordConfirmation,
}: SignUpRequestData) => {
  try {
    const response = await instanceWithoutInterceptors.post(`/auth/signUp`, {
      email,
      nickname,
      password,
      passwordConfirmation,
    });
    const data: SignUpResponseData = response.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response);
      alert(error.response?.data?.message);
      throw new Error();
    }
    throw new Error();
  }
};

export const postSignIn = async ({ email, password }: SignInRequestData) => {
  try {
    const response = await instanceWithoutInterceptors.post(`/auth/signIn`, {
      email,
      password,
    });
    const data: SignInResponseData = response.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response);
      alert(error.response?.data?.message);
      throw new Error();
    }
    throw new Error();
  }
};

export const postAuthRefreshToken = async () => {
  try {
    const refreshToken = Cookies.get("refreshToken");
    if (refreshToken === undefined) {
      window.location.href = "/login";
    }
    const response = await instanceWithoutInterceptors.post(
      `/auth/refresh-token`,
      { refreshToken }
    );
    const data: PostAuthRefreshToken = response.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response);
      alert(error.response?.data?.message);
      throw new Error();
    }
    throw new Error();
  }
};

interface PostImagesUploadProps {
  url: string;
}

export const postImagesUpload = async (imageFile: File) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  try {
    const response = await instance.post<PostImagesUploadProps>(
      "/images/upload",
      formData
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
      alert(error.message);
      throw new Error();
    }
    console.error(error);
    alert(error);
    throw new Error();
  }
};

interface PostProductsProps {
  images: string[];
  tags: string[];
  price: number;
  description: string;
  name: string;
}

export const postProducts = async (data: PostProductsProps) => {
  try {
    const response = await instance.post("/products", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
      alert(error.message);
      throw new Error();
    }
    console.error(error);
    alert(error);
    throw new Error();
  }
};

interface PostProductsProductIdCommentsProps {
  productId: string;
  content: string;
}

export const postProductProductIdComments = async ({
  productId,
  content,
}: PostProductsProductIdCommentsProps) => {
  try {
    const response = await instance.post(`/products/${productId}/comments`, {
      content,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
      alert(error.message);
      throw new Error();
    }
    console.error(error);
    alert(error);
    throw new Error();
  }
};
