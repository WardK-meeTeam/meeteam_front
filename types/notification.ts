// 알림 페이지에서 사용할 알림 타입

export type NotificationType =
  | "PROJECT_MY_APPLY"
  | "PROJECT_APPLY"
  | "PROJECT_APPROVE"
  | "PROJECT_REJECT";

export interface Notification {
  id: number;
  type: NotificationType;
  message: string;
  applicationId: number;
  createdAt: string;
  payload: {
    projectId: number;
    projectName: string;
    receiverId: number;
    receiverName: string;
  };
  read: boolean;
}

// SSE를 활용한 알림을 위한 타입

export interface ProjectApplyNotification {
  applicantId: number;
  applicantName: string;
  applicationId: number;
  date: string;
  message: string;
  projectId: number;
  projectName: string;
  receiverId: number;
}

export interface ProjectMyApplyNotification {
  localDate: string;
  message: string;
  projectName: string;
  receiverId: number;
}

export interface ProjectApplyDecision {
  receiverId: number;
  projectId: number;
  approvalResult: "APPROVED" | "REJECTED";
  message: string;
  date: string;
}
