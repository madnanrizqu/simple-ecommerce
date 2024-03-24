import { fetcher } from "@/lib/fetcher";
import { Product } from "@/type/product";

export const getProducts = async () => {
  return await fetcher
    .get<ApiResponse<{ products: Array<Product> }>>("/products")
    .then((res) => res.data.data?.products);
};

export const getTotalProducts = async () => {
  return await fetcher
    .get<ApiResponse<{ deleted: number; notDeleted: number; total: number }>>(
      "/products/total"
    )
    .then((res) => res.data.data);
};
