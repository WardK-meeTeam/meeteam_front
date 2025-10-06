import UserList from "./UserList";

const dummyUsers = Array(20).fill(0).map((_, idx) => (
  {
    userId: idx,
    name: `John Doe ${idx}`,
    temp: 45,
    sideProjectCount: 9,
    skills: ["react", "nextjs", "tailwindcss"],
    profileImg: "/images/userImg1.png",
  }
));

interface FetchUsers {
  content: any[];
  totalElements: number;
  last: boolean;
}

// 초기 프로젝트 데이터 fetch
const fetchInitialProjects = async (): Promise<FetchUsers> => {
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

export default async function UserListContainer() {
  // prefetch
  const users = await fetchInitialProjects();
  
  return (
    <UserList 
      initialUsers={users.content || []} 
      totalElements={users.totalElements}
      last={users.last}
    />
  );
}
