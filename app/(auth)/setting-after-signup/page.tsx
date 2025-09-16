"use client";

import ImageUploader from "./components/ImageUploader";
import BinaryOptionSelector from "@/components/BinaryOptionSelector";
import TechSearch from "@/app/project-generate-step-1/components/TechSearch";
import { useSignUpStore } from "@/store/signupDataStore";
import DateSelector from "@/components/DateSelector";
import MainButton from "@/components/MainButton";
import Recruit from "@/app/project-generate-step-1/components/Recruit";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/Input";
import { PASSWORD_MIN_LENGTH } from "@/app/lib/constants";

import { useState } from "react";
import { createAccount } from "../signup/createAccount";
import { dataURLtoFile } from "@/utils/dataURLtoFile";
import { baseSchema, emailSchema } from "@/types/auth";

export default function SettingAfterSignup() {
  const store = useSignUpStore();
  const router = useRouter();
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false); // 버튼 연속 클릭 방지

  // Oauth로그인 하면 type 없음
  const searchParams = useSearchParams();
  const signUpType = searchParams.get("type");

  // 회원가입 요청 보내는 작업
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 요기는 Zod를 이용해서 Zustand에 있는 상태들이 올바른 형태인지 검증하는 작업

    // 일단 공통 폼이 올바른 입력값인지 확인
    const baseResult = baseSchema.safeParse(store);
    if (!baseResult.success) {
      setErrors(baseResult.error.flatten().fieldErrors);
      return;
    }

    // 만약 일반 이메일 회원가입이면 이메일,비번,비번확인까지 검증하도록 함
    if (signUpType === "email") {
      const result = emailSchema.safeParse(store);
      if (!result.success) {
        setErrors(result.error.flatten().fieldErrors);
        return;
      }
    }

    setErrors({});

    // 생년월일을 나이로 바꿔줘야함
    // 지금은 단순히 현재년도 - 태어난 년도 + 1임
    const age = store.birthDate
      ? new Date().getFullYear() - new Date(store.birthDate).getFullYear() + 1
      : 0;

    // request 보낼 가입 데이터
    const registerRequest = {
      age: age,
      name: store.userName,
      email: "",
      password: "",
      gender: store.gender === "남성" ? "MALE" : "FEMALE",
      subCategories: store.field.map((f) => ({
        subcategory: f.field?.split("-")[1] ?? "",
      })),
      skills: store.skills.map((s) => ({ skillName: s })),
      introduce: "",
    };

    // email로 회원가입이면 이멜,패스워드 보냄
    if (signUpType === "email") {
      registerRequest.email = store.email ?? "";
      registerRequest.password = store.password ?? "";
    }

    // request body key값 request로 일치시킴
    const formData = new FormData();
    formData.append(
      "request",
      new Blob([JSON.stringify(registerRequest)], { type: "application/json" }),
    );

    if (store.profileImg) {
      const file = dataURLtoFile(store.profileImg, "profile.jpg");
      if (file) {
        formData.append("file", file);
      }
    }

    setIsLoading(true);
    try {
      // 성공 여부와 데이터 또는 에러메세지가 actionResult에 저장됨
      const actionResult = await createAccount(formData);
      setIsLoading(false);

      if (actionResult.success) {
        router.push("/setting-after-signup-introduce");
      } else {
        alert(`회원가입 실패: ${actionResult.error?.message}`);
      }
    } catch (error) {
      alert("예상치 못한 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="min-h-screen flex flex-col" onSubmit={handleSubmit}>
      <div className="w-[430px] m-auto justify-start flex flex-col flex-1 py-10 ">
        <h1 className="text-2xl text-center font-bold text-mtm-main-blue mb-14">
          meeTeam
        </h1>
        <b className="text-[26px] mb-10">기본정보</b>
        <div className="flex flex-col gap-5">
          {signUpType && (
            <>
              <Input
                title="이메일"
                name="email"
                type="email"
                value={store.email || ""}
                onValueChange={store.setEmail}
                errors={errors.email}
                required
              />
              <Input
                title="비밀번호"
                name="password"
                type="password"
                value={store.password || ""}
                onValueChange={store.setPassword}
                minLength={PASSWORD_MIN_LENGTH}
                errors={errors.password}
                required
              />
              <Input
                title="비밀번호 확인"
                name="confirmPassword"
                type="password"
                value={store.confirmPassword || ""}
                onValueChange={store.setConfirmPassword}
                minLength={PASSWORD_MIN_LENGTH}
                errors={errors.confirmPassword}
                required
              />
            </>
          )}

          <Input
            title="이름"
            placeholder="홍길동"
            value={store.userName}
            onValueChange={store.setUserName}
            errors={errors.userName}
            required
          />
          <div className="flex flex-col gap-4">
            <b>생년월일</b>
            <DateSelector
              value={store.birthDate}
              onChange={store.setBirthDate}
              errors={errors.birthDate}
            />
          </div>
          <BinaryOptionSelector<"여성" | "남성">
            title={"성별"}
            option1={"여성"}
            option2={"남성"}
            value={store.gender}
            onChange={store.setGender}
          />
          <Recruit
            title={"분야"}
            value={store.field}
            onChange={store.setField}
            errors={errors.field}
          />
          <div className="flex flex-col">
            <span className="text-xs text-mtm-main-blue">*복수 선택 가능</span>
            <TechSearch
              title=""
              value={store.skills}
              onChange={store.setSkills}
              errors={errors.skills}
            />
          </div>
          <ImageUploader
            value={store.profileImg}
            onUploadImage={store.setProfileImg}
          />
        </div>
        <MainButton type="submit" buttonName="가입하기" disabled={isLoading} />
      </div>
    </form>
  );
}
