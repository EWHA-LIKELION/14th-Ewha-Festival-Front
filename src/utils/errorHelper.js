/**
 * 에러 응답에서 사용자에게 보여줄 메시지를 추출한다.
 * api 인터셉터가 에러를 응답 본문(object)으로 reject 하므로 그 형태를 처리한다.
 */
export const getErrorMessage = (err) => {
  if (!err) return null;
  if (typeof err === 'string') return err;
  if (typeof err.detail === 'string') return err.detail;
  if (typeof err.message === 'string') return err.message;

  // DRF 필드 에러: { field: ["메시지", ...] } → 첫 메시지
  const firstValue = Object.values(err)[0];
  if (Array.isArray(firstValue) && typeof firstValue[0] === 'string') return firstValue[0];
  if (typeof firstValue === 'string') return firstValue;

  return null;
};
