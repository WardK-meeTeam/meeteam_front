"use client";

import MainButton from "@/components/MainButton";
import Modal from "@/components/Modal";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import userImg from "@/public/images/userImg1.png";

export default function ApplicationModal() {
  const applicationId = useSearchParams().get("applicationId");

  const handleApprove = () => {
    // TODO: API POST 요청 보내기
    console.log(`Approving application ${applicationId}`);
    // router.back(); 또는 성공 페이지로 이동
  };

  const handleReject = () => {
    // TODO: API POST 요청 보내기
    console.log(`Rejecting application ${applicationId}`); // router.back();
  };

  return (
    <Modal>
      <div className="flex flex-col justify-start gap-12">
        <div className="flex flex-row justify-start items-center gap-12">
          <div className="flex flex-col items-center">
            <Image
              src={userImg}
              width={100}
              height={120}
              className="rounded-full"
              alt="사용자"
            />
            <span>정연준</span>
          </div>

          <table className="border-spacing-5 border-separate">
            <tbody>
              <tr>
                <th className="text-start">지원 분야</th>
                <td>디자인</td>
              </tr>
              <tr>
                <th className="text-start">나이</th>
                <td>22세</td>
              </tr>
              <tr>
                <th className="text-start">성별</th>
                <td>여성</td>
              </tr>
              <tr>
                <th className="text-start">이메일</th>
                <td>jhje5595@naver.com</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-xl font-semibold">지원 사유 및 자기소개</span>
          <p>
            저는 건강과 삶의 질 향상에 직접적으로 기여할 수 있다는 점에서
            헬스케어 분야에 큰 관심을 가지고 있습니다. 단순한 기술 개발을 넘어,
            실제 사용자들의 생활 습관 개선과 질환 예방에 도움을 줄 수 있는
            프로젝트에 참여하고 싶습니다. 특히 데이터 기반 분석과 사용자 경험을
            결합하여 더 나은 서비스를 제공하는 과정에 적극 기여할 수 있다고
            생각합니다. 이번 프로젝트를 통해 사회적으로 의미 있는 성과를
            만들어내고, 동시에 헬스케어 서비스에 필요한 문제 해결 능력과 협업
            경험을 쌓으며 성장하고 싶습니다.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xl font-semibold">
            주당 투자 가능 시간 및 요일
          </span>
          <span>7시간 화,금,토</span>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xl font-semibold">오프라인 참여 가능 여부</span>
          <span>가능</span>
        </div>
        <div className="flex flex-col gap-4">
          <MainButton buttonName="승인하기" type="button" disabled={false} />
          <MainButton buttonName="거절하기" type="button" disabled={false} />
        </div>
      </div>
    </Modal>
  );
}
