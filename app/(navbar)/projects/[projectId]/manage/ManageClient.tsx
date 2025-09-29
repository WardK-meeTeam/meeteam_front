"use client";

import { useEffect, useState } from "react";
import MemberList from "../components/MemberList";
import { getProjectDetail } from "@/api/projectDetail";
import { ProjectDetails } from "@/types/projectInfo";
import Image from "next/image";
import ArrowIcon from "@/public/images/right_arrow_icon.svg";
import RepositoryManagement from "./components/RepositoryManagement";
import { authFetch } from "@/api/authFetch";
import { getUserProfile } from "@/api/user";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import DangerModal from "@/components/DangerModal";
import Link from "next/link";

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
  const { setUser } = useAuth();
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
      <h1 className="mb-11 text-4xl font-extrabold">
        프로젝트 관리{"  >  "}
        <Link
          href={`/projects/${projectId}/detail`}
          className="hover:underline"
        >
          {project.name}
        </Link>
      </h1>
      <div className="flex justify-start gap-28">
        <div className="flex flex-col justify-start items-start gap-4 w-1/4">
          <h2 className="text-xl font-bold">팀원 관리</h2>
          <MemberList
            members={project.projectMembers}
            projectId={projectId}
            mode="MANAGE"
            onUpdate={fetchProjectInfo}
          />

          <button
            type="button"
            className="flex justify-between w-full cursor-pointer border border-mtm-light-gray px-4 py-3
            transition-all duration-200 ease-in-out hover:bg-gray-50
            "
            onClick={() => router.push(`/projects/${projectId}/manage/edit`)}
          >
            프로젝트 수정
            <Image src={ArrowIcon} alt="arrow" width={8} height={12} />
          </button>

          <button
            type="button"
            className="flex justify-between w-full cursor-pointer border border-mtm-light-gray px-4 py-3
            text-mtm-main-red
            transition-all duration-200 ease-in-out hover:bg-red-50
            "
            onClick={() => setShowDeleteCofirmModal(true)}
          >
            프로젝트 삭제
            <Image src={ArrowIcon} alt="arrow" width={8} height={12} />
          </button>
        </div>

        <div className="flex flex-col justify-start items-start gap-7 w-1/3">
          <h2 className="text-xl font-bold">레포지토리 관리</h2>
          <RepositoryManagement projectId={projectId} />
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
