"use client";

import { createAccount } from "./actions";
import { useActionState, useEffect } from "react";
import { PASSWORD_MIN_LENGTH } from "@/app/lib/constants";
import React, { useState } from "react";
import SocialSignInButton from "./components/SocialSignInButton";
import MainButton from "@/components/MainButton";
import Input from "@/components/Input";

export default function CreateAccount() {
  const [state, action] = useActionState(createAccount, null);

  // 입력값 상태 추가
  const [form, setForm] = useState({
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
    <div className="w-[340px] m-auto box-border justify-start items-center flex flex-col flex-1 gap-8">
      <h1 className="text-2xl font-bold text-mtm-main-blue">meeTeam</h1>
      <div className="flex flex-col w-full justify-start items-center gap-3 ">
        <SocialSignInButton platform="google" />
        <SocialSignInButton platform="github" text="Github로 시작하기" />
      </div>

      <span className="flex flex-row justify-center items-center w-full box-border">
        <div className="bg-mtm-light-gray h-px flex-1" />
        <span className="px-4 text-xs">or</span>
        <div className="bg-mtm-light-gray h-px flex-1" />
      </span>
      <form action={action} className="flex flex-col gap-3 w-full">
        <div className="flex flex-col">
          <span className="text-md">Email</span>
          <Input
            name="email"
            type="email"
            value={form.email}
            required={true}
            errors={state?.fieldErrors?.email}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <span className="text-md">비밀번호</span>
          <Input
            name="password"
            type="password"
            value={form.password}
            required={true}
            errors={state?.fieldErrors?.password}
            minLength={PASSWORD_MIN_LENGTH}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <span className="text-md">비밀번호 확인</span>
          <Input
            name="confirm_password"
            type="password"
            value={form.confirm_password}
            required={true}
            errors={state?.fieldErrors?.confirm_password}
            minLength={PASSWORD_MIN_LENGTH}
            onChange={handleChange}
          />
        </div>
        <MainButton buttonName="확인" disabled={isAnyEmpty} />
      </form>
    </div>
  );
}
