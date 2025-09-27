"use client";

import { useState, useEffect, useRef } from "react";
import TeamManagement from "./components/TeamManagement";
import RepositoryManagement from "./components/RepositoryManagement";
import DeleteProject from "./components/DeleteProject";
import ModifyProject from "./components/ModifyProject";

const tabs = [
  { name: "설정", component: ModifyProject },
  { name: "팀원 관리", component: TeamManagement },
  { name: "레포지토리 관리", component: RepositoryManagement },
  { name: "프로젝트 삭제", component: DeleteProject },
];

export default function ManageClient({ projectId }: { projectId: string }) {
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [gliderStyle, setGliderStyle] = useState({});
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeTabIndex = tabs.findIndex((tab) => tab.name === activeTab);
    const activeTabEl = tabsRef.current[activeTabIndex];
    if (activeTabEl) {
      setGliderStyle({
        left: activeTabEl.offsetLeft,
        width: activeTabEl.offsetWidth,
      });
    }
  }, [activeTab]);

  const ActiveComponent = tabs.find((tab) => tab.name === activeTab)?.component;

  return (
    <div className="w-xl mx-auto py-10">
      <div className="relative flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={tab.name}
            ref={(el) => (tabsRef.current[index] = el)}
            className={`px-4 py-2 text-lg font-medium z-10 transition-colors duration-300 ${
              activeTab === tab.name ? "text-blue-500" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
          </button>
        ))}
        <div
          className="absolute bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out"
          style={gliderStyle}
        />
      </div>
      <div className="py-10 min-h-[800px]">
        {ActiveComponent && <ActiveComponent projectId={projectId} />}
      </div>
    </div>
  );
}
