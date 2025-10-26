import { authFetch } from "./authFetch";

export interface UserProfile {
  memberId: number;
  realName: string;
  storeFileName: string;
  temperature: number;
  projectCount: number;
  skillList: string[];
}
export interface UserListResponse {
  result?: UserProfile[];
  totalElements?: number;
  projectCount?: number;
  last?: boolean;
}

interface FetchUsersParams {
  searchParams: { [key: string]: string | string[] | undefined };
  page?: number;
  limit?: number;
}

export const fetchUsers = async ({ searchParams, page = 0, limit = 20 }: FetchUsersParams): Promise<UserListResponse> => {
  // 프론트엔드 쉼표 구분 방식을 백엔드 다중 파라미터 방식으로 변환
  const skills = typeof searchParams.skills === 'string' 
    ? searchParams.skills.split(',') 
    : [];
    
  const bigCategories = typeof searchParams.bigCategory === 'string' 
    ? searchParams.bigCategory.split(',') 
    : [];

  // 정렬 파라미터 처리
  const sortParam = typeof searchParams.sort === 'string' 
    ? searchParams.sort 
    : 'temperature,desc'; // 기본값

  // API 요청용 URLSearchParams 생성 (백엔드 형식)
  const apiParams = new URLSearchParams();
  
  // 페이징 파라미터
  apiParams.set('page', page.toString());
  apiParams.set('size', '20');
  
  // 정렬 파라미터
  apiParams.set('sort', sortParam);
  
  // 필터 파라미터
  skills.forEach(skill => {
    apiParams.append('skillList', skill);
  });
  bigCategories.forEach(category => {
    apiParams.append('bigCategories', category);
  });

  try {
    const response = await authFetch(`/api/members/search?${apiParams.toString()}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      result: data.result.content || [],
      totalElements: data.result.totalElements || 0,
      projectCount: data.result.projectCount || 0,
      last: data.result.last || true,
    };
  } catch (error) {
    console.error('사용자 데이터 fetch 실패:', error);
    return {
      result: [],
      totalElements: 0,
      last: true,
    };
  }
};
