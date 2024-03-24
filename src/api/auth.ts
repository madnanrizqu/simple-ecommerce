import { fetcher } from "@/lib/fetcher";
import { User } from "@/type/user";

export const registerUser = async (data: User) => {
  return await fetcher
    .post<{ data: { devEmailLink: string } }>("/auth/register", data)
    .then((res) => res.data.data.devEmailLink);
};

export const verifyEmail = async (verificationCode: string) => {
  return await fetcher
    .get<ApiResponse<any>>(`/auth/verify_email/${verificationCode}`)
    .then((res) => res.data);
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await fetcher
    .post<ApiResponse<{ access_token: string }>>("/auth/login", {
      email,
      password,
    })
    .then((res) => res.data.data);
};

export const logout = async () => {
  return await fetcher.post("/auth/logout");
};
