"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "../../lib/constants";
// import db from "@/lib/db"; // db 관련 코드 제거
import { z } from "zod";
import { redirect } from "next/navigation";

function checkUsername(username: string) {
  return !username.includes("admin");
}

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string",
        required_error: "Username is required",
      })
      .toLowerCase()
      .trim()
      //.transform((username) => `${username}🇰🇷`)
      .refine(checkUsername, "Username cannot contain 'admin'"),
    email: z.string().email().toLowerCase(),
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
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export async function createAccount(prevState: unknown, formData: FormData) {
  const data = {
    username: formData.get("username"),
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
