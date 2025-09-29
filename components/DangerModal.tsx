import { Dispatch, SetStateAction } from "react";
import Modal from "./Modal";

interface DangerModalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onChangeOpen: Dispatch<SetStateAction<boolean>>;
  disabled?: boolean;
  onClickButton?: () => void;
}

export default function DangerModal({
  isOpen = false,
  onChangeOpen,
  disabled = false,
  onClickButton = () => {},
  title,
  description,
}: DangerModalProps) {
  return (
    <>
      {isOpen && (
        <Modal>
          <div className="flex flex-col justify-start items-center gap-4 max-w-2xs mx-auto">
            <h3 className="font-medium">{title ?? ""}</h3>
            <h4 className="text-xs">{description}</h4>
            <input
              placeholder="삭제하기"
              className="w-full py-3 px-5 rounded-xl text-[14px]"
            />
            <div className="flex flex-col justify-end gap-4 mt-4">
              <button
                onClick={() => onChangeOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                취소
              </button>
              <button
                onClick={onClickButton}
                disabled={disabled}
                className="px-4 py-2 bg-red-500 text-white rounded-md disabled:bg-gray-400"
              >
                {disabled ? "삭제 중..." : "삭제"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
