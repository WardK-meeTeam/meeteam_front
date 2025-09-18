"use client";
import BinaryOptionSelector from "@/components/BinaryOptionSelector";
import SelectableButtonGroup, {
  Option,
} from "@/components/SelectableButtonGroup";
import ImageSelector from "./ImageSelector";
import Recruit from "./Recruit";
import TechSearch from "./TechSearch";
import DateSelector from "@/components/DateSelector";
import Input from "../../../../components/Input";
import { useProjectGenerateStore } from "@/store/projectGenerateStore";
import FieldSelector from "./FieldSelector";
import ProjectGenerateFooter from "@/components/ProjectGenerateFooter";
import { projectGenerateSchema } from "@/types/projectGenerate";
import { useState } from "react";
import { dataURLtoFile } from "@/utils/dataURLtoFile";

const categories: Option[] = [
  { value: "ENVIRONMENT", label: "친환경🍀" },
  { value: "PET", label: "반려동물🐱" },
  { value: "HEALTHCARE", label: "헬스케어💪" },
  { value: "EDUCATION", label: "교육/학습📚" },
  { value: "AI_TECH", label: "AI/테크💻" },
  { value: "FASHION_BEAUTY", label: "패션/뷰티💄" },
  { value: "FINANCE_PRODUCTIVITY", label: "금융/생산성⚒️" },
  { value: "ETC", label: "기타" },
];
const platforms: Option[] = [
  { value: "IOS", label: "iOS" },
  { value: "ANDROID", label: "Android" },
  { value: "WEB", label: "Web" },
];

export default function StepOne() {
  const store = useProjectGenerateStore();
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Zod로 정의해놓은 형식과 같은 형식의 입력값인지 확인
    const result = projectGenerateSchema.safeParse(store);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    // 에러 초기화
    setErrors({});

    // request 보낼 가입 데이터
    const projectGenerateRequestBody = {
      endDate: store.projectDeadline,
      offlineRequired: store.mustOffline === "필수" ? true : false,
      platformCategory: store.platform,
      projectCategory: store.projectCategories,
      projectName: store.projectName,
      projectSkills: store.skills.map((s) => ({ skillName: s })),
      recruitments: store.recruitField.map((f) => ({
        subCategory: f.field?.split("-")[1] ?? "",
        recruitmentCount: f.numOfPeople,
      })),

      subCategory: store.myField?.split("-")[1],
      description: "",
    };

    const formData = new FormData();
    formData.append(
      "projectPostRequest",
      new Blob([JSON.stringify(projectGenerateRequestBody)], {
        type: "application/json",
      }),
    );

    // 플젝 사진 있으면 사진 넣어주기
    if (store.projectImage) {
      const file = dataURLtoFile(store.projectImage, "projectImage.jpg");
      if (file) {
        formData.append("file", file);
      }
    }

    // API 호출부
    const good = async () => {
      const API = process.env.NEXT_PUBLIC_API_BASE_URL;

      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        alert("로그인이 필요합니다!");
        return;
      }

      try {
        const response = await fetch(`${API}/api/projects`, {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}` },
          body: formData,
        });

        if (response.ok) {
          //   {
          //     "code": "COMMON200",
          //     "message": "요청에 성공했습니다.",
          //     "result": {
          //         "id": 82,
          //         "title": "test",
          //         "createdAt": "2025-09-17T08:13:20.823746145"
          //     }
          // }
          const data = await response.json();
          alert("성공!" + data.message);
        } else {
          //   {
          //     "code": "PROJECT400",
          //     "message": "종료일은 시작일 이후여야 합니다."
          // }
          const errorData = await response.json();
          alert(errorData.message);
        }
      } catch (error) {
        return {
          success: false,
          error: { message: "An unknown error occurred." },
        };
      }
    };

    good();
  };

  return (
    <form className="min-h-screen flex flex-col" onSubmit={handleSubmit}>
      <div className="w-[440px] m-auto justify-start flex flex-col flex-1 py-10 ">
        <b className="text-[26px] mb-10">프로젝트 등록</b>
        <div className="flex flex-col gap-16">
          <Input
            title="프로젝트 명"
            placeholder="프로젝트 이름을 입력해주세요"
            value={store.projectName}
            onValueChange={store.setProjectName}
            errors={errors.projectName}
          />
          <SelectableButtonGroup
            title={"프로젝트 카테고리"}
            optionList={categories}
            value={store.projectCategories}
            onChangeOne={store.setProjectCategories}
            errors={errors.projectCategories}
            onlySelectOne={true}
          />
          <SelectableButtonGroup
            title={"플랫폼"}
            optionList={platforms}
            value={store.platform}
            onChangeOne={store.setPlatform}
            errors={errors.platform}
            onlySelectOne={true}
          />
          <ImageSelector
            value={store.projectImage}
            onChange={store.setProjectImage}
          />
          <BinaryOptionSelector<"필수" | "선택">
            title={"오프라인 정기모임 필수 여부"}
            option1={"필수"}
            option2={"선택"}
            value={store.mustOffline}
            onChange={store.setMustOffline}
          />
          <div className="flex flex-col gap-4 w-full">
            <b>나의 포지션</b>
            <FieldSelector
              value={store.myField}
              onChange={store.setMyField}
              errors={errors.myField}
            />
          </div>
          <Recruit
            title={"모집 분야"}
            value={store.recruitField}
            onChange={store.setRecruitField}
            errors={errors.recruitField}
          />
          <TechSearch
            title="필요 기술 스택"
            value={store.skills}
            onChange={store.setSkills}
            errors={errors.skills}
          />
          <div className="flex flex-col gap-4">
            <b>프로젝트 마감일</b>
            <DateSelector
              value={store.projectDeadline}
              onChange={store.setProjectDeadline}
              errors={errors.projectDeadline}
            />
          </div>
        </div>
      </div>
      <ProjectGenerateFooter step={1} />
    </form>
  );
}
