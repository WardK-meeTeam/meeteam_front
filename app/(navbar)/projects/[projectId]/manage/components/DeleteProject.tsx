"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import { authFetch } from "@/api/authFetch";
import { getUserProfile } from "@/api/user";
import { useAuth } from "@/context/AuthContext";

const DeleteProject = ({ projectId }: { projectId: string }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

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
      setShowConfirmModal(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">프로젝트 삭제</h2>
      <div className="p-4 border rounded-md border-red-500">
        <p className="text-red-500">
          이 작업은 되돌릴 수 없습니다. 프로젝트를 영구적으로 삭제합니다.
        </p>
        <button
          onClick={() => setShowConfirmModal(true)}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
        >
          프로젝트 삭제
        </button>
      </div>
      {showConfirmModal && (
        <Modal>
          <div className="p-4">
            <h3 className="text-lg font-bold">정말로 삭제하시겠습니까?</h3>
            <p className="mt-2">이 작업은 되돌릴 수 없습니다.</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500 text-white rounded-md disabled:bg-gray-400"
              >
                {isDeleting ? "삭제 중..." : "삭제"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DeleteProject;
