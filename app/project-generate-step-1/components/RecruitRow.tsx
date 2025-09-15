"use client";
import { userFieldItem } from "@/store/signupDataStore";
import FieldSelector from "./FieldSelector";
import { recruitFieldItem } from "@/store/projectGenerateStore";

interface RecruitRowProps {
  value: recruitFieldItem | userFieldItem;
  onChange: {
    (payload: recruitFieldItem): void;
    (payload: userFieldItem): void;
  };
}

export default function RecruitRow({ value, onChange }: RecruitRowProps) {
  // 회원가입 후 설정페이지에서 사용되는지 아닌지 확인용
  // numOfPeople이 있으면 프로젝트 생성 페이지에서 사용되는 것임
  const isIncludeNumOfPeople: boolean = "numOfPeople" in value;

  const handleFieldChange = (newField: string | null) => {
    onChange({ ...value, field: newField });
  };

  let handleNumberChange: ((newNumber: number) => void) | undefined;
  let onClickButton:
    | ((e: React.MouseEvent<HTMLButtonElement>) => void)
    | undefined;

  if (isIncludeNumOfPeople) {
    handleNumberChange = (newNumber: number) => {
      if (newNumber >= 1 && newNumber <= 9) {
        onChange({ ...(value as recruitFieldItem), numOfPeople: newNumber });
      }
    };

    onClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
      const operation = e.currentTarget.value;
      if (operation === "+") {
        handleNumberChange!((value as recruitFieldItem).numOfPeople + 1);
      } else if (operation === "-") {
        handleNumberChange!((value as recruitFieldItem).numOfPeople - 1);
      }
    };
  }

  return (
    <div className="w-full flex flex-row flex-1 gap-2 items-center">
      <FieldSelector value={value.field} onChange={handleFieldChange} />
      {isIncludeNumOfPeople && (
        <div className="flex items-center">
          <button
            type="button"
            className="w-[40px] h-[40px] box-border flex justify-center items-center cursor-pointer"
            onClick={onClickButton}
            value="-"
            disabled={(value as recruitFieldItem).numOfPeople <= 1}
          >
            -
          </button>
          <span className="text-mtm-main-blue">
            {(value as recruitFieldItem).numOfPeople}
          </span>
          <button
            type="button"
            className="w-[40px] h-[40px] box-border border-l-0 flex justify-center items-center cursor-pointer"
            onClick={onClickButton}
            value="+"
            disabled={(value as recruitFieldItem).numOfPeople >= 9}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
