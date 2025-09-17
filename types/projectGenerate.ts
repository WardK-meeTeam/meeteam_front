// zod 유효성 검증
import { z } from "zod";

export const projectGenerateSchema = z.object({
  projectName: z.string().min(1, { message: "프로젝트명을 입력해주세요." }),

  // 일단 초기 개발 단계에서는 배열 말고 카테고리 1개만 선택
  // projectCategories: z
  //   .array(z.string())
  //   .min(1, { message: "프로젝트 카테고리를 선택해주세요!" }),

  projectCategories: z.string().min(1, { message: "카테고리를 선택해주세요!" }),

  // 일단 초기 개발 단계에서는 배열 말고 플랫폼을 1개만 선택
  // platform: z.array(z.string()).min(1, { message: "플랫폼을 선택해주세요!" }),
  platform: z.string().min(1, { message: "플랫폼을 선택해주세요!" }),

  projectDeadline: z
    .string()
    .nullable()
    .refine((val) => val, {
      message: "프로젝트 마감일을 입력해주세요.",
    }),

  mustOffline: z.enum(["필수", "선택"]),

  myField: z.string().min(1, { message: "분야를 선택해주세요!" }),

  recruitField: z
    .array(z.object({ id: z.number(), field: z.string().nullable() }))
    .min(1, { message: "모집 분야를 1개 이상 선택해주세요." })
    .refine((fields) => fields.every((f) => f.field), {
      message: "모집 분야에 공백이 있습니다.",
    }),
  skills: z
    .array(z.string())
    .min(1, { message: "필요 기술 스택을 선택해주세요!" }),
  projectImage: z.string().nullable().optional(),
  projectDescription: z.string(),
});
