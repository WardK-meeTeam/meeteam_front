import { z } from "zod";

// baseSchema는 Oauth 로그인, 일반 이메일 로그인 둘다 받아야하는 input들
export const profileEditSchema = z.object({
  newFields: z
    .array(z.object({ id: z.number(), field: z.string().nullable() }))
    .min(1, { message: "분야를 1개 이상 선택해주세요." })
    .refine((fields) => fields.every((f) => f.field), {
      message: "분야에 공백이 있습니다.",
    }),
  newSkills: z.array(z.string()).optional(),
});
