"use client";

import ConnectGithubButton from "../../detail/components/ConnectGithubButton";
import ConnectRepo from "../../detail/components/ConnectRepo";

const RepositoryManagement = ({ projectId }: { projectId: string }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">레포지토리 관리</h2>
      <div className="p-4 border rounded-md">
        <ConnectGithubButton />
        <ConnectRepo projectId={projectId} />
      </div>
    </div>
  );
};

export default RepositoryManagement;
