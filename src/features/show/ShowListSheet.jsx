/**
 * 공연 목록 바텀시트
 */

import { useState } from 'react';
import { useNavigate, useMatch } from 'react-router-dom';
import BottomsheetDrag from '@/components/BottomsheetDrag';
import useBottomsheetStore from '@/store/useBottomsheetStore';
import Header from '@/components/Header';
import Tab from '@/components/Tab';
import FilterBar from '@/components/FilterBar';
import ShowCard from '@/components/Card/ShowCard';
import Checkbox from '@/components/Checkbox';
import DropDown from '@/components/DropDown';

const totalNum = 1;

const BoothListSheet = () => {
  const isFull = useBottomsheetStore((s) => s.isFull());
  const navigate = useNavigate();
  const [excludeClosed, setExcludeClosed] = useState(false);

  const matchShows = useMatch('/map/shows');
  const activeTabIndex = matchShows ? 1 : 0;

  const handleTabChange = (index) => {
    navigate(index === 0 ? '/map/booths' : '/map/shows');
  };

  return (
    <>
      <div className={isFull ? 'relative z-10' : 'relative z-20'}>
        <Header center="search" background="transparent" />
      </div>
      <BottomsheetDrag>
        {isFull && <Header center="search" />}
        <div className="flex flex-col gap-4 p-5">
          <Tab tabs={['부스', '공연']} activeIndex={activeTabIndex} onChange={handleTabChange} />
          <FilterBar type="show" />
          <div className="flex flex-col">
            <div className="flex items-center justify-between text-sm font-normal text-zinc-500">
              총 {totalNum}개
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  종료 제외 <Checkbox isSelected={excludeClosed} onChange={setExcludeClosed} />
                </div>
                <DropDown type="show" />
              </div>
            </div>
            {/* API 연결할 때 map으로 적용해놓겠습니다... */}
            <ShowCard />
            <ShowCard />
            <ShowCard />
          </div>
        </div>
      </BottomsheetDrag>
    </>
  );
};

export default BoothListSheet;
