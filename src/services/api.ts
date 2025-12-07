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

// Get the API URL from environment variables or use a default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create an Axios instance
export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Add a request interceptor to include the JWT token in the headers
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage (or sessionStorage, or cookies)
    const token = localStorage.getItem('jwt_token');  // Retrieve the JWT token

    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;  // Proceed with the request
  },
  (error) => {
    return Promise.reject(error);  // Handle errors
  }
);

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    return response.data; // Return the response data (including the JWT token)
  } catch (error) {
    throw new Error('Login failed. Please try again.');
  }
};

// API functions to interact with the backend
export const fetchOrders = () => api.get<Order[]>('/orders');
export const fetchOrder = (id: number) => api.get<OrderDetail>(`/orders/${id}`);
export const createOrder = (data: { orderDescription: string; productIds: number[] }) =>
  api.post('/orders', data);
export const updateOrder = (id: number, data: { orderDescription: string; productIds: number[] }) =>
  api.put(`/orders/${id}`, data);
export const deleteOrder = (id: number) => api.delete(`/orders/${id}`);
export const fetchProducts = () => api.get<Product[]>('/products');
