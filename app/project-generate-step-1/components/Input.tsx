export default function Input({
  title,
  placeholder,
  value,
  onChange,
}: {
  title: string;
  placeholder: string;
  value: string;
  onChange: (str: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <b>{title}</b>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className="rounded-xl py-3 px-5 box-border border border-mtm-light-gray focus:border-mtm-main-blue hover:border-mtm-main-blue outline-0"
      />
    </div>
  );
}
