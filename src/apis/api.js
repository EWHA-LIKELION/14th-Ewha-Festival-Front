import axios from 'axios';
import useAuthStore from '@/store/useAuthStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 요청할 때 매번 store에서 토큰 가져오기
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
