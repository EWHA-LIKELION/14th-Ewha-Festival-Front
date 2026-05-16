/**
 * 스크랩 페이지
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';
import useFilterStore from '@/store/useFilterStore';
import { useMyScrapBooths, useMyScrapShows } from '@/hooks';

import Header from '@/components/Header';
import Tab from '@/components/Tab';
import FilterBar from '@/components/FilterBar';
import Checkbox from '@/components/Checkbox';
import DropDown from '@/components/DropDown';
import ScrapBooth from '@/pages/my/ScrapBooth';
import ScrapShow from '@/pages/my/ScrapShow';

const ScrapPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const openLoginSheet = useAuthStore((s) => s.openLoginSheet);

  // 필터 상태 (Zustand 전역)
  const scrapBoothFilters = useFilterStore((s) => s.filters.scrap_booth);
  const scrapShowFilters = useFilterStore((s) => s.filters.scrap_show);
  const setFilter = useFilterStore((s) => s.setFilter);

  // 총 개수 (자식 컴포넌트와 TanStack Query 캐시 공유 → 추가 요청 없음)
  const { totalCount: boothCount } = useMyScrapBooths(scrapBoothFilters);
  const { totalCount: showCount } = useMyScrapShows(scrapShowFilters);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/my');
      openLoginSheet();
    }
  }, [isLoggedIn]);

  const isBooth = activeIndex === 0;
  const filterType = isBooth ? 'scrap_booth' : 'scrap_show';
  const totalCount = isBooth ? boothCount : showCount;
  const excludeEnded = isBooth ? scrapBoothFilters.excludeEnded : scrapShowFilters.excludeEnded;

  const handleExcludeEndedChange = (value) => {
    setFilter(filterType, 'excludeEnded', value);
  };

  return (
    <>
      <Header left="back" center="title" centerTitle="스크랩북" />
      <div className="mt-18 flex flex-col px-5">
        {/* 상단 고정 영역: Tab + FilterBar + 정렬 */}
        <div className="sticky top-18 z-10 -mx-5 flex flex-col gap-4 bg-white px-5 pt-5">
          <Tab tabs={['부스', '공연']} activeIndex={activeIndex} onChange={setActiveIndex} />
          <FilterBar type={filterType} />
          <div className="flex items-center justify-between text-sm font-normal text-zinc-500">
            총 {totalCount}개
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                종료 제외
                <Checkbox isSelected={excludeEnded} onChange={handleExcludeEndedChange} />
              </div>
              <DropDown type={filterType} />
            </div>
          </div>
        </div>

        {isBooth ? <ScrapBooth /> : <ScrapShow />}
      </div>
    </>
  );
};

export default ScrapPage;
