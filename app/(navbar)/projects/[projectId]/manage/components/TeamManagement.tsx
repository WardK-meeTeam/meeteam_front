"use client";

import { useState, useEffect, useCallback } from "react";
import { authFetch } from "@/api/authFetch";
import { Member } from "@/types/projectInfo";
import MemberList from "../../detail/components/MemberList";

const TeamManagement = ({ projectId }: { projectId: string }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchProjectMembers = useCallback(async () => {
    const response = await authFetch(`${API}/api/projects/V2/${projectId}`);
    if (response.ok) {
      const data = await response.json();
      setMembers(data.result.projectMembers);
    }
  }, [API, projectId]);

  useEffect(() => {
    fetchProjectMembers();
  }, [fetchProjectMembers]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">팀원 관리</h2>
      <div className="p-4 border rounded-md">
        <h3 className="text-lg font-semibold">현재 팀원</h3>
        <MemberList members={members} />
      </div>
      <div className="p-4 border rounded-md mt-4">
        <h3 className="text-lg font-semibold">지원자 관리</h3>
        <p className="text-gray-500 mt-2">
          프로젝트 지원자 목록을 보려면 API가 필요합니다. API 엔드포인트를
          알려주시면 이 기능을 구현해 드리겠습니다.
        </p>
        {/* 여기에 지원자 목록이 표시됩니다. */}
      </div>
    </div>
  );
};

export default TeamManagement;
