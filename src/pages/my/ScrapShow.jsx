/**
 * 스크랩 공연 목록
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useBottomsheetStore from '@/store/useBottomsheetStore';
import useFilterStore from '@/store/useFilterStore';
import useLoadingStore from '@/store/useLoadingStore';
import { useMyScrapShows } from '@/hooks';

import ShowCard from '@/components/Card/ShowCard';

const ScrapShow = () => {
  const navigate = useNavigate();

  const scrapShowFilters = useFilterStore((s) => s.filters.scrap_show);
  const setSheetSize = useBottomsheetStore((s) => s.setSheetSize);

  const { shows, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyScrapShows(scrapShowFilters);

  const { showLoading, hideLoading } = useLoadingStore();
  useEffect(() => {
    if (isLoading) showLoading();
    else hideLoading();
    return () => hideLoading();
  }, [isLoading]);

  const goShowDetail = (scrapId) => {
    setSheetSize('full');
    navigate(`/map/shows/${scrapId}`);
  };

  const hasActiveFilters =
    scrapShowFilters.category.length > 0 ||
    scrapShowFilters.day.length > 0 ||
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
            <ShowCard key={show.id} show={show} onClick={() => goShowDetail(show.id)} />
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
