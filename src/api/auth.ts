import { fetcher } from "@/lib/fetcher";
import { User } from "@/type/user";

export const registerUser = async (data: User) => {
  return await fetcher
    .post<{ data: { devEmailLink: string } }>("/auth/register", data)
    .then((res) => res.data.data.devEmailLink);
};
