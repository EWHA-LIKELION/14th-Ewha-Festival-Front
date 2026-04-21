/**
 * 공연 목록 바텀시트
 */

import { useRef } from 'react';
import { useNavigate, useMatch } from 'react-router-dom';

import BottomsheetDrag from '@/components/BottomsheetDrag';
import useBottomsheetStore from '@/store/useBottomsheetStore';
import useFilterStore from '@/store/useFilterStore';
import { useShows, useInfiniteScroll, useSearchResults } from '@/hooks';
import useSearchStore from '@/store/useSearchStore';

import Header from '@/components/Header';
import Tab from '@/components/Tab';
import FilterBar from '@/components/FilterBar';
import Checkbox from '@/components/Checkbox';
import DropDown from '@/components/DropDown';
import ShowCard from '@/components/Card/ShowCard';
import LoadingSpinner from '@/components/LoadingSpinner';

const ShowListSheet = () => {
  const isFull = useBottomsheetStore((s) => s.isFull());
  const navigate = useNavigate();
  const showFilters = useFilterStore((s) => s.filters.show);
  const setFilter = useFilterStore((s) => s.setFilter);
  const scrollContainerRef = useRef(null);

  const matchShows = useMatch('/map/shows');
  const activeTabIndex = matchShows ? 1 : 0;

  const searchQuery = useSearchStore((s) => s.searchQuery);
  const isSearchMode = !!searchQuery;

  const showsQuery = useShows(showFilters);
  const searchResultsQuery = useSearchResults(searchQuery);

  const shows = isSearchMode ? searchResultsQuery.shows : showsQuery.shows;
  const totalCount = isSearchMode ? searchResultsQuery.showCount : showsQuery.totalCount;
  const isLoading = isSearchMode ? searchResultsQuery.isLoading : showsQuery.isLoading;
  const isError = isSearchMode ? searchResultsQuery.isError : showsQuery.isError;
  const fetchNextPage = isSearchMode ? searchResultsQuery.fetchNextPage : showsQuery.fetchNextPage;
  const hasNextPage = isSearchMode ? searchResultsQuery.hasNextPage : showsQuery.hasNextPage;
  const isFetchingNextPage = isSearchMode
    ? searchResultsQuery.isFetchingNextPage
    : showsQuery.isFetchingNextPage;

  const handleTabChange = (index) => {
    navigate(index === 0 ? '/map/booths' : '/map/shows');
  };

  const handleExcludeEndedChange = (value) => {
    setFilter('show', 'excludeEnded', value);
  };

  const goShowDetail = (showId) => {
    navigate(`/map/shows/${showId}`);
  };

  // 무한 스크롤
  useInfiniteScroll({
    scrollContainerRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    threshold: 0.8,
  });

  return (
    <>
      <div className={isFull ? 'relative z-10' : 'relative z-20'}>
        <Header center="search" background="transparent" />
      </div>
      <BottomsheetDrag scrollContainerRef={scrollContainerRef}>
        {isFull && <Header center="search" />}
        <div className="flex h-full flex-col gap-4 p-5">
          <Tab tabs={['부스', '공연']} activeIndex={activeTabIndex} onChange={handleTabChange} />
          <FilterBar type="show" />
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex items-center justify-between text-sm font-normal text-zinc-500">
              총 {totalCount}개
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  종료 제외
                  <Checkbox
                    isSelected={showFilters.excludeEnded}
                    onChange={handleExcludeEndedChange}
                  />
                </div>
                <DropDown type="show" />
              </div>
            </div>

            {/* 로딩 */}
            {isLoading && (
              <div className="flex h-full items-center justify-center">
                <LoadingSpinner />
              </div>
            )}

            {/* 에러 */}
            {isError && (
              <div className="py-24 text-center text-zinc-300">
                데이터를 불러오는데 실패했습니다.
              </div>
            )}

            {/* 공연 목록 */}
            {!isLoading && !isError && shows.length === 0 && (
              <div className="py-24 text-center text-zinc-300">검색 결과가 없어요.</div>
            )}

            {!isLoading &&
              !isError &&
              shows.map((show) => (
                <ShowCard key={show.id} show={show} onClick={() => goShowDetail(show.id)} />
              ))}

            {/* 다음 페이지 로딩 */}
            {isFetchingNextPage && (
              <div className="py-24 text-center text-sm text-zinc-300">더 불러오는 중...</div>
            )}
          </div>
        </div>
      </BottomsheetDrag>
    </>
  );
};

export default ShowListSheet;
