import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
});

// Simulate API delay for realistic UX
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchProducts = async () => {
  await delay(800);
  const response = await api.get('/products');
  return response.data;
};

export const fetchProductById = async (id: string) => {
  await delay(500);
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const fetchCategories = async () => {
  await delay(500);
  const response = await api.get('/products/categories');
  return response.data;
};

export const fetchProductsByCategory = async (category: string) => {
  await delay(800);
  const response = await api.get(`/products/category/${category}`);
  return response.data;
};

// Mock data generators
export const generateMockReviews = (productId: number) => {
  const reviews = [
    { id: 1, user: 'John Doe', rating: 5, comment: 'Excellent product! Highly recommend.', date: '2025-01-15' },
    { id: 2, user: 'Jane Smith', rating: 4, comment: 'Good quality, fast shipping.', date: '2025-01-10' },
    { id: 3, user: 'Mike Johnson', rating: 5, comment: 'Perfect! Exactly as described.', date: '2025-01-05' },
  ];
  return reviews;
};

export const generateMockImages = (mainImage: string) => {
  return [mainImage, mainImage, mainImage];
};

export default api;
