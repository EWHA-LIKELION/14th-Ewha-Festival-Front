/**
 * 내 스크랩 목록 조회 hook (무한 스크롤)
 */

import { ScrapAPI } from '@/apis';
import { transformBoothData } from '@/hooks/useBooths';
import { transformShowData } from '@/hooks/useShows';
import { useInfiniteList } from '@/hooks/useInfiniteList';

// 스크랩 API 응답 구조:
// { booths: { counts, next, search_result: [...] }, shows: { counts, next, search_result: [...] } }
// → useInfiniteList 표준 포맷: { count, next, result: [...] } 으로 정규화

const scrapBoothsApiFn = async (params) => {
  const data = await ScrapAPI.getMyScrapList(params);
  return {
    count: data.booths.counts,
    next: data.booths.next,
    result: data.booths.search_result,
  };
};

const scrapShowsApiFn = async (params) => {
  const data = await ScrapAPI.getMyScrapList(params);
  return {
    count: data.shows.counts,
    next: data.shows.next,
    result: data.shows.search_result,
  };
};

export const useMyScrapBooths = (filters = {}) => {
  const {
    items: booths,
    totalCount,
    ...rest
  } = useInfiniteList({
    queryKey: 'myScrapBooths',
    apiFn: scrapBoothsApiFn,
    dataKey: 'result',
    transform: transformBoothData,
    limit: 6,
    filters,
  });
  return { ...rest, booths, totalCount };
};

export const useMyScrapShows = (filters = {}) => {
  const {
    items: shows,
    totalCount,
    ...rest
  } = useInfiniteList({
    queryKey: 'myScrapShows',
    apiFn: scrapShowsApiFn,
    dataKey: 'result',
    transform: transformShowData,
    limit: 6,
    filters,
  });
  return { ...rest, shows, totalCount };
};
