/**
 * 스크랩 공연 목록
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useFilterStore from '@/store/useFilterStore';
import { useMyScrapShows } from '@/hooks/useMyScrap';

import FilterBar from '@/components/FilterBar';
import Checkbox from '@/components/Checkbox';
import DropDown from '@/components/DropDown';
import ShowCard from '@/components/Card/ShowCard';

const ScrapShow = () => {
  const navigate = useNavigate();

  const scrapShowFilters = useFilterStore((s) => s.filters.scrap_show);
  const setFilter = useFilterStore((s) => s.setFilter);

  const { shows, totalCount, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyScrapShows(scrapShowFilters);

  const handleShowExcludeEndedChange = (value) => {
    setFilter('scrap_show', 'excludeEnded', value);
  };

  const hasActiveFilters =
    scrapShowFilters.category.length > 0 ||
    scrapShowFilters.host.length > 0 ||
    scrapShowFilters.day.length > 0 ||
    scrapShowFilters.sort !== null ||
    scrapShowFilters.excludeEnded;

  // 윈도우 스크롤 기반 무한 스크롤
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if ((scrollTop + clientHeight) / scrollHeight > 0.8 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <FilterBar type="scrap_show" />
        <div className="flex items-center justify-between text-sm font-normal text-zinc-500">
          총 {totalCount}개
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              종료 제외
              <Checkbox
                isSelected={scrapShowFilters.excludeEnded}
                onChange={handleShowExcludeEndedChange}
              />
            </div>
            <DropDown type="scrap_show" />
          </div>
        </div>

        {/* 로딩 */}
        {isLoading && <div className="py-24 text-center text-zinc-300">로딩 중...</div>}

        {/* 에러 */}
        {isError && (
          <div className="py-24 text-center text-zinc-300">데이터를 불러오는데 실패했습니다.</div>
        )}

        {/* 빈 상태 */}
        {!isLoading && !isError && shows.length === 0 && (
          <div className="flex justify-center pt-20 text-center text-base font-normal text-zinc-300">
            {hasActiveFilters ? '검색 결과가 없어요.' : '아직 스크랩한 공연이 없어요.'}
          </div>
        )}

        {!isLoading &&
          !isError &&
          shows.map((show) => (
            <ShowCard key={show.id} show={show} onClick={() => navigate(`/map/shows/${show.id}`)} />
          ))}

        {/* 다음 페이지 로딩 */}
        {isFetchingNextPage && (
          <div className="py-4 text-center text-sm text-zinc-300">더 불러오는 중...</div>
        )}
      </div>
    </>
  );
};

export default ScrapShow;
