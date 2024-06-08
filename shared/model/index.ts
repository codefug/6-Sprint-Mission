export type Article = {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
};

export interface ArticleData {
  list: Array<Article>;
  totalCount: number;
}

export interface GetArticleProps {
  pageSize?: number;
  orderBy?: string;
  keyword?: string;
}

export type Comments = {
  nextCursor: number;
  list: {
    writer: {
      image: string;
      nickname: string;
      id: number;
    };
    updatedAt: string;
    createdAt: string;
    content: string;
    id: number;
  }[];
};
