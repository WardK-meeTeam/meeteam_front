import Selectable from "@/components/Selectable";
const options = [
  { Major: "기획", Sub: ["기획 굿", "기획 굿2"] },
  { Major: "디자인", Sub: ["기획 굿", "기획 굿2"] },
  { Major: "프론트엔드", Sub: ["기획 굿", "기획 굿2"] },
  { Major: "백엔드", Sub: ["기획 굿", "기획 굿2"] },
  { Major: "기타", Sub: ["기획 굿", "기획 굿2"] },
];
const subOptions = [];
export default function FieldSelector() {
  return (
    <div className="w-full flex flex-1 flex-row gap-2">
      <Selectable options={options} />
      <Selectable options={options} disabled={true} />
    </div>
  );
}
