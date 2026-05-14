/**
 * SNS URL 매핑 유틸리티
 */

const SNS_PLATFORMS = [
  { type: 'instagram', keyword: 'insta', icon: '/icons/logo-instagramcolor.svg' },
  { type: 'kakaotalk', keyword: 'kakao', icon: '/icons/logo-kakaotalkcolor.svg' },
];

/**
 * SNS URL 배열을 URL 내용 기반으로 플랫폼 매핑한다.
 * 같은 플랫폼이 여러 개여도 모두 포함하며, 매칭되지 않는 URL은 제외한다.
 *
 * @param {string[]} snsUrls - SNS URL 배열
 * @returns {{ type: string, icon: string, url: string }[]}
 */
export const mapSnsUrls = (snsUrls) => {
  if (!Array.isArray(snsUrls)) return [];

  return snsUrls
    .map((url) => {
      if (!url?.trim()) return null;
      const platform = SNS_PLATFORMS.find((p) => url.toLowerCase().includes(p.keyword));
      return platform ? { type: platform.type, icon: platform.icon, url } : null;
    })
    .filter(Boolean);
};

/**
 * URL 이 지원하는 SNS 플랫폼(인스타그램/카카오) 중 하나에 해당하는지 검사한다.
 *
 * @param {string} url
 * @returns {boolean}
 */
export const isSnsUrl = (url) => {
  if (!url) return false;
  const lower = url.toLowerCase();
  return SNS_PLATFORMS.some((p) => lower.includes(p.keyword));
};
