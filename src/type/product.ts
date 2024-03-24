export interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  created_at: Date;
  deleted: boolean;
}

export interface ProductAsPayload {
  name: string;
  price: number;
  currency: string;
}

export interface ProductAsResponse {
  id: number;
  name: string;
  price: number;
  currency: string;
  created_at: Date;
  deleted: false;
}
