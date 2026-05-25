/**
 * public 폴더 자산의 절대 경로를 Vite base(`/14th-Ewha-Festival-Front/`)에 맞춰 반환한다.
 *
 * @example
 *   asset('/icons/icon-back.svg')  // → '/14th-Ewha-Festival-Front/icons/icon-back.svg'
 *   asset('icons/icon-back.svg')   // → '/14th-Ewha-Festival-Front/icons/icon-back.svg'
 */
export const asset = (path) => {
  const base = import.meta.env.BASE_URL;
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${normalized}`;
};
