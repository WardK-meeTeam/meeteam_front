// 알림 페이지에서 사용할 알림 타입

export type NotificationType =
  | "PROJECT_MY_APPLY"
  | "PROJECT_APPLY"
  | "PROJECT_APPROVE"
  | "PROJECT_REJECT"
  | "PROjECT_END";

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
  type: "PROJECT_APPLY";
  applicantId: number;
  applicantName: string;
  applicationId: number;
  date: string;
  projectId: number;
  projectName: string;
  receiverId: number;
}

export interface ProjectMyApplyNotification {
  type: "PROJECT_MY_APPLY";
  localDate: string;
  projectName: string;
  receiverId: number;
}

export interface ProjectApplyDecision {
  type: "PROJECT_REJECT" | "PROJECT_APPROVE";
  receiverId: number;
  projectId: number;
  approvalResult: "ACCEPTED" | "REJECTED";
  date: string;
}

export interface ProjectEndNotification {
  type: "PROJECT_END";
  projectId: number;
  memberId: number;
  projectName: string;
  occurredAt: string;
}
