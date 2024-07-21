import { z } from "zod";

export const SignUpSchema = z
  .object({
    nickname: z.string().min(2, { message: "이름을 2자 이상 입력해주세요" }),
    email: z.string().email({ message: "잘못된 이메일 형식입니다" }),
    password: z
      .string()
      .min(8, { message: "비밀번호를 8자 이상 입력해주세요" }),
    passwordConfirmation: z
      .string()
      .min(8, { message: "비밀번호를 8자 이상 입력해주세요" }),
  })
  .superRefine(({ passwordConfirmation, password }, ctx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: "custom",
        message: "비밀번호가 일치해야 합니다.",
        path: ["passwordConfirmation"],
      });
    }
  });

export type SignUpType = z.infer<typeof SignUpSchema>;
