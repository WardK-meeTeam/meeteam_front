import UserList from "./UserList";
import { fetchUsers } from "@/api/fetchUsers";

interface UserListContainerProps {
  searchParams: { [key: string]: string | string[] | undefined };
  limit: number;
}

export default async function UserListContainer({ searchParams, limit }: UserListContainerProps) {
  // prefetch
  const users = await fetchUsers({ searchParams, limit });

  return (
    <UserList 
      initialUsers={users.result || []} 
      totalElements={users.totalElements || 0}
      last={users.last || false}
      searchParams={searchParams}
      limit={limit}
    />
  );
}
