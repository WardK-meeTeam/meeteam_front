"use client";

import { createAccount } from "./actions";
import { useActionState } from "react";
import { PASSWORD_MIN_LENGTH } from "@/app/lib/constants";
import Input from "@/app/components/input";
import SocialLogin from "@/app/components/social-login";
import LongButton from "@/app/components/longButton";
import React, { useState } from "react";

export default function CreateAccount() {
  const [state, action] = useActionState(createAccount, null);

  // 입력값 상태 추가
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 하나라도 비어 있으면 true
  const isAnyEmpty = Object.values(form).some((v) => !v);

  return (
    <div className="flex flex-col gap-10 py-8 px-6 items-center">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">meeTeam</h1>
      </div>
      <SocialLogin />
      <div className="w-96 h-px bg-neutral-500" />
      <form action={action} className="flex flex-col gap-3">
        <span className="text-md -mb-2">이름</span>
        <Input
          name="username"
          type="text"
          required={true}
          errors={state?.fieldErrors?.username}
          onChange={handleChange}
        />
        <span className="text-md -mb-2">Email</span>
        <Input
          name="email"
          type="email"
          required={true}
          errors={state?.fieldErrors?.email}
          onChange={handleChange}
        />
        <span className="text-md -mb-2">비밀번호</span>
        <Input
          name="password"
          type="password"
          required={true}
          errors={state?.fieldErrors?.password}
          minLength={PASSWORD_MIN_LENGTH}
          onChange={handleChange}
        />
        <span className="text-md -mb-2">비밀번호 확인</span>
        <Input
          name="confirm_password"
          type="password"
          required={true}
          errors={state?.fieldErrors?.confirm_password}
          minLength={PASSWORD_MIN_LENGTH}
          onChange={handleChange}
        />
        <LongButton text="확인" marginTop="mt-10" disabled={isAnyEmpty} />
      </form>
    </div>
  );
}
