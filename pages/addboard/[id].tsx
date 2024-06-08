import { Article } from "@/shared/model";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

export const getServerSideProps = (async (context) => {
  const { id } = context.query;
  const res = await fetch(`${process.env.BASE_URL}/articles/${id}`);
  const data: Article = await res.json();
  return { props: { data } };
}) satisfies GetServerSideProps<{ data: Article }>;

export default function AddboardId({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <div>{data.image}</div>
      <div>{data.title}</div>
    </>
  );
}
