import { CommentsCard } from "@/entities/commentsCard/ui/commentsCard";
import { getArticleWithId, getCommentWithId } from "@/shared/api";
import { Article, Comments } from "@/shared/model";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

export const getServerSideProps = (async (context) => {
  const { id } = context.query;

  if (typeof id !== "string") {
    return { notFound: true };
  }

  const articles = await getArticleWithId(id as unknown as string);
  const comments = await getCommentWithId(id as unknown as string);
  return { props: { articles, comments } };
}) satisfies GetServerSideProps<{ articles: Article; comments: Comments }>;

export default function AddboardId({
  articles,
  comments,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <div>{articles.content}</div>
      {comments.list ? (
        comments.list.map((comment) => (
          <CommentsCard
            key={comment.id}
            content={comment.content}
            createdAt={comment.createdAt}
            nickname={comment.writer.nickname}
            image={comment.writer.image}
          />
        ))
      ) : (
        <div>댓글 없움</div>
      )}
    </>
  );
}
