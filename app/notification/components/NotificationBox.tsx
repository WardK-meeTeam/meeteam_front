"use client";

import Image from "next/image";
import DotImg from "@/public/images/Ellipse.svg";
import Link from "next/link";

export interface Notification {
  title: string;
  description: string;
  time: string;
  buttonName?: string;
}

export default function NotificationBox({
  title,
  description,
  time,
  buttonName,
}: Notification) {
  return (
    <div className="flex flex-col gap-3 border border-mtm-light-gray p-8 rounded-lg w-full">
      <div className="flex flex-row items-center justify-start gap-1">
        <h1 className="text-xl font-bold">{title}</h1>
        <Image src={DotImg} width={2} height={2} alt="-" />
        <span>{time}</span>
      </div>

      <div className="flex flex-row justify-between">
        <span>{description}</span>
        {buttonName && (
          <Link
            href={"/application?applicationId=14&projectId=90"}
            className="cursor-pointer text-mtm-purple py-2 px-3 bg-mtm-light-purple
          rounded-lg"
          >
            {buttonName}
          </Link>
        )}
      </div>
    </div>
  );
}
