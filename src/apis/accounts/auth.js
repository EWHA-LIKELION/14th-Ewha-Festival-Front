/**
 * 로그인, 로그아웃
 */

import api from '@/apis/api';

export const requestKakaoLogin = async () => {
  const { data } = await api.get('/accounts/login/kakao/');
  return data;
};

/**
 * 카카오 로그인 콜백 처리
 * @param {Object} params
 * @param {string} params.code - 카카오 인가 코드 (필수)
 * @param {string} [params.error] - 인증 실패 시 에러 코드
 * @param {string} [params.error_description] - 인증 실패 시 에러 메세지
 * @param {string} [params.error_code] - 세부 에러 코드
 */
export const handleKakaoCallback = async (params) => {
  // params: { code, error, error_description, error_code }
  const { data } = await api.get('/accounts/login/callback/', { params });
  return data;
};

export const logout = async () => {
  Cookies.remove('accessToken');
  localStorage.removeItem('user');
  window.location.href = '/';
};

const AuthAPI = {
  requestKakaoLogin,
  handleKakaoCallback,
  logout,
};

export default AuthAPI;
