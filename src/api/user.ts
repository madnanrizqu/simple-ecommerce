import { fetcher } from "@/lib/fetcher";
import { LoggedInUser } from "@/type/user";

export const getCurrentUser = async () => {
  return await fetcher
    .get<ApiResponse<{ user: LoggedInUser }>>("/users/me", {
      withCredentials: true,
    })
    .then((res) => res.data.data);
};

export const getTotalUsers = async () => {
  return await fetcher
    .get<ApiResponse<{ deleted: number; notDeleted: number; total: number }>>(
      "/users/total"
    )
    .then((res) => res.data.data);
};
