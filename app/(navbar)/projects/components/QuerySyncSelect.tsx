"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Selectable from "@/components/Selectable";

interface Option {
  value: string;
  label: string;
}

interface QuerySyncSelectProps {
  options: Option[];
  paramKey: string;
  placeholder?: string;
  variant?: "default" | "listControl";
}

export default function QuerySyncSelect({ 
  options, 
  paramKey,
  placeholder,
}: QuerySyncSelectProps) {
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
  const handleOptionChange = (selectedLabel: string) => {
    const option = options.find(opt => opt.label === selectedLabel);
    if (option) {
      updateParams(paramKey, option.value);
    }
  };

  return (
    <Selectable 
      options={getLabelsFromOptions(options)}
      value={getLabelFromValue(options, searchParams.get(paramKey))}
      onChangeOption={handleOptionChange}
      placeholder={placeholder}
      variant="listControl"
    />
  );
}