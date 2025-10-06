"use client";
import QuerySyncSelect from "@/app/(navbar)/projects/components/QuerySyncSelect";
import TagSelector from "../../projects/components/TagSelector";
import TechSearch from "../../projects/create/components/TechSearch";
import { Option } from "@/constants/projectOptions";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserFilterBarProps {
  bigCategoryOptions: Option[];
}

export default function UserFilterBar({ 
  bigCategoryOptions 
}: UserFilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [skills, setSkills] = useState<string[]>([]);
  
  // URL에서 초기 skills 값 가져오기
  useEffect(() => {
    const skillsParam = searchParams.get('skills');
    if (skillsParam) {
      setSkills(skillsParam.split(','));
    }
  }, [searchParams]);
  
  // skills 변경 시 URL 업데이트
  const handleSkillsChange = (newSkills: string[]) => {
    setSkills(newSkills);
    
    const params = new URLSearchParams(searchParams.toString());
    if (newSkills.length === 0) {
      params.delete('skills');
    } else {
      params.set('skills', newSkills.join(','));
    }
    router.push(`?${params.toString()}`);
  };
  
  return (
    <div className="flex flex-col gap-1 mb-10 w-2/3">
      <div className="flex-1">
        <TagSelector 
            tagGroups={[
              {
                title: "분야",
                options: bigCategoryOptions,
                paramsKey: "bigCategory",
                selectedVisible: false
              }
            ]}
        />
      </div>
      <div className="flex-1">
            <TechSearch
              title="기술스택"
              value={skills}
              onChange={handleSkillsChange}
            />
      </div>
    </div>
  );
}