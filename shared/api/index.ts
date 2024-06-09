import { Article, Comments } from "../model";

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
