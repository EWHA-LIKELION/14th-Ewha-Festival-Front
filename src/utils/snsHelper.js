/**
 * SNS URL 매핑 유틸리티
 */

/**
 * SNS URL 배열을 플랫폼별로 매핑
 * URL에 특정 키워드가 포함되어 있으면 해당 SNS로 매핑하고,
 * 매칭되지 않으면 null 반환
 *
 * @param {string[]} snsUrls - SNS URL 배열
 * @returns {{ instagram: string | null, kakaotalk: string | null }}
 */
export const mapSnsUrls = (snsUrls) => {
  if (!snsUrls || !Array.isArray(snsUrls)) {
    return {
      instagram: null,
      kakaotalk: null,
    };
  }

  return {
    instagram: snsUrls.find((url) => url?.toLowerCase().includes('insta')) || null,
    kakaotalk: snsUrls.find((url) => url?.toLowerCase().includes('kakao')) || null,
  };
};
