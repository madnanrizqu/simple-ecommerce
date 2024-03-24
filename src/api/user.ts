import { fetcher } from "@/lib/fetcher";
import { LoggedInUser } from "@/type/user";

export const getCurrentUser = async () => {
  return await fetcher
    .get<ApiResponse<{ user: LoggedInUser }>>("/users/me", {
      withCredentials: true,
    })
    .then((res) => res.data.data);
};
