import { authFetch } from "./authFetch";

export const getUserProfile = async () => {
  const response = await authFetch(`/api/members`);

  if (!response.ok) {
    return null;
  }
  const data = await response.json();

  return data.result;
};
