import { useEffect, useState } from "react";

export const useFetch = <T>(
  fetcher: () => Promise<T>,
  initialValue: T | null = null
) => {
  const [data, setData] = useState(initialValue);
  const [status, setStatus] = useState<
    "loading" | "error" | "success" | "idle"
  >("idle");
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setStatus("loading");
        const res = await fetcher();
        setData(res);
        setStatus("success");
      } catch (err) {
        setStatus("error");
        setError(error);
      }
    })();
  }, [fetcher, error]);
  return { status, data, error };
};
