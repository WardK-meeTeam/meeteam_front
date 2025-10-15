import { Notification } from "@/types/notification";

interface FormattedNotification {
  title: string;
  content: string;
  icon: string;
}

export function formatNotification(
  notification: Notification,
): FormattedNotification {
  const { type, payload } = notification;

  switch (type) {
    case "PROJECT_MY_APPLY":
      return {
        title: "지원 완료",
        content: `${payload.projectName}에 지원했습니다.`,
        icon: "✉️",
      };
    case "PROJECT_APPLY":
      return {
        title: "새로운 지원",
        content: `${payload.projectName}에 새로운 지원이 있습니다.`,
        icon: "🙋‍♂️",
      };
    case "PROJECT_APPROVE":
      return {
        title: "지원 승인",
        content: `${payload.projectName} 프로젝트 지원이 수락되었습니다.`,
        icon: "✅",
      };
    case "PROJECT_REJECT":
      return {
        title: "지원 거절",
        content: `${payload.projectName} 프로젝트 지원이 거절되었습니다.`,
        icon: "❌",
      };
    case "PROjECT_END":
      return {
        title: "프로젝트 종료",
        content: `${payload.projectName} 프로젝트가 종료되었습니다.`,
        icon: "🏁",
      };
    default:
      return {
        title: "새로운 알림",
        content: "새로운 알림이 도착했습니다.",
        icon: "🔔",
      };
  }
}
