/**
 * 무한 스크롤 목록 조회 공용 hook
 */

import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

/**
 * 필터 객체를 API 쿼리 파라미터로 변환 (부스/공연/스크랩 공통)
 */
export const buildQueryParams = (filters, offset, limit) => {
  const params = { limit, offset };

  params.is_ongoing = filters.excludeEnded ? true : false;

  if (filters.category?.length > 0) params.category = filters.category;
  if (filters.location?.length > 0) params.building = filters.location;
  if (filters.host?.length > 0) params.host = filters.host;
  if (filters.day?.length > 0) params.date = filters.day;
  if (filters.sort) params.sorting = filters.sort;

  return params;
};

/**
 * 무한 스크롤 목록 조회 공용 hook
 * @param {string}   queryKey  - TanStack Query 캐시 키
 * @param {Function} apiFn    - API 호출 함수 (params) => Promise<data>
 * @param {string}   dataKey  - 응답 객체에서 목록을 꺼낼 키 (예: 'result', 'booths', 'shows')
 * @param {Function} transform - 각 아이템을 변환하는 함수
 * @param {number}   limit    - 페이지당 아이템 수
 * @param {Object}   filters  - 필터 객체
 * @returns {{ items, totalCount, ...queryResult }}
 */
export const useInfiniteList = ({ queryKey, apiFn, dataKey, transform, limit = 6, filters = {} }) => {
  const queryResult = useInfiniteQuery({
    queryKey: [queryKey, filters],
    queryFn: async ({ pageParam = 0 }) => {
      const params = buildQueryParams(filters, pageParam, limit);
      const data = await apiFn(params);
      return {
        ...data,
        [dataKey]: (data[dataKey] ?? []).map(transform),
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.next) return allPages.length * limit;
      return undefined;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
  });

  const items = useMemo(
    () => queryResult.data?.pages.flatMap((page) => page[dataKey]) || [],
    [queryResult.data, dataKey],
  );

  const totalCount = useMemo(
    () => queryResult.data?.pages[0]?.count || 0,
    [queryResult.data],
  );

  return { ...queryResult, items, totalCount };
};
