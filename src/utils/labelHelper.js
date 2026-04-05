/**
 * value를 label(한국어)로 변환하는 범용 헬퍼 함수
 */

/**
 * 옵션 배열에서 value에 해당하는 label 찾기
 * @param {string} value - 찾을 값
 * @param {Array} options - { value, label } 형태의 배열
 * @returns {string} - 해당 label 또는 원본 value
 */
export const getLabel = (value, options) => {
  if (!value || !options) return value;
  return options.find((opt) => opt.value === value)?.label || value;
};

/**
 * 기본값(isDefault: true) 찾기
 * @param {Array} options - { value, label, isDefault? } 형태의 배열
 * @returns {string} - 기본값의 value
 */
export const getDefaultValue = (options) => {
  if (!options || options.length === 0) return null;
  return options.find((opt) => opt.isDefault)?.value || options[0]?.value;
};

/**
 * 숫자를 두 자리 문자열로 변환 (앞에 0 추가)
 * @param {number|string} num - 변환할 숫자
 * @returns {string} - 두 자리 문자열 (예: 1 → "01", 10 → "10")
 */
export const padNumber = (num) => {
  return String(num).padStart(2, '0');
};
