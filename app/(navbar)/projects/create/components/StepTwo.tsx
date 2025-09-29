"use client";

import { useProjectGenerateStore } from "@/store/projectGenerateStore";
import MarkDown from "../../../../../components/MarkDown";
import ProjectGenerateFooter from "@/app/(navbar)/projects/create/components/ProjectGenerateFooter";
import { urlToFile } from "@/utils/urlToFile";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authFetch } from "@/api/authFetch";
import { getUserProfile } from "@/api/user";
import { useAuth } from "@/context/AuthContext";

export default function StepTwo() {
  const { setUser } = useAuth();
  const text = useProjectGenerateStore((state) => state.projectDescription);
  const setText = useProjectGenerateStore(
    (state) => state.setProjectDescription,
  );
  const router = useRouter();

  const store = useProjectGenerateStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      description: store.projectDescription,
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
      try {
        const file = await urlToFile(store.projectImage, "project.png");
        formData.append("file", file, file.name); // 파일명도 같이
      } catch (e) {
        console.error("이미지 변환 실패:", e);
      }
    }

    // API 호출부
    const fetchCreateProjects = async () => {
      try {
        const response = await authFetch(`/api/projects`, {
          method: "POST",
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
          const projectId = data.result.id;
          alert("프로젝트가 생성되었습니다!");
          const updatedUser = await getUserProfile(); // 업데이트 된 사용자 정보를 Context에도 반영시켜줌
          if (updatedUser) setUser(updatedUser);
          router.push(`/projects/${projectId}/detail`);
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
          error: { message: `알 수 없는 오류가 발생했습니다. (${error})` },
        };
      }
    };

    setIsSubmitting(true);
    try {
      await fetchCreateProjects();
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form className="flex flex-col min-h-screen" onSubmit={handleSubmit}>
      <div className="flex flex-col min-h-screen">
        <div className="w-[1000px] m-auto flex flex-col justify-start py-10 flex-1 ">
          <b className="text-[26px] mb-10">프로젝트 등록</b>
          <MarkDown maxSize={800} text={text} onChangeText={setText} />
        </div>
        <ProjectGenerateFooter step={2} isSubmitting={isSubmitting} />
      </div>
    </form>
  );
}
