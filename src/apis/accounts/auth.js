/**
 * 로그인, 로그아웃, 토큰 재발급 (쿠키 기반)
 */

import api from '@/apis/api';
import useAuthStore from '@/store/useAuthStore';

/**
 * 로그아웃
 * 백엔드 API 실패 여부와 관계없이 프론트엔드 상태는 반드시 초기화
 */
export const logout = async () => {
  try {
    await api.post('/accounts/logout/kakao/');
  } catch (error) {
    // 백엔드 로그아웃 실패해도 프론트엔드는 로그아웃 처리
    console.error('로그아웃 API 호출 실패:', error);
  } finally {
    // 항상 프론트엔드 상태 초기화
    useAuthStore.getState().logout();
  }
};

/**
 * Access Token 재발급
 * 쿠키에 담긴 Refresh Token으로 새 Access Token을 발급받습니다.
 * 요청 바디는 없으며, 응답의 Set-Cookie로 access/refresh 토큰이 갱신됩니다.
 *
 * 보통은 응답 인터셉터(api.js)가 401 발생 시 자동으로 호출하므로
 * 컴포넌트에서 직접 호출할 일은 거의 없습니다.
 */
export const refresh = async () => {
  const { data } = await api.post('/accounts/refresh/');
  return data;
};

const AuthAPI = {
  logout,
  refresh,
};

export default AuthAPI;
