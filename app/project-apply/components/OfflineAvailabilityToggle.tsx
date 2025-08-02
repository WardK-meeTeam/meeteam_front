"use client";

import ToggleButton from "@/components/ToggleButton";
import { useState } from "react";

export default function OfflineAvailabilityToggle() {
  const [canOffline, setCanOffline] = useState(true);
  function handleClickCanButton() {
    // 가능 버튼 클릭
    if (!canOffline) {
      // 현재 상태가 불가능일 때만 재렌더링
      setCanOffline((prev) => !prev);
    }
  }
  function handleClickCantButton() {
    // 불가능 버튼 클릭
    if (canOffline) {
      // 현재 상태가 가능일 때만 재렌더링
      setCanOffline((prev) => !prev);
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <b>오프라인 참여 가능 여부</b>
      <div className="flex gap-3">
        <ToggleButton
          content={"가능"}
          width={89}
          height={41}
          isSelected={canOffline}
          onClick={handleClickCanButton}
        />
        <ToggleButton
          content={"불가능"}
          width={101}
          height={41}
          isSelected={!canOffline}
          onClick={handleClickCantButton}
        />
      </div>
    </div>
  );
}
