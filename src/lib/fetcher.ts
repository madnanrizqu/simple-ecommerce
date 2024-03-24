import axios from "axios";

export const fetcher = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_FE_BASE_URL ?? "http://localhost:3000/api/v1",
});
