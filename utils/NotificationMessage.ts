import { ToastNotification } from "@/components/NotificationToast";

export default function NotificationMessage(note: ToastNotification) {
  switch (note.type) {
    case "PROJECT_MY_APPLY":
      return `✍️ ${note.projectName}에 지원이 완료되었습니다!`;
    case "PROJECT_APPLY":
      return `🙋‍♂️ ${note.applicantName}님이 ${note.projectName}에 지원했어요!`;
    case "PROJECT_APPROVE":
      return `✅ 프로젝트 지원이 승인되었습니다.`;
    case "PROJECT_REJECT":
      return `❌ 프로젝트 지원이 거절되었습니다.`;
  }

  return "일치하는 알림 없음";
}
