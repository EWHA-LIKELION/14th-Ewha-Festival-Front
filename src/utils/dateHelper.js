/**
 * 날짜 관련 유틸 함수
 */

/**
 * 날짜 포맷 변환: "05.13" → "13일 (수)"
 * @param {string} date - MM.DD 형식의 날짜 문자열
 * @param {number} year - 연도 (기본값: 2026)
 * @returns {string} - "일 (요일)" 형식의 문자열
 */
export const formatScheduleDate = (date, year = 2026) => {
  const [month, day] = date.split('.');
  const dateObj = new Date(year, parseInt(month) - 1, parseInt(day));
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][dateObj.getDay()];
  return `${parseInt(day)}일 (${dayOfWeek})`;
};
