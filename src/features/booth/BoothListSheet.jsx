/**
 * 부스 목록 바텀시트
 */

import { useRef } from 'react';
import { useNavigate, useMatch } from 'react-router-dom';

import BottomsheetDrag from '@/components/BottomsheetDrag';
import useBottomsheetStore from '@/store/useBottomsheetStore';
import useFilterStore from '@/store/useFilterStore';
import { useBooths, useInfiniteScroll } from '@/hooks';

import Header from '@/components/Header';
import Tab from '@/components/Tab';
import FilterBar from '@/components/FilterBar';
import BoothCard from '@/components/Card/BoothCard';
import Checkbox from '@/components/Checkbox';
import DropDown from '@/components/DropDown';

const BoothListSheet = () => {
  const isFull = useBottomsheetStore((s) => s.isFull());
  const navigate = useNavigate();
  const boothFilters = useFilterStore((s) => s.filters.booth);
  const setFilter = useFilterStore((s) => s.setFilter);
  const scrollContainerRef = useRef(null);

  const matchBooths = useMatch('/map/booths');
  const activeTabIndex = matchBooths ? 0 : 1;

  // TanStack Query로 부스 데이터 가져오기
  const { booths, totalCount, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useBooths(boothFilters);

  const handleTabChange = (index) => {
    navigate(index === 0 ? '/map/booths' : '/map/shows');
  };

  const handleExcludeEndedChange = (value) => {
    setFilter('booth', 'excludeEnded', value);
  };

  const goBoothDetail = (boothId) => {
    navigate(`/map/booths/${boothId}`);
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
        <div className="flex flex-col gap-4 p-5">
          <Tab tabs={['부스', '공연']} activeIndex={activeTabIndex} onChange={handleTabChange} />
          <FilterBar type="booth" />
          <div className="flex flex-col">
            <div className="flex items-center justify-between text-sm font-normal text-zinc-500">
              총 {totalCount}개
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  종료 제외
                  <Checkbox
                    isSelected={boothFilters.excludeEnded}
                    onChange={handleExcludeEndedChange}
                  />
                </div>
                <DropDown type="booth" />
              </div>
            </div>

            {/* 로딩 */}
            {isLoading && <div className="py-24 text-center text-zinc-300">로딩 중...</div>}

            {/* 에러 */}
            {isError && (
              <div className="py-24 text-center text-zinc-300">
                데이터를 불러오는데 실패했습니다.
              </div>
            )}

            {/* 부스 목록 */}
            {!isLoading && !isError && booths.length === 0 && (
              <div className="py-24 text-center text-zinc-300">검색 결과가 없어요.</div>
            )}

            {!isLoading &&
              !isError &&
              booths.map((booth) => (
                <BoothCard key={booth.id} booth={booth} onClick={() => goBoothDetail(booth.id)} />
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

export default BoothListSheet;
