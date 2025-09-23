"use client";

import { fetchUser } from "@/api/user";
import Recruit from "@/app/(navbar)/projects/create/components/Recruit";
import { userFieldItem } from "@/store/signupDataStore";
import { UserProfile } from "@/types/userProfile";
import { useEffect, useState } from "react";
import KeyValueRow from "./components/KeyValueRow";
import TechSearch from "@/app/(navbar)/projects/create/components/TechSearch";
import ToggleSwitchButton from "@/components/ToggleSwitchButton";
import TextArea from "@/components/TextArea";
import MainButton from "@/components/MainButton";
import SubButton from "@/components/SubButton";
import { urlToFile } from "@/utils/urlToFile";
import ImageUploader from "@/app/(auth)/setting-after-signup/components/ImageUploader";
import { useRouter } from "next/navigation";
import { profileEditSchema } from "@/types/profileEdit";

export default function Page() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>(
    {},
  );
  const router = useRouter();

  const [newFields, setNewFields] = useState<userFieldItem[] | null>(null);
  const [newSkills, setNewSkills] = useState<string[] | null>(null);
  const [newParticipation, setNewParticipation] = useState<boolean>(false);
  const [newIntroduce, setNewIntroduce] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetchUser();
        const user: UserProfile = response.result;
        setProfile(user);

        // 현재 화면에 기존 내정보 띄워주는 용도 (수정할 수 있는 값들만 해당 페이지에서 새로 State로 선언)
        const newCategories = user.categories.map((ct, idx) => ({
          id: idx,
          field: `${ct.bigCategory}-${ct.smallCategory}`,
        }));
        const newSk = user.skills.map((sk) => sk.skill);
        setNewFields(newCategories);
        setNewSkills(newSk);
        setNewParticipation(user.isParticipating);
        setNewIntroduce(user.introduce);
        setNewImage(user.profileImageUrl);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  // 회원가입 요청 보내는 작업
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 요기는 Zod를 이용해서 Zustand에 있는 상태들이 올바른 형태인지 검증하는 작업

    const result = profileEditSchema.safeParse({
      newFields: newFields,
      newSkills: newSkills,
    });
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});

    // request 보낼 가입 데이터
    const registerRequest = {
      age: age,
      name: name,
      gender: gender,
      subCategories: newFields!.map((f) => f.field?.split("-")[1] ?? ""),
      skills: newSkills,
      isParticipating: newParticipation,
      introduction: newIntroduce,
    };

    // request body로 넣을 form Data 만들기
    const formData = new FormData();
    formData.append(
      "memberInfo",
      new Blob([JSON.stringify(registerRequest)], { type: "application/json" }),
    );

    if (newImage) {
      try {
        const file = await urlToFile(newImage, "profileImg.png");
        formData.append("profileImage", file, file.name); // 파일명도 같이
      } catch (e) {
        console.error("이미지 변환 실패:", e);
      }
    }

    setSubmitting(true);
    const API = process.env.NEXT_PUBLIC_API_BASE_URL;
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await fetch(`${API}/api/members`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("성공", data);
        alert("프로필을 수정하였습니다.");
        router.back();
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      alert(`알 수 없는 오류가 발생했습니다. (${error})`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>로딩중...</div>;
  }

  if (!profile) {
    return <div>조회된 정보가 없습니다.</div>;
  }
  const { name, age, gender, email } = profile;
  return (
    <form
      className="flex flex-col gap-16 mx-auto min-w-2xl"
      onSubmit={handleSubmit}
    >
      <h1 className="font-extrabold text-4xl">정보 수정</h1>

      <div className="flex flex-col gap-y-12 min-w-xl max-w-[600px]">
        <ImageUploader value={newImage} onUploadImage={setNewImage} />

        <KeyValueRow title={"이름"} value={<span>{name}</span>} />
        <KeyValueRow title={"나이"} value={<span>{age}세</span>} />
        <KeyValueRow
          title={"성별"}
          value={<span>{gender === "MALE" ? "남" : "여"}</span>}
        />
        <KeyValueRow title={"이메일"} value={<span>{email}</span>} />
        <KeyValueRow
          title={"분야"}
          value={
            newFields && (
              <Recruit
                title=""
                value={newFields}
                onChange={setNewFields}
                errors={errors.newFields}
              />
            )
          }
        />
        <KeyValueRow
          title={"기술 스택"}
          value={
            newSkills && (
              <TechSearch title="" value={newSkills} onChange={setNewSkills} />
            )
          }
        />
        <KeyValueRow
          title={"프로젝트 참여 여부"}
          value={
            <ToggleSwitchButton
              isSelected={newParticipation}
              onClick={() => setNewParticipation((prev) => !prev)}
            />
          }
        />
        <KeyValueRow
          title={"자기 소개"}
          value={
            newIntroduce !== null && (
              <TextArea
                maxSize={600}
                value={newIntroduce}
                onValueChange={setNewIntroduce}
              />
            )
          }
        />
        <footer className="flex justify-end gap-x-4">
          <SubButton
            buttonName="취소"
            type="button"
            onClick={() => router.back()}
          />
          <MainButton buttonName="수정" type="submit" disabled={submitting} />
        </footer>
      </div>
    </form>
  );
}
