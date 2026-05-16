/**
 * 스크랩 부스 목록
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useBottomsheetStore from '@/store/useBottomsheetStore';
import useFilterStore from '@/store/useFilterStore';
import useLoadingStore from '@/store/useLoadingStore';
import { useMyScrapBooths } from '@/hooks';

import BoothCard from '@/components/Card/BoothCard';

const ScrapBooth = () => {
  const navigate = useNavigate();

  const scrapBoothFilters = useFilterStore((s) => s.filters.scrap_booth);
  const setSheetSize = useBottomsheetStore((s) => s.setSheetSize);

  const { booths, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyScrapBooths(scrapBoothFilters);

  const { showLoading, hideLoading } = useLoadingStore();
  useEffect(() => {
    if (isLoading) showLoading();
    else hideLoading();
    return () => hideLoading();
  }, [isLoading]);

  const goBoothDetail = (scrapId) => {
    setSheetSize('full');
    navigate(`/map/booths/${scrapId}`);
  };

  const hasActiveFilters =
    scrapBoothFilters.category.length > 0 ||
    scrapBoothFilters.location.length > 0 ||
    scrapBoothFilters.host.length > 0 ||
    scrapBoothFilters.day.length > 0 ||
    scrapBoothFilters.excludeEnded;

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
        {!isLoading && !isError && booths.length === 0 && (
          <div className="flex justify-center pt-20 text-center text-base font-normal text-zinc-300">
            {hasActiveFilters ? '검색 결과가 없어요.' : '아직 스크랩한 부스가 없어요.'}
          </div>
        )}

        {!isLoading &&
          !isError &&
          booths.map((booth) => (
            <BoothCard key={booth.id} booth={booth} onClick={() => goBoothDetail(booth.id)} />
          ))}

        {/* 다음 페이지 로딩 */}
        {isFetchingNextPage && (
          <div className="py-4 text-center text-sm text-zinc-300">더 불러오는 중...</div>
        )}
      </div>
    </>
  );
};

export default ScrapBooth;
