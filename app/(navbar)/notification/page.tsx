"use client";

import { useEffect, useState } from "react";
import NotificationBox from "./components/NotificationBox";
import { Notification } from "@/types/notification";
import { authFetch } from "@/api/authFetch";

export default function Page() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_BASE_URL;
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("로그인이 필요합니다!");
      return;
    }

    const fetchNotifications = async () => {
      try {
        const response = await authFetch(`${API}/api/notifications`);

        if (response.ok) {
          const data = await response.json();
          setNotifications(data.result.content);
        } else {
          const errorData = await response.json();
          alert(errorData.message);
        }
      } catch (error) {
        alert(`알 수 없는 오류가 발생했습니다. (${error})`);
      }
    };

    fetchNotifications();
  }, []);
  return (
    <div className="flex flex-col gap-14 w-5xl mx-auto mt-10">
      <h1 className="text-4xl font-extrabold">알림</h1>
      <div className="flex flex-col gap-3 w-full">
        {notifications.map((noti) => (
          <NotificationBox key={noti.id} {...noti} />
        ))}
      </div>
    </div>
  );
}
