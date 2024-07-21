import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email({ message: "잘못된 이메일 형식입니다" }),
  password: z.string().min(8, { message: "비밀번호를 8자 이상 입력해주세요" }),
});

export type SignInInput = z.infer<typeof SignInSchema>;
