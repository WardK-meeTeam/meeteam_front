import ChatSideBar from "@/components/ChatSidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-7.5">
      <ChatSideBar />
      {children}
    </div>
  );
}
