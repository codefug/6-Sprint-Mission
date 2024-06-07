import { formatDate } from "@/shared/lib/formatDate";
import { ItemImage } from "@/shared/ui/itemImage";
import Image from "next/image";

interface Props {
  title: string;
  image: string | null;
  nickname: string;
  createdAt: string;
  likeCount: number;
}

export function PostCard({
  title,
  image,
  createdAt,
  likeCount,
  nickname,
}: Props) {
  return (
    <section className="mt-6 flex h-[136px] flex-col justify-between border-b-[1px] border-b-[#e5e7eb]">
      <div className="flex justify-between text-xl font-semibold text-[#1F2937]">
        <p>{title}</p>
        <ItemImage imageUrl={image} />
      </div>
      <footer className="mb-6 flex items-center justify-between">
        <section className="flex text-sm">
          <Image
            src="/icons/profileIcon.png"
            alt="profile"
            height={24}
            width={24}
            className="mr-2"
          />
          <p className="mr-2 text-[#4B5563]">{nickname}</p>
          <p className="text-[#9ca3af]">{formatDate(new Date(createdAt))}</p>
        </section>
        <figure className="flex items-center gap-2 text-sm font-normal text-[#6b7280]">
          <button type="button">
            <Image
              src="/icons/heart.png"
              height={24}
              width={24}
              alt="heart icon"
            />
          </button>
          {likeCount > 9999 ? "9999+" : likeCount}
        </figure>
      </footer>
    </section>
  );
}
