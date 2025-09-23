"use client";
import Selectable from "@/components/Selectable";
function ProjectFilterBar() {
  return (
    <div>
      <Selectable 
        options={['hi','hihi']} 
        onChangeOption={() => {}} 
        variant="listControl" 
        placeholder="카테고리"/>
    </div>
  );
}
export default ProjectFilterBar;
