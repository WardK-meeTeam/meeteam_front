export default function ProjectCategoryIcon({
  category,
}: {
  category: string;
}) {
  return (
    <div className="py-2 px-4 rounded-full bg-mtm-light-blue text-mtm-main-blue text-[14px]">
      {category}
    </div>
  );
}
