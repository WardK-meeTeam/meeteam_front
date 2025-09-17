// zod 유효성 검증

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/app/lib/constants";
import { z } from "zod";

// baseSchema는 Oauth 로그인, 일반 이메일 로그인 둘다 받아야하는 input들
export const baseSchema = z.object({
  userName: z.string().min(1, { message: "이름을 입력해주세요." }),
  birthDate: z
    .string()
    .nullable()
    .refine((v) => !!v, { message: "생년월일을 입력해주세요." })
    .refine((v) => !v || /^\d{4}-\d{2}-\d{2}$/.test(v), {
      message: "YYYY-MM-DD 형식으로 입력해주세요.",
    })
    .refine(
      (v) => {
        if (!v) return true;
        const d = new Date(v);
        return !Number.isNaN(d.getTime()) && d <= new Date();
      },
      { message: "유효한 과거 날짜를 입력해주세요." },
    ),
  gender: z.enum(["여성", "남성"]),
  field: z
    .array(z.object({ id: z.number(), field: z.string().nullable() }))
    .min(1, { message: "분야를 1개 이상 선택해주세요." })
    .refine((fields) => fields.every((f) => f.field), {
      message: "분야에 공백이 있습니다.",
    }),
  skills: z.array(z.string()).optional(),
  profileImg: z.string().nullable().optional(),
});

// 일반 이메일 로그인시 추가로 받아야 하는 이메일,비번,비번 확인
export const emailSchema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, {
        message: `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`,
      })
      .regex(PASSWORD_REGEX, { message: PASSWORD_REGEX_ERROR }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });
