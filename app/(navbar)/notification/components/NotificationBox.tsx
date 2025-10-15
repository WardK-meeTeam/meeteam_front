"use client";

import Image from "next/image";
import DotImg from "@/public/images/Ellipse.svg";
import Link from "next/link";
import { Notification } from "@/types/notification";
import { formatNotification } from "@/utils/notificationFormatter";

export default function NotificationBox(notification: Notification) {
  const { applicationId, createdAt, payload, read, type } = notification;
  const { title, icon, content } = formatNotification(notification);

  return (
    <div className="flex flex-col gap-3 border border-mtm-light-gray p-8 rounded-lg w-full">
      <div className="flex flex-row items-center justify-start gap-1">
        <h1 className="text-xl font-bold">{title}</h1>
        <Image src={DotImg} width={2} height={2} alt="-" />
        <span>{createdAt}</span>
        {!read && <span className="h-2 w-2 bg-red-500 rounded-full"></span>}
      </div>

      <div className="flex flex-row justify-between">
        <span>
          {icon} {content}
        </span>
        {type === "PROJECT_APPLY" && (
          <Link
            href={`/application?applicationId=${applicationId}&projectId=${payload.projectId}`}
            className="cursor-pointer text-mtm-purple py-2 px-3 bg-mtm-light-purple
          rounded-lg"
          >
            지원서 보기
          </Link>
        )}
      </div>
    </div>
  );
}
