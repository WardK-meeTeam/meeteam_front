export default function Input({
  title,
  placeholder,
}: {
  title: string;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <b>{title}</b>
      <input
        placeholder={placeholder}
        className="rounded-xl py-3 px-5 box-border border border-mtm-light-gray focus:border-mtm-main-blue hover:border-mtm-main-blue outline-0"
      />
    </div>
  );
}
