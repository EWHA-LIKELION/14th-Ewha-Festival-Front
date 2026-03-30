/**
 * 공연 API
 */

import api from '@/apis/api';

/**
 * 공연 전체 조회
 * @param {Object} params - 쿼리 파라미터 (is_ongoing, category, building, date, sorting 등)
 * @returns {Promise<Object>} 공연 리스트 및 카운트
 */
export const getShows = async (params = {}) => {
  const { data } = await api.get('/shows/', { params });
  return data;
};

/**
 * 공연 상세 조회
 * @param {string} showId - 공연 ID
 * @returns {Promise<Object>} 공연 상세 정보
 */
export const getShowById = async (showId) => {
  const { data } = await api.get(`/shows/${showId}/`);
  return data;
};

/**
 * 공연 정보 수정
 * @param {string} showId - 공연 ID
 * @param {Object} payload - 수정 데이터
 * @param {string} [resourceVersion] - X-Resource-Version 헤더 값 (updated_at)
 * @returns {Promise<Object>} 수정된 공연 정보
 */
export const updateShow = async (showId, payload, resourceVersion) => {
  const headers = resourceVersion ? { 'X-Resource-Version': resourceVersion } : {};
  const { data } = await api.patch(`/shows/${showId}/`, payload, { headers });
  return data;
};

/**
 * 공연 공지 리스트 조회
 * @param {string} showId - 공연 ID
 * @returns {Promise<Array>} 공지 리스트
 */
export const getShowNotices = async (showId) => {
  const { data } = await api.get(`/shows/${showId}/notice/`);
  return data;
};

/**
 * 공연 스크랩 토글 (추가/취소)
 * @param {string} showId - 공연 ID
 * @returns {Promise<Object>} { scrapped: boolean, data? }
 */
export const toggleShowScrap = async (showId) => {
  const { data } = await api.post(`/shows/${showId}/scrap/`);
  return data;
};
