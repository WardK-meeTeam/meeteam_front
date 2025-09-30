"use client";

import { useEffect, useState } from "react";
import MemberList from "../components/MemberList";
import { getProjectDetail } from "@/api/projectDetail";
import { ProjectDetails } from "@/types/projectInfo";
import Image from "next/image";
import ArrowIcon from "@/public/images/right_arrow_icon.svg";
import ProjectManageHeader from "./components/ProjectManageHeader";
import { authFetch } from "@/api/authFetch";
import { getUserProfile } from "@/api/user";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import DangerModal from "@/components/DangerModal";
export default function ManageClient({ projectId }: { projectId: string }) {
  const [project, setProject] = useState<ProjectDetails | null>(null);

  const fetchProjectInfo = async () => {
    const response = await getProjectDetail(projectId);
    if (response.success) {
      setProject(response.data);
    } else {
      throw new Error(response.data.message);
    }
  };

  const router = useRouter();
  const { user, setUser } = useAuth();
  const [showDeleteCofirmModal, setShowDeleteCofirmModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        await fetchProjectInfo();
      } catch (error) {
        alert(error instanceof Error ? error.message : String(error));
      }
    };
    run();
  }, []);

  useEffect(() => {
    if (!project) return;
    if (
      project.projectMembers.filter(
        (member) =>
          member.creator === true && member.memberId === user?.memberId,
      ).length === 0
    ) {
      alert("해당 프로젝트 관리 권한이 없습니다!");
      router.back();
      return;
    }
  }, [user, projectId]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await authFetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("프로젝트가 삭제되었습니다.");
        // 플젝 삭제하고, 마이페이지에도 내 플젝 리스트가 있어서 삭제된 플젝 반영해줘야함 -> 프로필 업데이트
        const updatedUser = await getUserProfile(); // 업데이트 된 사용자 정보를 Context에도 반영시켜줌
        if (updatedUser) setUser(updatedUser);

        router.push("/");
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Failed to delete project", error);
      alert("프로젝트 삭제 중 오류가 발생했습니다.");
    } finally {
      setIsDeleting(false);
      setShowDeleteCofirmModal(false);
    }
  };

  if (!project) return <div>로딩중...</div>;
  return (
    <main className="mx-auto mt-10 w-11/12 max-w-7xl min-w-5xl">
      <ProjectManageHeader projectId={projectId} projectName={project.name} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* 팀원 관리 섹션 */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">팀원 관리</h2>
          <MemberList
            members={project.projectMembers}
            projectId={projectId}
            mode="MANAGE"
            onUpdate={fetchProjectInfo}
          />
        </div>

        {/* 프로젝트 설정 섹션 */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">프로젝트 설정</h2>
          <div className="flex flex-col gap-3 rounded-xl border border-mtm-light-gray p-6">
            <button
              type="button"
              className="flex justify-between w-full cursor-pointer rounded-lg p-4
            transition-all duration-200 ease-in-out hover:bg-gray-50"
              onClick={() => router.push(`/projects/${projectId}/manage/edit`)}
            >
              <span>프로젝트 수정</span>
              <Image src={ArrowIcon} alt="arrow" width={8} height={12} />
            </button>
            <button
              type="button"
              className="flex justify-between w-full cursor-pointer rounded-lg p-4
            transition-all duration-200 ease-in-out hover:bg-gray-50"
              onClick={() =>
                router.push(`/projects/${projectId}/manage/github`)
              }
            >
              <span>Github 연동 관리</span>
              <Image src={ArrowIcon} alt="arrow" width={8} height={12} />
            </button>
            <button
              type="button"
              className="flex justify-between w-full cursor-pointer rounded-lg p-4 text-mtm-main-red
            transition-all duration-200 ease-in-out hover:bg-red-50"
              onClick={() => setShowDeleteCofirmModal(true)}
            >
              <span>프로젝트 삭제</span>
              <Image src={ArrowIcon} alt="arrow" width={8} height={12} />
            </button>
          </div>
        </div>
      </div>

      <DangerModal
        isOpen={showDeleteCofirmModal}
        onChangeOpen={setShowDeleteCofirmModal}
        onClickButton={handleDelete}
        title="프로젝트를 정말 삭제하시겠습니까?"
        description={`삭제하시려면 "삭제하기"를 입력하세요`}
        cancelText="삭제하지 않기"
        isLoading={isDeleting}
      />
    </main>
  );
}
