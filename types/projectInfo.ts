export type ProjectCategory =
  | "ENVIRONMENT"
  | "PET"
  | "HEALTHCARE"
  | "EDUCATION"
  | "AI_TECH"
  | "FASHION_BEAUTY"
  | "FINANCE_PRODUCTIVITY"
  | "ETC";
export type Recruitment = "RECRUITING" | "CLOSED";
export type PlatformCategory = "IOS" | "ANDROID" | "WEB";
export type BigCategory = "기획" | "디자인" | "프론트엔드" | "백엔드" | "기타";
export type TechStack =
  | "ANSIBLE"
  | "AWS"
  | "DOCKER"
  | "ELASTICSEARCH"
  | "EXPRESS"
  | "GIT"
  | "GITHUB_ACTIONS"
  | "GRADLE"
  | "GRAFANA"
  | "GRAPHQL"
  | "GRPC"
  | "HIBERNATE"
  | "HTML_CSS"
  | "JAVA"
  | "JAVASCRIPT"
  | "JENKINS"
  | "JPA"
  | "JUNIT5"
  | "JWT"
  | "KAFKA"
  | "KIBANA"
  | "KOTLIN"
  | "KUBERNETES"
  | "LINUX"
  | "LOGSTASH"
  | "MAVEN"
  | "MICROMETER"
  | "MOCKITO"
  | "MONGODB"
  | "MYSQL"
  | "NEXT_JS"
  | "NGINX"
  | "NODE_JS"
  | "OAUTH2"
  | "OPENAPI_SWAGGER"
  | "POSTGRESQL"
  | "PROMETHEUS"
  | "PYTHON"
  | "QUERYDSL"
  | "RABBITMQ"
  | "REACT"
  | "REDIS"
  | "SPRING"
  | "SPRING_BOOT"
  | "SSE"
  | "TAILWIND_CSS"
  | "TERRAFORM"
  | "TYPESCRIPT"
  | "WEBFLUX"
  | "WEBSOCKET";

export interface ProjectSearchParams {
  projectCategory?: ProjectCategory;
  recruitment?: Recruitment;
  platformCategory?: PlatformCategory;
  bigCategory?: BigCategory;
  techStack?: TechStack;
  sort?: "createdAt,desc" | "createdAt,asc";
  page?: number;
}
/* /api/projects/condition */

// API 응답: 프로젝트 단일 아이템 타입
export interface ProjectListItem {
  projectId: number;
  projectCategory: ProjectCategory;
  platformCategory: PlatformCategory;
  projectImageUrl: string;
  projectSkills: string[];
  projectName: string;
  creatorName: string;
  likeCount: number;
  liked: boolean;
  currentCount: number;
  recruitmentCount: number;
  projectMembers: Member[];
  startDate: string;
  endDate: string;
}

// API 응답: 페이지네이션 정보 타입
export interface ProjectPageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

// API 응답: 전체 Response
export interface ProjectResponse {
  content: ProjectListItem[];
  pageable: ProjectPageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  first: boolean;
  empty: boolean;
}

export interface Member {
  memberId: number;
  name: string;
  imageUrl: string;
  creator: boolean;
}

export interface ProjectInfoItem {
  name: string;
  description: string;
  likeCount: number;
  platformCategory: string;
  projectCategory: string;
  imageUrl: string | null;
  startDate: string;
}

export interface RecruitStatus {
  bigCategory: string;
  subCategory: string;
  recruitmentCount: number;
  currentCount: number;
  closed: boolean;
}

export interface ProjectRecruitInfoItem {
  offlineRequired: boolean;
  endDate: string;
  skills: string[];
  recruitments: RecruitStatus[];
}

export interface ProjectDetails
  extends ProjectInfoItem,
    ProjectRecruitInfoItem {
  projectMembers: Member[];
}
