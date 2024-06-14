import { useStore } from "@/app/store";
import { postSignIn } from "@/shared/api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: "잘못된 이메일 형식입니다" }),
  password: z.string().min(8, { message: "비밀번호를 8자 이상 입력해주세요" }),
});
// 네트워크 요청을 보내기 전에 형식 검사
export function LoginPage() {
  const { login } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (d: FieldValues) => {
    (async () => {
      const data = await postSignIn({
        email: d.email,
        password: d.password,
      });
      if (!data) return;
      console.log(d);
      login(data.accessToken);
    })();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} />
        {errors.email?.message && <p>{errors.email?.message as string}</p>}
        <input {...register("password")} />
        {errors.password?.message && (
          <p>{errors.password?.message as string}</p>
        )}
        <input type="submit" />
      </form>
      <Link to="/signup">회원가입</Link>
    </>
  );
}
