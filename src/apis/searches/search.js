/**
 * 검색 API
 */

import api from '@/apis/api';

/**
 * 부스/공연 통합 검색
 * @param {Object} params - 쿼리 파라미터 (q, is_ongoing, category, building, host, date, sorting 등)
 * @returns {Promise<Object>} booths, shows
 */
export const searchContents = async (params = {}) => {
  const { data } = await api.get('/searchs/', { params });
  return data;
};

/**
 * 인기 검색어 조회 (상위 10개)
 * @returns {Promise<Array>} 인기 검색어 리스트
 */
export const getPopularKeywords = async () => {
  const { data } = await api.get('/searchs/popular/');
  return data;
};
