"use client";

import { useEffect } from "react";

export default function CallbackPage() {
  useEffect(() => {
    window.close();
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-800">
          미팀 봇 연결이 완료되었습니다.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          이 창은 자동으로 닫힙니다. 닫히지 않으면 직접 닫아주세요.
        </p>
      </div>
    </div>
  );
}
