/**
 * 부스 API
 */

import api from '@/apis/api';

/**
 * 부스 전체 조회
 * @param {Object} params - 쿼리 파라미터 (is_ongoing, category, building, host, date, sorting)
 * @returns {Promise<Object>} 부스 리스트 및 카운트
 */
export const getBooths = async (params = {}) => {
  const { data } = await api.get('/booths/', { params });
  return data;
};

/**
 * 부스 상세 조회
 * @param {string} boothId - 부스 ID
 * @returns {Promise<Object>} 부스 상세 정보
 */
export const getBoothById = async (boothId) => {
  const { data } = await api.get(`/booths/${boothId}/`);
  return data;
};

/**
 * 부스 정보 수정
 * @param {string} boothId - 부스 ID
 * @param {Object} payload - 수정 데이터
 * @param {string} [resourceVersion] - X-Resource-Version 헤더 값 (updated_at)
 * @returns {Promise<Object>} 수정된 부스 정보
 */
export const updateBooth = async (boothId, payload, resourceVersion) => {
  const headers = resourceVersion ? { 'X-Resource-Version': resourceVersion } : {};
  const { data } = await api.patch(`/booths/${boothId}/`, payload, { headers });
  return data;
};

/**
 * 부스 공지 리스트 조회
 * @param {string} boothId - 부스 ID
 * @returns {Promise<Array>} 공지 리스트
 */
export const getBoothNotices = async (boothId) => {
  const { data } = await api.get(`/booths/${boothId}/notice/`);
  return data;
};

/**
 * 부스 스크랩 토글 (추가/취소)
 * @param {string} boothId - 부스 ID
 * @returns {Promise<Object>} { scrapped: boolean, data? }
 */
export const toggleBoothScrap = async (boothId) => {
  const { data } = await api.post(`/booths/${boothId}/scrap/`);
  return data;
};
