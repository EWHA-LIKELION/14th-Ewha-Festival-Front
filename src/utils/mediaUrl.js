/**
 * 서버 미디어 URL 보정 유틸
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * 서버가 주는 미디어 URL을 화면에서 바로 쓸 수 있게 보정한다.
 * - /media/... 상대 경로 → API 서버 주소를 prefix
 * - http:// 절대 경로 → https 로 교정
 * - 그 외(https 절대 경로, /images 등 로컬 자산, 빈 값) → 그대로
 */
export const resolveMediaUrl = (url) => {
  if (!url) return url;
  if (url.startsWith('/media/')) return `${API_BASE_URL}${url}`;
  if (url.startsWith('http://')) return url.replace(/^http:\/\//, 'https://');
  return url;
};
