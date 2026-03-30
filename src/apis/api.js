import axios from 'axios';
import useAuthStore from '@/store/useAuthStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // 쿠키 자동 포함
});

// 🔥 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { logout } = useAuthStore.getState();

    // ❗ 서버 응답이 있는 경우
    if (error.response) {
      const { status, data } = error.response;

      // 🔐 인증 만료 (401)
      if (status === 401) {
        logout();
      }

      // JSON 에러 응답
      if (data && typeof data === 'object') {
        return Promise.reject(data);
      }

      // HTML or 기타 이상한 응답
      return Promise.reject({
        message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
    }

    // ❗ 네트워크 오류 (서버 응답 없음)
    return Promise.reject({
      message: '네트워크 오류가 발생했습니다.',
    });
  },
);

export default api;
