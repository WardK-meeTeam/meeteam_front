"use client";

import ConnectGithubButton from "./ConnectGithubButton";
import ConnectRepo from "./ConnectRepo";

const RepositoryManagement = ({ projectId }: { projectId: string }) => {
  return (
    <div className="min-w-[380px] flex flex-col gap-8 justify-start items-start w-full">
      <div className="flex flex-col gap-5 justify-start items-start w-full">
        <div className="flex flex-col text-[14px]">
          <span className="text-mtm-purple">Step1.</span>
          <span>원하시는 Github저장소에 미팀봇을 설치해주세요!</span>
        </div>
        <ConnectGithubButton />
      </div>

      <div className="flex flex-col gap-5 justify-start items-start w-full">
        <div className="flex flex-col text-[14px]">
          <span className="text-mtm-purple">Step2.</span>
          <span>미팀봇을 설치한 저장소의 url주소를 입력해주세요!</span>
        </div>
        <ConnectRepo projectId={projectId} />
      </div>
    </div>
  );
};

export default RepositoryManagement;
