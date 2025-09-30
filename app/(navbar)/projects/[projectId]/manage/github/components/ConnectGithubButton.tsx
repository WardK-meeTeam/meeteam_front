"use client";
import { useState } from "react";
import { siGithub } from "simple-icons/icons";

export default function ConnectGithubButton() {
  const [blocked, setBlocked] = useState(false);

  const openHalfWindow = (url: string) => {
    const w = Math.max(400, Math.floor(window.innerWidth / 1.5));
    const h = Math.max(300, Math.floor(window.innerHeight / 1.5));

    const screenX =
      typeof window.screenX !== "undefined"
        ? window.screenX
        : (window as any).screenLeft || 0;
    const screenY =
      typeof window.screenY !== "undefined"
        ? window.screenY
        : (window as any).screenTop || 0;
    const outerW =
      typeof window.outerWidth !== "undefined"
        ? window.outerWidth
        : window.innerWidth;
    const outerH =
      typeof window.outerHeight !== "undefined"
        ? window.outerHeight
        : window.innerHeight;

    const left = Math.max(0, screenX + Math.floor((outerW - w) / 2));
    const top = Math.max(0, screenY + Math.floor((outerH - h) / 2));

    const features = [
      `width=${w}`,
      `height=${h}`,
      `left=${left}`,
      `top=${top}`,
      "resizable=yes",
      "scrollbars=yes",
      "noopener=yes",
      "noreferrer=yes",
    ].join(",");

    const win = window.open(url, "_blank", features);

    if (!win) {
      setBlocked(true);
      return;
    }
    setBlocked(false);

    try {
      (win as any).opener = null;
    } catch {}
  };

  return (
    <div className="space-y-2 w-full">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          openHalfWindow(
            "https://github.com/apps/meeteam-pr-review/installations/select_target",
          );
        }}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-black bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
        >
          <title>{siGithub.title}</title>
          <path d={siGithub.path} />
        </svg>
        Github 연결하기
      </button>
      {blocked && <p className="text-xs text-red-500"></p>}
    </div>
  );
}
