import { ReactNode } from "react";

export default function KeyValueRow({
  title,
  value,
}: {
  title: string;
  value: ReactNode;
}) {
  return (
    <div className="flex flex-row gap-x-16 text-black justify-start items-baseline">
      <span className="min-w-48 font-bold text-xl">{title}</span>
      <div className="flex-1 ">{value} </div>
    </div>
  );
}
