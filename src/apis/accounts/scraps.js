/**
 * 내 스크랩 목록 조회 및 검색
 */

import api from '@/apis/api';

/**
 * 내 스크랩북(부스/공연) 목록 및 검색
 * @param {Object} params - 쿼리 파라미터(q, is_ongoing, category, building, host, date, sorting, limit, offset 등)
 * @returns {Promise<Object>} booths, shows
 */
export const getMyScrapList = async (params = {}) => {
  const { data } = await api.get('/accounts/my-scrap/', { params });
  return data;
};

// (기존 default export는 제거, 함수만 export)
