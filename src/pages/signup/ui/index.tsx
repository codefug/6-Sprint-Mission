import { postSignUp } from "@/shared/api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { SignUpSchema } from "../schema";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(
    {
      resolver: zodResolver(SignUpSchema),
    }
  )
  const navigation = useNavigate();

  const onSubmit = async (d:FieldValues) => {
  try{
    const data = await postSignUp({
        email: d.email,
        nickname: d.nickname,
        password: d.password,
        passwordConfirmation: d.passwordConfirmation,
      });
      if (data){
        navigation('/login');
      }
  }catch(error){
    if (error instanceof AxiosError){
      throw new Error(error?.response?.data);
    }
    throw new Error("알 수 없는 에러");
  }}

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <label id="nickname">nickname</label>
      <input {...register("nickname")} />
      {errors.nickname?.message && <p>{errors.nickname?.message as string}</p>}
        <label id="email">email</label>
        <input {...register("email",{required: true})} /> 
      {errors.email?.message && <p style={{color:"red"}}>{errors.email?.message as string}</p>}
        <label id="password">password</label>
        <input {...register("password",{required: true})} type="password" />
        {errors.password?.message && (
          <p style={{color:"red"}}>{errors.password?.message as string}</p>
        )}
        <label id="passwordConfirmation">passwordConfirmation</label>
        <input {...register("passwordConfirmation",{required: true})} type="password"/>
        {errors.passwordConfirmation?.message && (
          <p style={{color:"red"}}>{errors.passwordConfirmation?.message as string}</p>
        )}
      <input type="submit" value="회원가입"/>
    </form>
  )
}