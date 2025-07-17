import { ChatType } from "@/types/chat";

// 임시 채팅 내역
export const chatData: ChatType[] = [
  {
    chatId: "1",
    title: "리팩토링",
    description: "handleSubmit 함수 분리",
    unread: true,
    messages: [
      {
        role: "ai",
        content:
          "handleSubmit 함수를 submitForm()으로 분리하셨네요. 어떤 이유인가요?",
        timestamp: "24.10.26. 오전 9:25",
      },
      {
        role: "user",
        content:
          "로직이 길어져서 가독성과 재사용성을 위해 함수로 분리했습니다.",
        timestamp: "24.10.26. 오전 9:26",
      },
      {
        role: "ai",
        content: "해당 함수를 다른 곳에서도 재사용하실 계획인가요?",
        timestamp: "24.10.26. 오전 9:27",
      },
      {
        role: "user",
        content:
          "회원가입 폼에서도 동일한 제출 로직을 활용할 수 있도록 했어요.",
        timestamp: "24.10.26. 오전 9:28",
      },
      {
        role: "ai",
        content: "함수명을 handleFormSubmit으로 바꾸신 것도 같은 맥락인가요?",
        timestamp: "24.10.26. 오전 9:29",
      },
      {
        role: "user",
        content: "네, 더 보편적인 이름이 적절하다고 생각했습니다.",
        timestamp: "24.10.26. 오전 9:30",
      },
      {
        role: "ai",
        content: "테스트 코드에도 변경이 반영된 걸로 보여요. 맞을까요?",
        timestamp: "24.10.26. 오전 9:31",
      },
      {
        role: "user",
        content: "맞습니다. 기존 테스트 시나리오와 맞게 리팩토링했어요.",
        timestamp: "24.10.26. 오전 9:32",
      },
      {
        role: "ai",
        content: "커밋 메시지에 변경 이유도 명시해두셨나요?",
        timestamp: "24.10.26. 오전 9:33",
      },
      {
        role: "user",
        content:
          "네, `refactor: handleSubmit 함수 분리 및 테스트 정비`로 작성했습니다.",
        timestamp: "24.10.26. 오전 9:34",
      },
    ],
  },
  {
    chatId: "2",
    title: "버그 수정",
    description: "로그인 시 리다이렉트 문제 해결",
    unread: false,
    messages: [
      {
        role: "ai",
        content:
          "로그인 후 리다이렉트 처리를 수정하신 걸로 보여요. 이유가 있을까요?",
        timestamp: "24.10.24. 오후 3:12",
      },
      {
        role: "user",
        content:
          "로그인 후 메인 페이지로 가지 않고 멈추는 문제가 있어서 수정했습니다.",
        timestamp: "24.10.24. 오후 3:13",
      },
      {
        role: "ai",
        content: "라우팅 조건을 다시 추가하신 것 같네요. 어떤 조건인가요?",
        timestamp: "24.10.24. 오후 3:14",
      },
      {
        role: "user",
        content:
          "로그인 여부와 사용자 권한에 따라 리다이렉트 경로를 분기했어요.",
        timestamp: "24.10.24. 오후 3:15",
      },
      {
        role: "ai",
        content: "관리자 사용자는 `/admin`으로 이동하도록 하신 이유는?",
        timestamp: "24.10.24. 오후 3:16",
      },
      {
        role: "user",
        content: "관리자 전용 대시보드가 있어서 권한에 맞게 분기처리했습니다.",
        timestamp: "24.10.24. 오후 3:17",
      },
      {
        role: "ai",
        content: "테스트까지 모두 마치신 걸로 보입니다. 맞을까요?",
        timestamp: "24.10.24. 오후 3:18",
      },
      {
        role: "user",
        content: "넵, 로그인/로그아웃 시나리오 모두 테스트 완료했습니다.",
        timestamp: "24.10.24. 오후 3:19",
      },
      {
        role: "ai",
        content: "그럼 이제 머지만 남은 상황인가요?",
        timestamp: "24.10.24. 오후 3:20",
      },
      {
        role: "user",
        content: "네, 바로 병합하도록 하겠습니다.",
        timestamp: "24.10.24. 오후 3:21",
      },
    ],
  },
  {
    chatId: "3",
    title: "UI 개선",
    description: "버튼 색상 변경",
    unread: false,
    messages: [
      {
        role: "ai",
        content:
          "버튼의 배경색을 #6BB4FF로 변경하셨네요. 특별한 이유가 있나요?",
        timestamp: "24.10.22. 오후 1:10",
      },
      {
        role: "user",
        content: "기존 색상이 너무 튀어서 더 부드러운 톤으로 조정했습니다.",
        timestamp: "24.10.22. 오후 1:11",
      },
      {
        role: "ai",
        content: "파란색 계열을 선택하신 건 어떤 기준이었나요?",
        timestamp: "24.10.22. 오후 1:12",
      },
      {
        role: "user",
        content: "전체 테마 컬러와 잘 어울리는 색으로 선택했습니다.",
        timestamp: "24.10.22. 오후 1:13",
      },
      {
        role: "ai",
        content: "hover 시 색상도 #539fe8로 바꾸셨던데, 이유가 있나요?",
        timestamp: "24.10.22. 오후 1:14",
      },
      {
        role: "user",
        content:
          "버튼에 인터랙션을 주기 위해 hover 색상을 살짝 어둡게 설정했어요.",
        timestamp: "24.10.22. 오후 1:15",
      },
      {
        role: "ai",
        content: "텍스트 컬러는 그대로 흰색을 유지하신 거죠?",
        timestamp: "24.10.22. 오후 1:16",
      },
      {
        role: "user",
        content: "네, 가독성을 고려해서 white로 유지했습니다.",
        timestamp: "24.10.22. 오후 1:17",
      },
      {
        role: "ai",
        content: "모바일에서도 UI가 잘 보이도록 대응하셨나요?",
        timestamp: "24.10.22. 오후 1:18",
      },
      {
        role: "user",
        content: "Tailwind 반응형 유틸리티로 대응 완료했습니다.",
        timestamp: "24.10.22. 오후 1:19",
      },
    ],
  },
  {
    chatId: "4",
    title: "기능 추가",
    description: "다운로드 토글 기능 구현",
    unread: false,
    messages: [
      {
        role: "ai",
        content: "다운로드 버튼에 토글 기능을 추가하셨네요. 어떤 목적이신가요?",
        timestamp: "24.10.20. 오전 10:00",
      },
      {
        role: "user",
        content: "사용자가 다운로드 여부를 직접 설정할 수 있도록 했습니다.",
        timestamp: "24.10.20. 오전 10:01",
      },
      {
        role: "ai",
        content: "기본 상태는 비활성화로 설정하신 이유는 무엇인가요?",
        timestamp: "24.10.20. 오전 10:02",
      },
      {
        role: "user",
        content: "초기에는 의도치 않게 다운로드되는 걸 방지하고자 했습니다.",
        timestamp: "24.10.20. 오전 10:03",
      },
      {
        role: "ai",
        content: "토글 상태를 localStorage에 저장하셨던데, 이유가 있나요?",
        timestamp: "24.10.20. 오전 10:04",
      },
      {
        role: "user",
        content: "새로고침해도 설정이 유지되도록 하기 위함입니다.",
        timestamp: "24.10.20. 오전 10:05",
      },
      {
        role: "ai",
        content: "토글 변경 시 API 호출도 연결하신 걸로 보이네요?",
        timestamp: "24.10.20. 오전 10:06",
      },
      {
        role: "user",
        content: "네, 변경 이벤트에 따라 서버 상태도 동기화하고 있습니다.",
        timestamp: "24.10.20. 오전 10:07",
      },
      {
        role: "ai",
        content: "UI 구성은 사용자 친화적으로 처리되었을까요?",
        timestamp: "24.10.20. 오전 10:08",
      },
      {
        role: "user",
        content: "간결한 스위치 디자인과 레이블로 UX를 개선했습니다.",
        timestamp: "24.10.20. 오전 10:09",
      },
    ],
  },
  {
    chatId: "5",
    title: "test",
    description: "스크롤 테스트1",
    unread: false,
    messages: [],
  },
  {
    chatId: "6",
    title: "test",
    description: "다운로드 토글 기능 구현",
    unread: false,
    messages: [],
  },
  {
    chatId: "7",
    title: "test",
    description: "다운로드 토글 기능 구현",
    unread: false,
    messages: [],
  },
  {
    chatId: "8",
    title: "test",
    description: "다운로드 토글 기능 구현",
    unread: false,
    messages: [],
  },
  {
    chatId: "9",
    title: "test",
    description: "다운로드 토글 기능 구현",
    unread: false,
    messages: [],
  },
  {
    chatId: "10",
    title: "test",
    description: "다운로드 토글 기능 구현",
    unread: false,
    messages: [],
  },
  {
    chatId: "11",
    title: "test",
    description: "다운로드 토글 기능 구현",
    unread: false,
    messages: [],
  },
  {
    chatId: "12",
    title: "test",
    description: "다운로드 토글 기능 구현",
    unread: false,
    messages: [],
  },
  {
    chatId: "13",
    title: "test",
    description: "다운로드 토글 기능 구현",
    unread: false,
    messages: [],
  },
  {
    chatId: "14",
    title: "test",
    description: "다운로드 토글 기능 구현",
    unread: false,
    messages: [],
  },
  {
    chatId: "15",
    title: "test",
    description: "다운로드 토글 기능 구현",
    unread: false,
    messages: [],
  },
  {
    chatId: "16",
    title: "test",
    description: "다운로드 토글 기능 구현",
    unread: false,
    messages: [],
  },
];
