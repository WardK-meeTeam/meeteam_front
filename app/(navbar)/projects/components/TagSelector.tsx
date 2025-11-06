"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Option } from "@/constants/projectOptions";

interface TagGroup {
  title: string;
  options: Option[];
  paramsKey: string;
  multiSelect?: boolean; // 그룹별 다중선택 여부
  selectedVisible?: boolean; // 선택된 태그 표시 여부
}

interface TagSelectorProps {
  tagGroups: TagGroup[];
}

export default function TagSelector({ tagGroups }: TagSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 해당 그룹이 다중선택인지 확인
  const isGroupMultiSelect = (paramsKey: string): boolean => {
    const group = tagGroups.find(g => g.paramsKey === paramsKey);
    return group?.multiSelect ?? false;
  };
  
  // 모든 그룹에서 현재 선택된 값들 가져옴 (selectedVisible이 true인 그룹만)
  const getAllSelectedValues = () => {
    const selected: Array<{ value: string; paramsKey: string; label: string }> = [];
    
    tagGroups.forEach(group => {
      // selectedVisible이 false인 그룹은 선택된 태그를 표시하지 않음
      if (group.selectedVisible === false) return;
      
      const currentValue = searchParams.get(group.paramsKey);
      if (currentValue) {
        const values = group.multiSelect ? currentValue.split(',') : [currentValue];
        values.forEach(value => {
          const option = group.options.find(opt => opt.value === value);
          if (option && value !== "") {
            selected.push({ 
              value, 
              paramsKey: group.paramsKey, 
              label: option.label 
            });
          }
        });
      }
    });
    
    return selected;
  };

  const allSelectedValues = getAllSelectedValues();

  // 특정 그룹에서 선택된 값들 반환
  const getSelectedValuesForGroup = (paramsKey: string): string[] => {
    const currentValue = searchParams.get(paramsKey);
    if (!currentValue) return [];
    const isMulti = isGroupMultiSelect(paramsKey);
    return isMulti ? currentValue.split(',') : [currentValue];
  };

  // 선택 상태 토글
  const handleTagClick = (value: string, paramsKey: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const selectedValues = getSelectedValuesForGroup(paramsKey);
    const isMulti = isGroupMultiSelect(paramsKey);
    
    // 전체 선택 시  query string 삭제
    if (value === "") {
      params.delete(paramsKey);
      router.push(`?${params.toString()}`);
      return;
    }
    
    if (isMulti) {
      // 다중 선택
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value];
      
      if (newValues.length === 0) {
        params.delete(paramsKey);
      } else {
        params.set(paramsKey, newValues.filter(v => v !== "").join(','));
      }
    } else {
      // 단일 선택 로직
      if (selectedValues.includes(value)) {
        params.delete(paramsKey); // 이미 선택된 것을 다시 클릭하면 "전체"로 돌아감
      } else {
        params.set(paramsKey, value);
      }
    }
    
    router.push(`?${params.toString()}`);
  };

  // 선택된 태그 제거
  const removeTag = (value: string, paramsKey: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const selectedValues = getSelectedValuesForGroup(paramsKey);
    const isMulti = isGroupMultiSelect(paramsKey);
    
    if (isMulti) {
      const newValues = selectedValues.filter(v => v !== value);
      if (newValues.length === 0) {
        params.delete(paramsKey);
      } else {
        params.set(paramsKey, newValues.join(','));
      }
    } else {
      params.delete(paramsKey);
    }
    
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      {/* 그룹별 선택 가능 태그들 표시 */}
      {tagGroups.map((group) => (
        <div key={group.paramsKey} className="flex items-center mb-4">
          <h3 className="w-20 text-base font-bold text-black">{group.title}</h3>
          <div className="flex flex-wrap gap-2">
            {group.options.map((option) => {
              const selectedValues = getSelectedValuesForGroup(group.paramsKey);
              const isSelected = option.value === "" 
                ? selectedValues.length === 0 || selectedValues.includes("")
                : selectedValues.includes(option.value);
              
              return (
                <button
                  key={option.value}
                  onClick={() => handleTagClick(option.value, group.paramsKey)}
                  className={`mr-5 text-base font-medium cursor-pointer transition-colors duration-200 ease hover:text-black ${
                    isSelected
                      ? 'text-black'
                      : 'text-mtm-text-gray'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* 선택된 태그들 표시 */}
      {allSelectedValues.length > 0 && (
        <div className="mt-4 mb-4">
          <div className="flex flex-wrap gap-2">
            {allSelectedValues.map((selected) => (
              <div
                onClick={() => removeTag(selected.value, selected.paramsKey)}
                key={`${selected.paramsKey}-${selected.value}`}
                className="flex items-center px-3 py-1 mr-3 text-sm font-medium rounded-full border transition-opacity duration-200 ease-in-out cursor-pointer border-mtm-purple text-mtm-purple hover:opacity-50"
              >
                {selected.label}
                <span className="ml-1 cursor-pointer">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}