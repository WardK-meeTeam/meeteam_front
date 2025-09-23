"use client";

import MainButton from "@/components/MainButton";
import Modal from "@/components/Modal";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import userImg from "@/public/images/userImg1.png";
import { useEffect, useState } from "react";
import { weekDayEngToKr } from "@/utils/weekDayEngToKr";
import Link from "next/link";

interface ApplicationInfo {
  applicationId: number;
  applicantId: number;
  applicantName: string;
  subCategoryName: string;
  age: number;
  gender: "MALE" | "FEMALE";
  applicantEmail: string;
  motivation: string;
  availableHoursPerWeek: number;
  weekDay: string[];
  offlineAvailable: boolean;
}

export default function ApplicationClient() {
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  const applicationId = useSearchParams().get("applicationId");
  const projectId = useSearchParams().get("projectId");
  const router = useRouter();

  // null이면 아직 data fetch 안된 상태
  const [applicationInfo, setApplicationInfo] =
    useState<ApplicationInfo | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchApplicationInfo = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!applicationId || !projectId) {
      alert("잘못된 접근입니다.");
      return;
    }

    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await fetch(
        `${API}/api/projects-application/${projectId}/${applicationId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );

      if (response.ok) {
        const data = await response.json();
        setApplicationInfo(data.result);
      } else {
        const errorData = await response.json();
        alert(errorData.message);
        router.back();
        return;
      }
    } catch (error) {
      alert(`알 수 없는 오류가 발생했습니다. (${error})`);
    }
  };

  useEffect(() => {
    fetchApplicationInfo();
  }, []);

  const handleApprove = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (submitting) return;
    setSubmitting(true);
    try {
      const response = await fetch(`${API}/api/projects-application/decide`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicationId: applicationId,
          decision: "ACCEPTED",
        }),
      });

      if (response.ok) {
        alert("승인되었습니다.");
        router.back();
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      alert(`알 수 없는 오류가 발생했습니다. (${error})`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (submitting) return;
    setSubmitting(true);
    try {
      const response = await fetch(`${API}/api/projects-application/decide`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicationId: applicationId,
          decision: "REJECTED",
        }),
      });

      if (response.ok) {
        alert("거절하였습니다.");
        router.back();
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      alert(`알 수 없는 오류가 발생했습니다. (${error})`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal>
      {applicationInfo && (
        <div className="flex flex-col justify-start gap-12">
          <div className="flex flex-row justify-start items-center gap-12">
            <Link
              href={`/users/${applicationInfo.applicantId}`}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                <Image
                  src={userImg}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover object-center"
                  alt="사용자"
                />
              </div>
              <span className="font-semibold text-xl group-hover:underline">
                {applicationInfo.applicantName}
              </span>
            </Link>

            <table className="border-spacing-5 border-separate">
              <tbody>
                <tr>
                  <th className="text-start">지원 분야</th>
                  <td>{applicationInfo.subCategoryName}</td>
                </tr>
                <tr>
                  <th className="text-start">나이</th>
                  <td>{applicationInfo.age}세</td>
                </tr>
                <tr>
                  <th className="text-start">성별</th>
                  <td>{applicationInfo.gender === "MALE" ? "남성" : "여성"}</td>
                </tr>
                <tr>
                  <th className="text-start">이메일</th>
                  <td>{applicationInfo.applicantEmail}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-xl font-semibold">지원 사유 및 자기소개</span>
            <p>{applicationInfo.motivation}</p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xl font-semibold">
              주당 투자 가능 시간 및 요일
            </span>
            <span>
              {`${applicationInfo.availableHoursPerWeek}시간 `}
              {applicationInfo.weekDay.map(
                (item, idx) =>
                  `${weekDayEngToKr(item)}${
                    applicationInfo.weekDay.length - 1 !== idx ? "," : ""
                  }`,
              )}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xl font-semibold">
              오프라인 참여 가능 여부
            </span>
            <span>
              {applicationInfo.offlineAvailable === true ? "가능" : "불가능"}
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <MainButton
              buttonName="승인하기"
              type="button"
              disabled={submitting}
              onClick={handleApprove}
            />
            <MainButton
              buttonName="거절하기"
              type="button"
              disabled={submitting}
              invertedColor={true}
              onClick={handleReject}
            />
          </div>
        </div>
      )}
    </Modal>
  );
}
