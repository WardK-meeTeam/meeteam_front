"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface NotificationToastProps {
  show: boolean;
  onClose: () => void;
  notifications: any[];
  duration?: number;
}

export function NotificationToast({
  show,
  onClose,
  notifications,
  duration = 10000,
}: NotificationToastProps) {
  const router = useRouter();

  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-96 bg-card bg-white border-mtm-light-gray rounded-xl shadow-lg z-50 animate-in slide-in-from-top-2 duration-300">
      <div className="p-3">
        <div className="flex justify-between items-center mb-2 px-2">
          <h3 className="text-lg font-semibold">알림</h3>
          {/* <button className="text-sm text-primary hover:underline">모두 읽음</button> */}
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifications.length > 0 ? (
            <ul className="">
              {notifications.map((item, idx) => (
                <li
                  key={idx}
                  className="p-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-primary/10">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground leading-relaxed break-words">
                        {item.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.date}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-2">
              <p className="text-muted-foreground">새로운 알림이 없습니다.</p>
            </div>
          )}
        </div>

        <div className="mt-2 text-center border-t border-border pt-2">
          <button
            onClick={() => {
              router.push("/notification");
              onClose();
            }}
            className="text-sm font-semibold text-primary hover:underline w-full py-1 cursor-pointer"
          >
            모든 알림 보기
          </button>
        </div>
      </div>
    </div>
  );
}
