/**
 * 로그인, 로그아웃 (쿠키 기반)
 */

import api from '@/apis/api';
import useAuthStore from '@/store/useAuthStore';

/**
 * 로그인 상태 확인 (쿠키 기반 인증)
 * 카카오 로그인 후 쿠키가 정상적으로 설정되었는지 확인
 */
export const checkLoginStatus = async () => {
  const { data } = await api.get('/accounts/my-data/');
  return data;
};

/**
 * 로그아웃 (프론트 상태만 초기화)
 * ⚠️ 실제 쿠키 삭제는 백엔드 필요 (추후 구현)
 */
export const logout = () => {
  // Zustand 상태 초기화
  useAuthStore.getState().logout();

  // 홈으로 이동
  window.location.replace('/');
};

const AuthAPI = {
  checkLoginStatus,
  logout,
};

export default AuthAPI;
