"use client";
import Selectable from "@/components/Selectable";
import TagSelector from "./TagSelector";
import { useRouter, useSearchParams } from "next/navigation";
import { Option } from "../page";

interface ProjectFilterBarProps {
  projectCategoryOptions: Option[];
  recruitmentOptions: Option[];
  platformOptions: Option[];
  bigCategoryOptions: Option[];
}

function ProjectFilterBar({ 
  projectCategoryOptions, 
  recruitmentOptions, 
  platformOptions, 
  bigCategoryOptions 
}: ProjectFilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // params 업데이트
  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === '') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`);
  };

  // options에서 label을 배열로 반환
  const getLabelsFromOptions = (options: Option[]) => {
    return options.map(opt => opt.label);
  };

  // options에서 value에 해당하는 label을 반환
  const getLabelFromValue = (options: Option[], currentValue: string | null) => {
    if (!currentValue) return options[0].label;
    const option = options.find(opt => opt.value === currentValue);
    return option ? option.label : options[0].label;
  };

  // 값 변경 시 호출된 함수 반환
  const handleOptionChange = (options: Option[], paramsKey: string) => (selectedLabel: string) => {
    const option = options.find(opt => opt.label === selectedLabel);
    if (option) {
      updateParams(paramsKey, option.value);
    }
  };

  return (
    <div>
      <div className="flex gap-3 mb-6 w-sm">
        <Selectable 
          options={getLabelsFromOptions(projectCategoryOptions)}
          value={getLabelFromValue(projectCategoryOptions, searchParams.get('projectCategory'))}
          onChangeOption={handleOptionChange(projectCategoryOptions, 'projectCategory')} 
          variant="listControl" 
          placeholder="카테고리"
        />

        <Selectable 
          options={getLabelsFromOptions(recruitmentOptions)}
          value={getLabelFromValue(recruitmentOptions, searchParams.get('recruitment'))}
          onChangeOption={handleOptionChange(recruitmentOptions, 'recruitment')} 
          variant="listControl" 
          placeholder="모집상태"
        />
      </div>
      
      <div className="mb-10">
        <TagSelector 
          tagGroups={[
            {
              title: "플랫폼",
              options: platformOptions,
              paramsKey: "platformCategory"
            },
            {
              title: "분야",
              options: bigCategoryOptions,
              paramsKey: "bigCategory"
            }
          ]}
        />
      </div>
    </div>
  );
}

export default ProjectFilterBar;