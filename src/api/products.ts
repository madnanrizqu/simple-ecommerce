import { fetcher } from "@/lib/fetcher";
import { Product, ProductAsPayload, ProductAsResponse } from "@/type/product";

export const getPublicProducts = async (args?: Pagination) => {
  const searchParams = args
    ? new URLSearchParams(args as Record<string, string>)
    : "";

  return await fetcher
    .get<ApiResponse<{ products: Array<Product>; total: number }>>(
      `/products/public?${searchParams}`
    )
    .then((res) => res.data.data);
};

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

export const createProduct = async (data: ProductAsPayload) => {
  return await fetcher
    .post<ApiResponse<ProductAsResponse>>("/products", data)
    .then((res) => res.data.data);
};

export const updateProduct = async (
  productId: number,
  data: Partial<ProductAsPayload>
) => {
  return await fetcher
    .put<ApiResponse<ProductAsResponse>>(`/products/${productId}`, data)
    .then((res) => res.data.data);
};

export const deleteProduct = async (productId: number) => {
  return await fetcher.delete<ApiResponse<ProductAsResponse>>(
    `/products/${productId}`
  );
};
