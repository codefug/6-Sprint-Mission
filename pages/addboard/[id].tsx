import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CommentsCard } from "@/entities/commentsCard/ui/commentsCard";
import { getArticleWithId, getCommentWithId } from "@/shared/api";
import { formatDate } from "@/shared/lib/formatDate";
import { Article, Comments } from "@/shared/model";
import { Button, SubmitButton } from "@/shared/ui/button";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";

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
  console.log(comments);
  return (
    <>
      <header className="mb-4 mt-6 border-b border-[#E5E7EB]">
        <h1 className="mb-4 flex justify-between">
          <p className="text-xl font-bold">{articles.title}</p>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                width={24}
                height={24}
                src="/images/ic_kebab.png"
                alt="kebab menu"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-lg border-gray">
              <DropdownMenuItem className="w-24 cursor-pointer justify-center border-b border-b-gray px-3 py-3">
                수정
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer justify-center px-3 py-3">
                삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </h1>
        <div className="mb-4 flex">
          <figure className="flex gap-2">
            <Image
              width={24}
              height={24}
              src="/icons/profileIcon.png"
              alt="profileIcon"
            />
            <p>{articles.writer.nickname}</p>
            <p className="border-r border-r-[#E5E7EB] pr-4 text-[#9CA3AF]">
              {formatDate(new Date(articles.createdAt))}
            </p>
          </figure>
          <figure className="flex gap-1 pl-4">
            <Image
              width={24}
              height={24}
              src="/icons/heart.png"
              alt="heartIcon"
            />
            <p className="text-[#6B7280]">{articles.likeCount}</p>
          </figure>
        </div>
      </header>
      <section>{articles.content}</section>
      <form className="mt-16">
        <h2 className="text-base font-semibold">댓글 달기</h2>
        <textarea
          className="mt-4 h-[104px] w-full resize-none rounded-xl bg-[#f3f4f6] px-6 py-4"
          placeholder="댓글을 입력해주세요"
        />
        <SubmitButton value="등록" className="ml-auto mt-4 px-[23px] py-3" />
      </form>
      {comments.list.length > 0 ? (
        <ul className="flex flex-col">
          {comments.list.map((comment) => (
            <CommentsCard
              key={comment.id}
              content={comment.content}
              createdAt={comment.createdAt}
              nickname={comment.writer.nickname}
              image={comment.writer.image}
            />
          ))}
        </ul>
      ) : (
        <section className="flex flex-col items-center">
          <Image
            width={140}
            height={140}
            src="/images/Img_reply_empty.png"
            alt="no Comments"
          />
          <p className="text-center">
            아직 댓글이 없어요,
            <br /> 지금 댓글을 달아보세요!
          </p>
        </section>
      )}
      <Link href="/boards" className="mt-5 flex justify-center lg:mt-10">
        <Button className="rounded-[40px] px-[38.5px] py-3">
          <p>목록으로 돌아가기</p>
          <Image
            width={24}
            height={24}
            src="/images/ic_back.png"
            alt="return button"
          />
        </Button>
      </Link>
    </>
  );
}
