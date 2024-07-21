import { z } from "zod";

export const registerScema = z.object({
  images: z.array(z.instanceof(File)),
  name: z.string().min(1, "상품명을 입력해주세요"),
  description: z.string().min(1, "상품 소개를 입력해주세요"),
  price: z
    .number()
    .int()
    .gte(0, "0 이상의 숫자를 입력해주세요")
    .lte(100000000, "1억 이하의 숫자를 입력해주세요"),
  tags: z.array(z.string().min(1, "태그를 입력해주세요")),
});
