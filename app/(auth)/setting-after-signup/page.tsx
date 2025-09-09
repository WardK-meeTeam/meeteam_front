"use client";

import Input from "@/app/project-generate-step-1/components/Input";
import ImageUploader from "./components/ImageUploader";
import BinaryOptionSelector from "@/components/BinaryOptionSelector";
import TechSearch from "@/app/project-generate-step-1/components/TechSearch";
import { useSignUpStore } from "@/store/signupDataStore";
import DateSelector from "@/components/DateSelector";
import MainButton from "@/components/MainButton";
import Recruit from "@/app/project-generate-step-1/components/Recruit";
import { useEffect, useState } from "react";

export default function SettingAfterSignup() {
  // 상태 꺼내오기
  const userName = useSignUpStore((state) => state.userName);
  const birthDate = useSignUpStore((state) => state.birthDate);
  const gender = useSignUpStore((state) => state.gender);
  const field = useSignUpStore((state) => state.field);
  const skills = useSignUpStore((state) => state.skills);
  const profileImg = useSignUpStore((state) => state.profileImg);
  const introduction = useSignUpStore((state) => state.introduction);
  // setter 꺼내오기
  const setUserName = useSignUpStore((state) => state.setUserName);
  const setBirthDate = useSignUpStore((state) => state.setBirthDate);
  const setGender = useSignUpStore((state) => state.setGender);
  const setField = useSignUpStore((state) => state.setField);
  const setSkills = useSignUpStore((state) => state.setSkills);
  const setProfileImg = useSignUpStore((state) => state.setProfileImg);

  const [errors, setErrors] = useState<Record<string, string[]>>(() =>
    validateProfileForm(),
  );

  function validateProfileForm() {
    const errs: Record<string, string[]> = {};

    if (!userName?.trim()) errs.userName = ["이름을 입력해주세요."];
    if (!birthDate) errs.birthDate = ["생년월일을 입력해주세요."];

    if (!field?.length) {
      errs.field = ["분야를 1개 이상 선택해주세요."];
    } else {
      const invalid = field.find((f) => !f.field);
      if (invalid) errs.field = ["분야에 공백이 있습니다."];
    }

    // 이거는 선택
    // if (!skills?.length) errs.skills = ["기술 스택을 1개 이상 선택해주세요."];
    // if (introduction && introduction.length < 10) errs.introduction = ["소개글은 최소 10자 이상 입력해주세요."];

    return errs;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = validateProfileForm();
    setErrors(v);
    if (Object.keys(v).length) {
      console.warn("폼 검증 오류:", v);
      return;
    }

    // 나중에 API 요청할 부분
    console.log("이름:", userName);
    console.log("생년월일:", birthDate);
    console.log("성별:", gender);
    console.log("분야:", field);
    console.log("기술 스택:", skills);
    console.log("프로필 이미지:", profileImg);
    console.log("소개:", introduction);
  };

  useEffect(() => {
    const next = validateProfileForm();
    setErrors(next);
  }, [userName, birthDate, gender, field, skills, profileImg, introduction]);
  return (
    <form className="min-h-screen flex flex-col" onSubmit={handleSubmit}>
      <div className="w-[430px] m-auto justify-start flex flex-col flex-1 py-10 ">
        <h1 className="text-2xl text-center font-bold text-mtm-main-blue mb-14">
          meeTeam
        </h1>
        <b className="text-[26px] mb-10">기본정보</b>
        <div className="flex flex-col gap-5">
          <Input
            title="이름"
            placeholder="홍길동"
            value={userName}
            onChange={setUserName}
          />
          <div className="flex flex-col gap-4">
            <b>나이</b>
            <DateSelector value={birthDate} onChange={setBirthDate} />
          </div>
          <BinaryOptionSelector<"여성" | "남성">
            title={"성별"}
            option1={"여성"}
            option2={"남성"}
            value={gender}
            onChange={setGender}
          />
          <Recruit title={"분야"} value={field} onChange={setField} />
          <div className="flex flex-col">
            <span className="text-xs text-mtm-main-blue">*복수 선택 가능</span>
            <TechSearch title="" value={skills} onChange={setSkills} />
          </div>
          <ImageUploader value={profileImg} onUploadImage={setProfileImg} />
        </div>
        <MainButton
          buttonName="확인"
          disabled={Object.keys(errors).length !== 0}
        />
      </div>
    </form>
  );
}
