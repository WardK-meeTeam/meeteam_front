import ChatSideBar from "@/app/(chat)/chat/components/ChatSidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-screen h-screen overflow-hidden ">
      <ChatSideBar />
      {children}
    </div>
  );
}
