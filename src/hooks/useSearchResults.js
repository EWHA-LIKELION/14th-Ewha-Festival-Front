import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { SearchAPI } from '@/apis';
import { transformBoothData } from '@/hooks/useBooths';
import { transformShowData } from '@/hooks/useShows';

const LIMIT = 10;

export const useSearchResults = (query) => {
  const queryResult = useInfiniteQuery({
    queryKey: ['searchResults', query],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await SearchAPI.searchContents({ q: query, offset: pageParam });
      return {
        booths: {
          ...data.booths,
          search_result: (data.booths?.search_result ?? []).map(transformBoothData),
        },
        shows: {
          ...data.shows,
          search_result: (data.shows?.search_result ?? []).map(transformShowData),
        },
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.booths?.next || lastPage.shows?.next) {
        return allPages.length * LIMIT;
      }
      return undefined;
    },
    initialPageParam: 0,
    enabled: !!query,
  });

  const booths = useMemo(
    () => queryResult.data?.pages.flatMap((p) => p.booths.search_result) ?? [],
    [queryResult.data],
  );

  const shows = useMemo(
    () => queryResult.data?.pages.flatMap((p) => p.shows.search_result) ?? [],
    [queryResult.data],
  );

  const boothCount = queryResult.data?.pages[0]?.booths?.counts ?? 0;
  const showCount = queryResult.data?.pages[0]?.shows?.counts ?? 0;

  return { ...queryResult, booths, shows, boothCount, showCount };
};
