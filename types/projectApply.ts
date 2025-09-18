// zod 유효성 검증
import { z } from "zod";

export const projectApplySchema = z.object({
  introduction: z.string().min(1, { message: "설명글을 입력해주세요!" }),

  canOffline: z.enum(["가능", "불가능"]),

  useTime: z.number().min(0).max(168),

  availableDays: z
    .array(z.string())
    .min(1, { message: "투자 가능한 요일을 선택해주세요!" }),
});
