/**
 * 공연 목록 조회 hook (무한 스크롤)
 */

import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ShowAPI } from '@/apis';
import { SHOW_CATEGORY } from '@/constants/category';
import { BOOTH_LOCATION } from '@/constants/building';
import { FESTIVAL_DAYS } from '@/constants/day';
import { getLabel, padNumber } from '@/utils/labelHelper';

const LIMIT = 8; // 한 페이지당 10개씩 로드 (화면에는 5개 보임)

/**
 * 공연 목록 조회 (무한 스크롤)
 * @param {Object} filters - 필터 객체 { host: [], category: [], day: [], location: [], sort: null, excludeEnded: false }
 * @returns {Object} useInfiniteQuery 결과 + 변환된 shows, totalCount
 */
export const useShows = (filters = {}) => {
  const queryResult = useInfiniteQuery({
    queryKey: ['shows', filters],
    queryFn: async ({ pageParam = 0 }) => {
      const params = buildQueryParams(filters, pageParam);
      const data = await ShowAPI.getShows(params);

      // API 응답 데이터를 변환하여 반환
      return {
        ...data,
        result: data.result.map(transformShowData),
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.next) {
        return allPages.length * LIMIT;
      }
      return undefined;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5, // 5분
  });

  // 모든 페이지의 공연 데이터 합치기
  const shows = useMemo(() => {
    return queryResult.data?.pages.flatMap((page) => page.result) || [];
  }, [queryResult.data]);

  // 전체 공연 개수
  const totalCount = useMemo(() => {
    return queryResult.data?.pages[0]?.count || 0;
  }, [queryResult.data]);

  return {
    ...queryResult,
    shows, // ✨ 변환된 공연 배열
    totalCount, // ✨ 전체 개수
  };
};

/**
 * 필터 객체를 쿼리 파라미터로 변환
 */
const buildQueryParams = (filters, offset) => {
  const params = {
    limit: LIMIT,
    offset,
  };

  // 종료 제외 로직 (부스와 동일)
  // - 체크박스 OFF (excludeEnded=false, 기본): is_ongoing=false 전송 → 종료 포함
  // - 체크박스 ON (excludeEnded=true): is_ongoing=true 전송 → 종료 제외
  if (filters.excludeEnded) {
    params.is_ongoing = true; // 운영 중인 것만
  } else {
    params.is_ongoing = false; // 모두 포함
  }

  // 카테고리 (배열)
  if (filters.category?.length > 0) {
    params.category = filters.category;
  }

  // 위치 (location → building)
  if (filters.location?.length > 0) {
    params.building = filters.location;
  }

  // 주관 (host)
  if (filters.host?.length > 0) {
    params.host = filters.host;
  }

  // 요일 (day → date, YYYY-MM-DD 형식)
  if (filters.day?.length > 0) {
    params.date = filters.day;
  }

  // 정렬 (sort → sorting)
  if (filters.sort) {
    params.sorting = filters.sort;
  }

  return params;
};

/**
 * 카테고리 값을 한글 라벨로 변환
 */
export const getCategoryLabel = (value) => {
  return getLabel(value, SHOW_CATEGORY);
};

/**
 * 위치 값을 한글 라벨로 변환
 */
export const getLocationLabel = (value) => {
  return getLabel(value, BOOTH_LOCATION);
};

/**
 * 날짜를 요일로 변환 (MM.DD → 요일)
 * @param {string} dateStr - "05.13" 또는 "2026-05-20" 형식
 * @returns {string} - 요일 (예: "수")
 */
export const getDateLabel = (dateStr) => {
  if (!dateStr) return '';
  return getLabel(dateStr, FESTIVAL_DAYS);
};

/**
 * 날짜 배열을 요일 문자열로 변환 (여러 개면 " · "로 구분)
 * @param {Array} dates - 날짜 배열 (예: ["05.13", "05.14"])
 * @returns {string} - 요일 문자열 (예: "수 · 목")
 */
export const getDaysText = (dates) => {
  if (!dates || dates.length === 0) return '';
  return dates.map((date) => getDateLabel(date)).join(' · ');
};

/**
 * 시간 배열을 문자열로 변환 (여러 개면 " · "로 구분)
 * @param {Array} times - 시간 배열 (예: ["09:00~16:00", "18:00~20:00"])
 * @returns {string} - 시간 문자열 (예: "09:00~16:00 · 18:00~20:00")
 */
export const getTimesText = (times) => {
  if (!times || times.length === 0) return '';
  return times.join(' · ');
};

/**
 * 공연 데이터 변환 (API 응답 → UI 표시용)
 * @param {Object} show - 원본 공연 데이터
 * @returns {Object} - 변환된 공연 데이터 (categoryText, daysText, timesText, locationText, badgeState 추가)
 */
const transformShowData = (show) => {
  const { category, schedule = [], location, is_ongoing, is_scraped, scraps_count } = show;

  // 카테고리 한글 변환
  const categoryText = getCategoryLabel(category);

  // 날짜 변환 (날짜 → 요일)
  const dates = schedule.map((s) => s.date);
  const daysText = getDaysText(dates);

  // 시간 변환
  const times = schedule.map((s) => s.time);
  const timesText = getTimesText(times);

  // 위치 텍스트 (예: 학생문화관01)
  const locationText = `${getLocationLabel(location.building)}${location.number ? padNumber(location.number) : ''}`;

  // 상태 배지
  // 공연: null(공연전) / true(공연 중) / false(종료)
  const getBadgeState = (isOngoing) => {
    if (isOngoing === null) return 'upcoming'; // 공연전
    if (isOngoing === true) return 'operating'; // 공연중
    return 'closed'; // 종료
  };

  const badgeState = getBadgeState(is_ongoing);

  return {
    ...show,
    is_scrapped: is_scraped, // API 필드명(is_scraped) → 컴포넌트 필드명(is_scrapped) 변환
    scraps_count, // 명시적으로 포함
    categoryText, // 변환된 카테고리 텍스트
    daysText, // 변환된 요일 텍스트
    timesText, // 변환된 시간 텍스트
    locationText, // 변환된 위치 텍스트
    badgeState, // 계산된 배지 상태
  };
};
