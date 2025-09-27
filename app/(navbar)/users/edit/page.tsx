"use client";

import Recruit from "@/app/(navbar)/projects/create/components/Recruit";
import { userFieldItem } from "@/store/signupDataStore";
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
import { useAuth } from "@/context/AuthContext";
import { getUserProfile } from "@/api/user";
import { authFetch } from "@/api/authFetch";

export default function Page() {
  const { user, isLoading, setUser } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>(
    {},
  );

  // user 데이터에 의존하는 state들은 null 또는 기본값으로 초기화
  const [newFields, setNewFields] = useState<userFieldItem[] | null>(null);
  const [newSkills, setNewSkills] = useState<string[] | null>(null);
  const [newParticipation, setNewParticipation] = useState<boolean>(false);
  const [newIntroduce, setNewIntroduce] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<string | null>(null);

  // 2. useEffect를 사용해서 user 정보가 로드되면 state를 업데이트 함
  useEffect(() => {
    if (user) {
      setNewFields(
        user.categories.map((ct, idx) => ({
          id: idx,
          field: `${ct.bigCategory}-${ct.smallCategory}`,
        })),
      );
      setNewSkills(user.skills.map((sk) => sk.skill));
      setNewParticipation(user.isParticipating);
      setNewIntroduce(user.introduce);
      setNewImage(user.profileImageUrl);
    }
  }, [user]); // user 객체가 변경될 때 이 effect가 실행됩니다.

  // 3. 조건부 리턴은 모든 훅이 호출된 이후에 위치합니다.
  if (isLoading) return <div>로딩중...</div>;
  if (!user) return <div>유저정보 조회 실패</div>;

  // 회원가입 요청 보내는 작업
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = profileEditSchema.safeParse({
      newFields: newFields,
      newSkills: newSkills,
    });
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});

    const registerRequest = {
      age: user.age,
      name: user.name,
      gender: user.gender,
      subCategories: newFields!.map((f) => f.field?.split("-")[1] ?? ""),
      skills: newSkills,
      isParticipating: newParticipation,
      introduction: newIntroduce,
    };

    const formData = new FormData();
    formData.append(
      "memberInfo",
      new Blob([JSON.stringify(registerRequest)], { type: "application/json" }),
    );

    if (newImage && newImage !== user.profileImageUrl) {
      // 이미지가 변경되었을 때만 포함
      try {
        const file = await urlToFile(newImage, "profileImg.png");
        formData.append("profileImage", file, file.name);
      } catch (e) {
        console.error("이미지 변환 실패:", e);
      }
    }

    setSubmitting(true);

    try {
      const response = await authFetch(`/api/members`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        alert("프로필을 수정하였습니다.");

        const updatedUser = await getUserProfile(); // 업데이트 된 사용자 정보를 Context에도 반영시켜줌
        if (updatedUser) setUser(updatedUser);
        router.push("/users"); // 다시 마이페이지로 돌아감
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

  const { name, age, gender, email } = user;
  return (
    <form
      className="flex flex-col gap-16 pb-20 mx-auto min-w-2xl"
      onSubmit={handleSubmit}
    >
      <h1 className="text-4xl font-extrabold">정보 수정</h1>

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
        <footer className="flex gap-x-4 justify-end">
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
