"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "./Modal";

interface DangerModalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onChangeOpen: Dispatch<SetStateAction<boolean>>;
  onClickButton?: () => void;
  isLoading?: boolean;
  cancelText: string;
}

export default function DangerModal({
  isOpen = false,
  onChangeOpen,
  onClickButton = () => {},
  title,
  description,
  isLoading = false,
  cancelText,
}: DangerModalProps) {
  const [text, setText] = useState("");
  const [correctInput, setCorrectInput] = useState(false);

  useEffect(() => {
    if (text.trim() === "삭제하기") setCorrectInput(true);
    else setCorrectInput(false);
  }, [text]);

  // 열고 닫을 때 text 상태 초기화
  useEffect(() => {
    if (!isOpen) {
      setText("");
      setCorrectInput(false);
    }
  }, [isOpen]);
  return (
    <>
      {isOpen && (
        <Modal>
          <div className="flex flex-col justify-start items-center gap-4 min-w-2xs mx-auto">
            <div className="flex flex-col justify-start items-center">
              <h3 className="font-medium">{title ?? ""}</h3>
              <h4 className="text-xs">{description}</h4>
            </div>
            <input
              placeholder="삭제하기"
              className="w-full py-3 px-5 rounded-xl text-[14px] border border-mtm-light-gray"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex flex-col justify-start gap-4 w-full">
              <span
                onClick={() => onChangeOpen(false)}
                className="underline cursor-pointer self-center"
              >
                {cancelText}
              </span>
              <button
                onClick={onClickButton}
                disabled={!correctInput || isLoading}
                type="button"
                className={`px-4 py-2 bg-mtm-main-red text-white rounded-md disabled:bg-gray-400
                  ${!correctInput || isLoading ? "" : "cursor-pointer"}
                  `}
              >
                {isLoading ? "삭제 중..." : "삭제하기"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
