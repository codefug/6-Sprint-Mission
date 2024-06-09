import { Article, Comments, UserData } from "../model";
import { BASE_URL } from "../constants/constants";
import { getCookie } from "../lib/login";

export async function getArticleWithId(id: string) {
  try {
    const res = await fetch(`${process.env.BASE_URL}/articles/${id}`);
    const data: Article = await res.json();
    return data;
  } catch (error) {
    throw new Error();
  }
}

export async function getCommentWithId(id: string, cursor: number | null) {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/articles/${id}/comments?limit=10${cursor !== null ? `&&cursor=${cursor}` : ""}`,
    );
    const data: Comments = await res.json();
    return data;
  } catch (error) {
    throw new Error();
  }
}

type PostArticle = {
  image?: string;
  content: string;
  title: string;
};

export async function postArticle(data: PostArticle) {
  try {
    const Credential = getCookie("accessToken");
    let { image, content, title } = data;
    if (!Credential) return;
    if (image) {
      console.log(image);
      image = await postImage(image);
    }
    const response = await fetch(`${BASE_URL}/articles`, {
      method: "POST",
      body: JSON.stringify({ image, content, title }),
      headers: {
        Authorization: `Bearer ${Credential}`,
      },
    });
    const Data = await response.json();
  } catch (err) {
    console.error("Error:", err);
  }
}

async function postImage(imageUrl: string) {
  let formData = new FormData();
  formData.append("image", imageUrl);
  try {
    const Credential = getCookie("accessToken");
    const response = await fetch(`${BASE_URL}/images/upload`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Authorization: `Bearer ${Credential}`,
        "Content-Type": "multipart/form-data",
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    throw new Error();
  }
}

export async function getToken() {
  try {
    const response = await fetch(`${BASE_URL}/auth/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "example@email.com",
        password: "password",
      }),
    });
    const data: UserData = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    throw new Error();
  }
}
