import axios from 'axios';

// Use type-only imports for interfaces/types
export type Product = {
  id: number;
  productName: string;
  productDescription: string;
};

export type Order = {
  id: number;
  orderDescription: string;
  createdAt: string;
  productCount: number;
};

export type OrderDetail = {
  id: number;
  orderDescription: string;
  createdAt: string;
  orderProducts: { productId: number; product: Product }[];
};

const API_URL = import.meta.env.VITE_API_URL || 'https://ecommerce-backend-p8njnbhyv-jayanga-palihenas-projects.vercel.app/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// API functions
export const fetchOrders = () => api.get<Order[]>('/orders');
export const fetchOrder = (id: number) => api.get<OrderDetail>(`/orders/${id}`);
export const createOrder = (data: { orderDescription: string; productIds: number[] }) =>
  api.post('/orders', data);
export const updateOrder = (id: number, data: { orderDescription: string; productIds: number[] }) =>
  api.put(`/orders/${id}`, data);
export const deleteOrder = (id: number) => api.delete(`/orders/${id}`);
export const fetchProducts = () => api.get<Product[]>('/products');