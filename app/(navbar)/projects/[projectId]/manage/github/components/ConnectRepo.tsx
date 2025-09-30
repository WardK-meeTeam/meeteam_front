"use client";

import { useState } from "react";
import { siGithub } from "simple-icons/icons";
import { authFetch } from "@/api/authFetch";

export default function ConnectRepo({ projectId }: { projectId: string }) {
  const [url, setUrl] = useState("");
  const [connectedRepo, setConnectedRepo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await authFetch(`/api/projects/${projectId}/repos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repoUrls: [url] }),
      });

      if (response.ok) {
        setConnectedRepo(url);
        setUrl("");
      } else {
        const errorData = await response.json().catch(() => null);
        alert(errorData?.message || "Failed to connect repository");
      }
    } catch (error) {
      alert(`An unknown error occurred. (${error})`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDisconnect = async () => {
    // Implement disconnect logic here if needed
    setConnectedRepo(null);
  };

  if (connectedRepo) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <title>{siGithub.title}</title>
            <path d={siGithub.path} />
          </svg>
          <a
            href={connectedRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            {connectedRepo}
          </a>
        </div>
        <button
          onClick={handleDisconnect}
          className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex justify-start items-center gap-2"
    >
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://github.com/my_repo"
        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mtm-main-blue"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-gray-400"
      >
        {isSubmitting ? "연결중..." : "레포지토리 연결"}
      </button>
    </form>
  );
}
