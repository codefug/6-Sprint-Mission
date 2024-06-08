import Image from "next/image";

interface Props {
  createdAt: string;
  nickname: string;
  content: string;
  image: string;
}

export function CommentsCard({ createdAt, nickname, content, image }: Props) {
  return (
    <section>
      <div>{content}</div>
      <button>
        <Image
          width={24}
          height={24}
          src={image ? "/images/ic_kebab.png" : image}
          alt="edit button"
        />
      </button>
      <figure>
        <Image
          width={32}
          height={32}
          src="/icons/profileIcon.png"
          alt="comments profile"
        />
        <section>
          <p>{nickname}</p>
          <p>{createdAt}</p>
        </section>
      </figure>
    </section>
  );
}
