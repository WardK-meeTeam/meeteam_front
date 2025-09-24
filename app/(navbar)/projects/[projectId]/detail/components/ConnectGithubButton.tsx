"use client";
import { useState } from "react";

export default function HalfPopupButton() {
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

    // 1) 기본 이동을 막고 (버튼/클릭 핸들러에서만 호출)
    // 2) 현재 탭은 절대 이동시키지 않음 (fallback 제거)
    const win = window.open(url, "_blank", features);

    if (!win) {
      // 팝업 차단됨: 현재 탭 이동 금지! UI로만 안내
      setBlocked(true);
      return;
    }

    // 안전: 부모 참조 제거 (일부 브라우저는 noopener 무시할 수 있어 수동 차단)
    try {
      (win as any).opener = null;
    } catch {}
  };

  return (
    <div className="space-y-2">
      <a
        href="https://github.com/apps/meeteam-pr-review/installations/select_target"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          openHalfWindow(
            "https://github.com/apps/meeteam-pr-review/installations/select_target",
          );
        }}
        className="text-xs flex justify-center items-center"
      >
        내 레포지토리에 미팀 설치 {">"}
      </a>
    </div>
  );
}
