"use client";

import Image from "next/image";
import DotImg from "@/public/images/Ellipse.svg";
import Link from "next/link";
import { Notification } from "@/types/notification";

export default function NotificationBox({
  applicationId,
  createdAt,
  message,
  payload,
  read,
  type,
}: Notification) {
  return (
    <div className="flex flex-col gap-3 border border-mtm-light-gray p-8 rounded-lg w-full">
      <div className="flex flex-row items-center justify-start gap-1">
        <h1 className="text-xl font-bold">{payload.projectName}</h1>
        <Image src={DotImg} width={2} height={2} alt="-" />
        <span>{createdAt}</span>
        {!read && <span className="h-2 w-2 bg-red-500 rounded-full"></span>}
      </div>

      <div className="flex flex-row justify-between">
        <span>
          {type === "PROJECT_MY_APPLY"
            ? "✉️ "
            : type === "PROJECT_APPLY"
              ? "🙋‍♂️ "
              : " "}
          {message}
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
