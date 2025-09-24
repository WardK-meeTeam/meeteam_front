import QuerySyncSelect from "@/app/(navbar)/projects/components/QuerySyncSelect";
import TagSelector from "./TagSelector";
import { Option } from "@/constants/projectOption";

interface ProjectFilterBarProps {
  projectCategoryOptions: Option[];
  recruitmentOptions: Option[];
  platformOptions: Option[];
  bigCategoryOptions: Option[];
}

export default function ProjectFilterBar({ 
  projectCategoryOptions, 
  recruitmentOptions, 
  platformOptions, 
  bigCategoryOptions 
}: ProjectFilterBarProps) {
  return (
    <div>
      <div className="flex gap-3 mb-6 w-sm">
        <QuerySyncSelect
          options={projectCategoryOptions}
          paramKey="projectCategory"
          placeholder="카테고리"
        />

        <QuerySyncSelect
          options={recruitmentOptions}
          paramKey="recruitment"
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