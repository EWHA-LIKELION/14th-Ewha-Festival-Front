/**
 * 로그인, 로그아웃 (쿠키 기반)
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

const AuthAPI = {
  logout,
};

export default AuthAPI;
