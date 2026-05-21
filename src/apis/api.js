import axios from 'axios';
import useAuthStore from '@/store/useAuthStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // 쿠키 자동 포함
  paramsSerializer: {
    // 배열을 반복 파라미터로 직렬화 (category=FOOD&category=GOODS)
    serialize: (params) => {
      const parts = [];
      Object.keys(params).forEach((key) => {
        const value = params[key];
        if (Array.isArray(value)) {
          // 배열인 경우 반복해서 추가
          value.forEach((v) => {
            parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`);
          });
        } else if (value !== undefined && value !== null) {
          // 일반 값
          parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        }
      });
      return parts.join('&');
    },
  },
});

// 동시에 여러 요청이 401을 받아도 토큰 재발급은 한 번만 수행하기 위한 공유 Promise
let refreshPromise = null;

// 🔥 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { logout } = useAuthStore.getState();
    const originalRequest = error.config;

    // ❗ 서버 응답이 있는 경우
    if (error.response) {
      const { status, data } = error.response;
      const requestUrl = originalRequest?.url ?? '';
      // refresh / logout 요청 자체는 재발급 대상에서 제외 (무한 루프 방지)
      const isAuthEndpoint =
        requestUrl.includes('/accounts/refresh/') ||
        requestUrl.includes('/accounts/logout/');

      // 🔄 Access Token 만료(401) → 재발급 후 원래 요청 재시도
      if (status === 401 && originalRequest && !originalRequest._retry && !isAuthEndpoint) {
        originalRequest._retry = true;
        try {
          // 이미 진행 중인 재발급이 있으면 그 결과를 함께 기다림
          if (!refreshPromise) {
            refreshPromise = api.post('/accounts/refresh/').finally(() => {
              refreshPromise = null;
            });
          }
          await refreshPromise;

          // 재발급 성공 → 새 쿠키로 원래 요청 재시도
          return api(originalRequest);
        } catch {
          // 재발급 실패 (Refresh Token 만료 등) → 로그아웃
          logout();
          return Promise.reject({
            message: '세션이 만료되었어요. 다시 로그인해주세요.',
          });
        }
      }

      // 🔐 재발급으로 회복할 수 없는 인증 만료(401) → 로그아웃
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
