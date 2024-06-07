import { BestPostCard } from "@/entities/bestPostCard";
import { PostCard } from "@/entities/postCard/ui/postCard";
import { BASE_URL, SORT_OBJECT_KEY_TYPE } from "@/shared/constants/constants";
import { Article, ArticleData } from "@/shared/model";
import { Button } from "@/shared/ui/button";
import { Dropdown } from "@/widgets/DropDown";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export const getStaticProps = (async () => {
  const likeRes = await fetch(`${BASE_URL}/articles?pageSize=3&&orderBy=like`);
  const likeData: ArticleData = await likeRes.json();
  const likeList = likeData.list ?? [];
  return { props: { likeList } };
}) satisfies GetStaticProps<{
  likeList: Article[] | [];
}>;

export default function BoardsPage({
  likeList,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [article, setArticle] = useState<Article[]>([]);
  const [sort, setSort] = useState<SORT_OBJECT_KEY_TYPE>("recent");
  const [isLoading, setLoading] = useState(true);
  const searchRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState("");

  function getArticle(sort: SORT_OBJECT_KEY_TYPE, keyword: string) {
    fetch(`${BASE_URL}/articles?orderBy=${sort}&&keyword=${keyword}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data.list ?? []);
        setLoading(false);
      })
      .catch((e: Error) => {
        alert(e.message);
      });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchRef.current) setKeyword(searchRef.current.value);
  };

  useEffect(() => {
    getArticle(sort, keyword);
  }, [sort, keyword]);

  return (
    <div>
      <Head>
        <title>자유 게시판</title>
      </Head>
      <article className="mt-4 flex flex-col gap-4 md:mt-6">
        <header className="text-xl font-bold">베스트 게시글</header>
        <section className="grid h-[167px] grid-cols-1 gap-0 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
          {likeList.map((item, index) => (
            <article
              key={item.id}
              className={
                index === 0
                  ? "h-[167px]"
                  : index === 1
                    ? "hidden h-[167px] md:block"
                    : "hidden h-[167px] lg:block"
              }
            >
              <BestPostCard
                createdAt={item.createdAt}
                image={item.image}
                likeCount={item.likeCount}
                title={item.title}
                nickname={item.writer.nickname}
              />
            </article>
          ))}
        </section>
      </article>
      <article className="mt-10">
        <header className="flex items-center justify-between text-xl font-bold">
          게시글
          <div className="text-base">
            <Button>글쓰기</Button>
          </div>
        </header>
        <section className="mb-6 mt-4 flex items-center gap-2 md:mt-6 md:gap-4">
          <form onSubmit={handleSubmit} className="flex flex-grow">
            <input
              type="search"
              name="search"
              placeholder="검색할 상품을 입력해주세요."
              ref={searchRef}
              className="h-[42px] flex-grow rounded-xl bg-[#f3f4f6] bg-input-placeholder bg-[16px] bg-no-repeat py-2 pl-11 pr-3"
            />
          </form>
          <Dropdown setValue={setSort} value={sort} />
        </section>
        <section>
          {isLoading ? (
            <div>로딩중입니다.</div>
          ) : (
            article.map((item) => (
              <PostCard
                key={item.id}
                createdAt={item.createdAt}
                image={item.image}
                likeCount={item.likeCount}
                nickname={item.writer.nickname}
                title={item.title}
              />
            ))
          )}
        </section>
      </article>
    </div>
  );
}
