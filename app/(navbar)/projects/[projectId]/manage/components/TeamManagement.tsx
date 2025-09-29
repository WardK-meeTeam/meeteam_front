"use client";

import { useState, useEffect, useCallback } from "react";
import { authFetch } from "@/api/authFetch";
import { Member } from "@/types/projectInfo";
import MemberList from "../../components/MemberList";

const TeamManagement = ({ projectId }: { projectId: string }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchProjectMembers = useCallback(async () => {
    const response = await authFetch(`/api/projects/V2/${projectId}`);
    if (response.ok) {
      const data = await response.json();
      setMembers(data.result.projectMembers);
    }
  }, [API, projectId]);

  useEffect(() => {
    fetchProjectMembers();
  }, [fetchProjectMembers]);

  return <MemberList members={members} />;
};

export default TeamManagement;
