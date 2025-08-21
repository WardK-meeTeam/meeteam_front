export default function TechSearch() {
  const options = ["굿"];
  const open = true;
  return (
    <div className="flex flex-col gap-4">
      <b>필요 기술 스택</b>
      <div>
        <input
          placeholder="기술 스택을 검색해주세요"
          className="w-full rounded-xl py-3 px-5 box-border border border-main outline-0"
        />
        {open && (
          <ul
            className="
          w-full
            relative left-0 top-0
            max-h-48 overflow-auto
            rounded-xl border-none bg-white shadow-[0_4px_22px_rgba(0,0,0,0.15)]
            p-1 z-50

          "
          >
            {/* 여기 키도 수정 한번 해야함 */}
            {options.map((item) => (
              <li
                key={`나중에 키 수정해주세요 - ${item}`}
                value={item}
                className="px-3 py-2 rounded-lg cursor-pointer hover:bg-[#F4F9FF]"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
