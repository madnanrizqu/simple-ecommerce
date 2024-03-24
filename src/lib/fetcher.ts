import axios from "axios";
import { toast } from "react-toastify";

const fetcher = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_FE_BASE_URL ?? "http://localhost:3000/api/v1",
});

fetcher.interceptors.response.use(
  (res) => res,
  async (err) => {
    const status = err?.response?.status || null;

    console.log(status);

    // if unauthorized redirect to login page
    if (status === 401) {
      toast("Sesi anda habis, silahkan login ulang", {
        autoClose: 1500,
        onClose: () => {
          window.location.href = "/login";
        },
      });
    }
    return Promise.reject(err);
  }
);

export { fetcher };
