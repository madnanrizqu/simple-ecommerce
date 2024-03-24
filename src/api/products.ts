import { fetcher } from "@/lib/fetcher";
import { Product } from "@/type/product";

export const getProducts = async (args?: Pagination) => {
  const searchParams = args
    ? new URLSearchParams(args as Record<string, string>)
    : "";

  return await fetcher
    .get<ApiResponse<{ products: Array<Product>; total: number }>>(
      `/products?${searchParams}`
    )
    .then((res) => res.data.data);
};

export const getTotalProducts = async () => {
  return await fetcher
    .get<ApiResponse<{ deleted: number; notDeleted: number; total: number }>>(
      "/products/total"
    )
    .then((res) => res.data.data);
};
