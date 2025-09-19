export function weekDayEngToKr(day: string) {
  switch (day) {
    case "MONDAY":
      return "월";
    case "TUESDAY":
      return "화";
    case "WEDNESDAY":
      return "수";
    case "THURSDAY":
      return "목";
    case "FRIDAY":
      return "금";
    case "SATURDAY":
      return "토";
    case "SUNDAY":
      return "일";
    default:
      break;
  }
}
