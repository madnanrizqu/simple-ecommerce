import { fetcher } from "@/lib/fetcher";
import { LoggedInUser, User, UserAsResponse } from "@/type/user";

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

export const getUsers = async (args?: Pagination) => {
  const searchParams = args
    ? new URLSearchParams(args as Record<string, string>)
    : "";

  return await fetcher
    .get<ApiResponse<{ users: Array<UserAsResponse>; total: number }>>(
      `/users?${searchParams}`
    )
    .then((res) => res.data.data);
};

export const createUser = async (data: User) => {
  return await fetcher
    .post<ApiResponse<UserAsResponse>>("/users", data)
    .then((res) => res.data.data);
};
