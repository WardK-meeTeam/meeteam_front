"use client";

import { useState } from "react";

export default function ConnectRepo({ projectId }: { projectId: string }) {
  const [url, setUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const API = process.env.NEXT_PUBLIC_API_BASE_URL;
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        alert("로그인이 필요합니다!");
        return;
      }

      console.log(projectId);

      const response = await fetch(`${API}/api/projects/${projectId}/repos`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repoUrls: [url] }),
      });

      if (response.ok) {
        const data = await response.json().catch(() => null);
        console.log("성공", data);
      } else {
        const errorData = await response.json().catch(() => null);
        alert(errorData.message);
      }
    } catch (error) {
      alert(`알 수 없는 오류가 발생했습니다. (${error})`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border"
      />
      <button type="submit" className="cursor-pointer">
        레포 연결
      </button>
    </form>
  );
}
