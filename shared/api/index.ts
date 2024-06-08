import { Article, Comments } from "../model";

export async function getArticleWithId(id: string) {
  const res = await fetch(`${process.env.BASE_URL}/articles/${id}`);
  const data: Article = await res.json();
  return data;
}

export async function getCommentWithId(id: string) {
  const res = await fetch(
    `${process.env.BASE_URL}/articles/${id}/comments?limit=10`,
  );
  const data: Comments = await res.json();
  return data;
}
