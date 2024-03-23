import { fetcher } from "@/lib/fetcher";
import { Product } from "@/type/product";

export const getProducts = async () => {
  return await fetcher
    .get<ApiResponse<{ products: Array<Product> }>>("/products")
    .then((res) => res.data.data?.products);
};
