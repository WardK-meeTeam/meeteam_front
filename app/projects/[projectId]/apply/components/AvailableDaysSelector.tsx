"use client";
import ToggleButton from "@/components/ToggleButton";

export default function AvailableDaysSelector({
  value,
  onChange,
}: {
  value: string[];
  onChange: (day: string[]) => void;
}) {
  const days = [
    {
      label: "월",
      eng: "MONDAY",
    },
    {
      label: "화",
      eng: "TUESDAY",
    },
    {
      label: "수",
      eng: "WEDNESDAY",
    },
    {
      label: "목",
      eng: "THURSDAY",
    },
    {
      label: "금",
      eng: "FRIDAY",
    },
    {
      label: "토",
      eng: "SATURDAY",
    },
    {
      label: "일",
      eng: "SUNDAY",
    },
  ];

  function handleClickButton(dayEng: string) {
    if (value.includes(dayEng)) {
      // 클릭했는데, 이미 선택이 되어있음
      const newDays = value.filter((item) => item !== dayEng);
      console.log(newDays);
      onChange(newDays);
    } else {
      // 새로 추가
      const newDays = [...value, dayEng];
      console.log(newDays);
      onChange(newDays);
    }
  }
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <b>주당 투자 가능 요일</b>
      <div className="flex justify-start gap-3 items-center w-full">
        {days.map((day) => (
          <ToggleButton
            key={day.eng}
            content={day.label}
            isDay={true}
            isSelected={value.includes(day.eng)}
            onClick={() => handleClickButton(day.eng)}
          />
        ))}
      </div>
    </div>
  );
}
