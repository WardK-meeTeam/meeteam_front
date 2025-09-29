"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getProjectDetail } from "@/api/projectDetail";
import BinaryOptionSelector from "@/components/BinaryOptionSelector";
import SelectableButtonGroup from "@/components/SelectableButtonGroup";
import ImageSelector from "@/app/(navbar)/projects/create/components/ImageSelector";
import Recruit from "@/app/(navbar)/projects/create/components/Recruit";
import TechSearch from "@/app/(navbar)/projects/create/components/TechSearch";
import DateSelector from "@/components/DateSelector";
import Input from "@/components/Input";
import MarkDown from "@/components/MarkDown";
import { urlToFile } from "@/utils/urlToFile";
import { authFetch } from "@/api/authFetch";
import { categories } from "@/mocks/projectCategories";
import { platforms } from "@/mocks/projectPlatforms";
import SubButton from "@/components/SubButton";
import MainButton from "@/components/MainButton";

interface ProjectDetailsForModify {
  projectName: string;
  projectCategories: string;
  platform: string;
  projectImage: string | null;
  mustOffline: "필수" | "선택";
  startDate: string;
  recruitField: { id: number; field: string; numOfPeople: number }[];
  skills: string[];
  projectDeadline: string | null;
  projectDescription: string;
  status: string;
  likeCount: number;
  name: string;
  description: string;
  platformCategory: string;
  projectCategory: string;
  imageUrl: string | null;
  offlineRequired: boolean;
  endDate: string;
  recruitments: any[]; // You might want to define a proper type for this
}

const initialState: ProjectDetailsForModify = {
  projectName: "",
  projectCategories: "",
  platform: "",
  projectImage: null,
  mustOffline: "선택",
  startDate: "",
  recruitField: [],
  skills: [],
  projectDeadline: null,
  projectDescription: "",
  status: "",
  likeCount: 0,
  name: "",
  description: "",
  platformCategory: "",
  projectCategory: "",
  imageUrl: null,
  offlineRequired: false,
  endDate: "",
  recruitments: [],
};

export default function ProjectModifyClient({
  projectId,
}: {
  projectId: string;
}) {
  const [project, setProject] = useState<ProjectDetailsForModify>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  const loadProjectDetail = useCallback(async () => {
    try {
      const response = await getProjectDetail(projectId);

      if (response.success) {
        const projectData = response.data;
        setProject({
          ...initialState,
          projectName: projectData.name,
          projectCategories: projectData.projectCategory,
          platform: projectData.platformCategory,
          projectImage: projectData.imageUrl,
          mustOffline: projectData.offlineRequired ? "필수" : "선택",
          startDate: projectData.startDate,
          recruitField: projectData.recruitments.map(
            (r: any, index: number) => ({
              id: index,
              field: `${r.bigCategory}-${r.subCategory}`,
              numOfPeople: r.recruitmentCount,
            }),
          ),
          skills: projectData.skills,
          projectDeadline: projectData.endDate,
          projectDescription: projectData.description,
          status: projectData.status,
          likeCount: projectData.likeCount,
          name: projectData.name,
          description: projectData.description,
          platformCategory: projectData.platformCategory,
          projectCategory: projectData.projectCategory,
          imageUrl: projectData.imageUrl,
          offlineRequired: projectData.offlineRequired,
          endDate: projectData.endDate,
          recruitments: projectData.recruitments,
        });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("프로젝트 정보 조회에 문제가 발생했습니다.");
      console.log(error);
    }
  }, [projectId]);

  useEffect(() => {
    loadProjectDetail();
  }, [loadProjectDetail]);

  const handleValueChange =
    (field: keyof ProjectDetailsForModify) =>
    (value: ProjectDetailsForModify[keyof ProjectDetailsForModify]) => {
      setProject((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const projectUpdateRequestBody = {
      endDate: project.projectDeadline,
      startDate: project.startDate,
      offlineRequired: project.mustOffline === "필수",
      platformCategory: project.platform,
      projectCategory: project.projectCategories,
      name: project.projectName,
      skills: project.skills?.map((skillName) => ({ skillName })),
      recruitments: project.recruitField?.map((f) => ({
        subCategory: f.field?.split("-")[1] ?? "",
        recruitmentCount: f.numOfPeople,
      })),
      description: project.projectDescription,
      status: "PLANNING",
    };

    const formData = new FormData();
    formData.append(
      "projectUpdateRequest",
      new Blob([JSON.stringify(projectUpdateRequestBody)], {
        type: "application/json",
      }),
    );

    if (project.projectImage) {
      try {
        const file = await urlToFile(project.projectImage, "project.png");
        formData.append("file", file, file.name);
      } catch (e) {
        console.error("Image conversion failed:", e);
      }
    }

    try {
      const response = await authFetch(`/api/projects/${projectId}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("프로젝트가 성공적으로 수정되었습니다!");
        router.back();
      } else {
        const errorData = await response.json();
        alert(`수정 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Failed to update project", error);
      alert("프로젝트 수정 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto mt-10 w-11/12">
      <h1 className="mb-11 text-4xl font-extrabold">
        프로젝트 관리 {` > 프로젝트 수정  >  ${project.name} `}
      </h1>
      <form
        className="min-h-screen flex flex-col max-w-xl"
        onSubmit={handleSubmit}
      >
        <div className="m-auto justify-start flex flex-col flex-1 py-10 ">
          <div className="flex flex-col gap-16">
            <Input
              title="프로젝트 명"
              placeholder="프로젝트 이름을 입력해주세요"
              value={project.projectName || ""}
              onValueChange={handleValueChange("projectName")}
            />
            <SelectableButtonGroup
              title={"프로젝트 카테고리"}
              optionList={categories}
              value={project.projectCategories || ""}
              onChangeOne={handleValueChange("projectCategories")}
              onlySelectOne={true}
            />
            <SelectableButtonGroup
              title={"플랫폼"}
              optionList={platforms}
              value={project.platform || ""}
              onChangeOne={handleValueChange("platform")}
              onlySelectOne={true}
            />
            <ImageSelector
              value={project.projectImage || null}
              onChange={handleValueChange("projectImage")}
            />
            <BinaryOptionSelector<"필수" | "선택">
              title={"오프라인 정기모임 필수 여부"}
              option1={"필수"}
              option2={"선택"}
              value={project.mustOffline || "선택"}
              onChange={handleValueChange("mustOffline")}
            />
            <Recruit
              title={"모집 분야"}
              value={project.recruitField || []}
              onChange={handleValueChange("recruitField")}
            />
            <TechSearch
              title="필요 기술 스택"
              value={project.skills || []}
              onChange={handleValueChange("skills")}
            />
            <div className="flex flex-col gap-4">
              <b>프로젝트 마감일</b>
              <DateSelector
                value={project.projectDeadline || null}
                onChange={handleValueChange("projectDeadline")}
              />
            </div>
            <div className="flex flex-col gap-4">
              <b className="text-xl">프로젝트 설명</b>
              <MarkDown
                maxSize={800}
                text={project.projectDescription || ""}
                onChangeText={handleValueChange("projectDescription")}
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-10">
            <SubButton
              buttonName="취소"
              type="button"
              onClick={() => router.back()}
            />

            <MainButton
              buttonName={isSubmitting ? "수정 중..." : "수정"}
              type="submit"
              disabled={isSubmitting}
            />
          </div>
        </div>
      </form>
    </main>
  );
}
