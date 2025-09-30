// 추천 질문 카드 컴포넌트
export default function SuggestionCard({
  title,
  description,
  onClick = () => {},
}: {
  title: string;
  description: string;
  onClick?: () => void;
}) {
  return (
    <div
      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer w-72
    transition-all duration-200 ease-in-out"
      onClick={onClick}
    >
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
