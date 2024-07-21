import { useUserStore } from "@/app/store";
import { postSignIn } from "@/shared/api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { SignInSchema } from "../schema";
import { isAxiosError } from "axios";

// 네트워크 요청을 보내기 전에 형식 검사
export function LoginPage() {
  const { login } = useUserStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(SignInSchema) });

  const onSubmit = async (d: FieldValues) => {
    try {
      const data = await postSignIn({
        email: d.email,
        password: d.password,
      });
      login(data.accessToken, data.refreshToken);
      navigate("/");
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.message);
        throw new Error(error.message);
      }
      alert(error);
      throw new Error("알 수 없는 오류 발생");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register("email")} />
          {errors.email?.message && (
            <p style={{ color: "red" }}>{errors.email?.message as string}</p>
          )}
        </div>
        <div>
          <input {...register("password")} type="password" />
          {errors.password?.message && (
            <p style={{ color: "red" }}>{errors.password?.message as string}</p>
          )}
        </div>
        <input type="submit" />
      </form>
      <Link to="/signup">회원가입</Link>
    </>
  );
}
