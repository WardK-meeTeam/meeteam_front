import UserList from "./UserList";

const dummyUsers = Array(20).fill(0).map((_, idx) => (
  {
    userId: idx,
    name: `John Doe ${idx}`,
    temp: 45,
    sideProjectCount: 9,
    skills: ["React.js", "Next.js", "Figma", "Java", "Python"],
    profileImg: "/images/userImg1.png",
  }
));

interface FetchUsers {
  content: any[];
  totalElements: number;
  last: boolean;
}

// 초기 사용자 데이터 fetch
const fetchInitialUsers = async (searchParams: { [key: string]: string | string[] | undefined }): Promise<FetchUsers> => {
  // 프론트엔드 쉼표 구분 방식을 백엔드 다중 파라미터 방식으로 변환
  const skills = typeof searchParams.skills === 'string' 
    ? searchParams.skills.split(',') 
    : [];
    
  const bigCategories = typeof searchParams.bigCategory === 'string' 
    ? searchParams.bigCategory.split(',') 
    : [];

  // API 요청용 URLSearchParams 생성 (백엔드 형식)
  const apiParams = new URLSearchParams();
  skills.forEach(skill => {
    apiParams.append('skillList', skill); // 백엔드가 원하는 형식
  });
  bigCategories.forEach(category => {
    apiParams.append('bigCategories', category); // 백엔드가 원하는 형식
  });

  console.log('API 요청 URL:', `/api/users?${apiParams.toString()}`);
  console.log('프론트엔드 파라미터:', { skills, bigCategories });
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        content: dummyUsers,
        totalElements: 328,
        last: false
      });
    }, 2000);
  });
}

interface UserListContainerProps {
  searchParams: { [key: string]: string | string[] | undefined };
  limit: number;
}

export default async function UserListContainer({ searchParams, limit }: UserListContainerProps) {
  // prefetch
  const users = await fetchInitialUsers(searchParams);
  
  return (
    <UserList 
      initialUsers={users.content || []} 
      totalElements={users.totalElements}
      last={users.last}
    />
  );
}
