import { useScreenDetector } from "@/shared/lib/hooks";
import { Button } from "@/shared/ui/button";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  title: string;
  content: string;
  image: string;
}

export default function Addboard() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (d) => {
    alert(JSON.stringify({ ...d, image: d.image?.[0] }));
  };
  const { isDesktop } = useScreenDetector();

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <header className="mb-6 mt-4 flex items-center lg:mt-6">
        <h2 className="flex-grow text-xl font-bold">
          {isDesktop ? "게시글 쓰기" : "상품 등록하기"}
        </h2>
        <Button className="h-[42px] w-[74px]" value="등록" />
      </header>
      <section className="flex flex-col gap-3 font-bold">
        <h2 className="text-sm md:text-lg">*제목</h2>
        <input
          {...register("title", { required: true })}
          placeholder="제목을 입력해주세요"
          type="text"
          className="flex-grow rounded-xl bg-[#f3f4f6] px-6 py-4"
        />
        {errors.title?.type === "required" && (
          <p role="alert" className="text-[#ff0000]">
            제목을 입력해주세요!
          </p>
        )}
      </section>
      <section className="flex flex-col gap-3 font-bold">
        <h2 className="text-sm md:text-lg">*내용</h2>
        <textarea
          {...register("content", { required: true })}
          placeholder="내용을 입력해주세요"
          className="h-[200px] flex-grow resize-none rounded-xl bg-[#f3f4f6] px-6 py-4 lg:h-[200px]"
        />
        {errors.content?.type === "required" && (
          <p role="alert" className="text-[#ff0000]">
            내용을 입력해주세요!
          </p>
        )}
      </section>
      <section className="flex flex-col gap-3 font-bold">
        <h2 className="text-sm md:text-lg">이미지</h2>
        <label
          htmlFor="image"
          className="flex h-[168px] w-[168px] cursor-pointer items-center justify-center bg-[#f3f4f6] text-[#9CA3AF] md:h-[162px] md:w-[162px] lg:h-[282px] lg:w-[282px]"
        >
          <figure className="flex h-[84px] w-[74px] flex-col items-center gap-3">
            <div className="relative h-12 w-12">
              <Image fill src="/icons/plusButton.png" alt="plueButton" />
            </div>
            <p>이미지 등록</p>
          </figure>
        </label>
        <input
          id="image"
          type="file"
          className="hidden"
          {...register("image")}
        />
      </section>
    </form>
  );
}
