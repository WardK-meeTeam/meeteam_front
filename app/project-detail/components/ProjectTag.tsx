export default function ProjectCategoryIcon({
  category,
  isPlatform,
}: {
  category: string;
  isPlatform: boolean;
}) {
  return (
    <div
      className={`py-2 px-4 rounded-full
    ${isPlatform ? "bg-mtm-light-blue text-mtm-main-blue" : "bg-mtm-light-purple text-mtm-purple"}
     text-[14px] font-semibold`}
    >
      {category}
    </div>
  );
}
