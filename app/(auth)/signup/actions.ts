"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "../../lib/constants";
// import db from "@/lib/db"; // db 관련 코드 제거
import { z } from "zod";
import { redirect } from "next/navigation";

// function checkUsername(username: string) {
//   return !username.includes("admin");
// }

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    email: z
      .string()
      .email({ message: "올바른 이메일 형식이 아닙니다." })
      .toLowerCase(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  // db 관련 superRefine 제거
  // .superRefine(async ({ username }, ctx) => { ... })
  // .superRefine(async ({ email }, ctx) => { ... })
  .refine(checkPasswords, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirm_password"],
  });

export async function createAccount(prevState: unknown, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = await formSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    redirect("/profile");
  }
}
