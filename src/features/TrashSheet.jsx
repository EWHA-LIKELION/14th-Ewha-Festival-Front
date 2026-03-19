/**
 * 쓰레기통 바텀시트
 */

import { useState } from 'react';
import BottomsheetDrag from '@/components/BottomsheetDrag';
import useBottomsheetStore from '@/store/useBottomsheetStore';
import Header from '@/components/Header';
import Button from '@/components/Button';
import FilterBar from '@/components/FilterBar';
import TrashCard from '@/components/Card/TrashCard';

const totalNumber = 0;
const location = '생활환경관';
const category = '쓰레기통';
const number = '1';
const description = '00 부스 옆';

const BarrierFreeSheet = () => {
  const sheetSize = useBottomsheetStore((s) => s.sheetSize);
  const setSheetSize = useBottomsheetStore((s) => s.setSheetSize);

  const [selected, setSelected] = useState(false);

  const goMap = () => {
    setSheetSize('medium');
  };

  const handleSelectTrash = () => {
    setSelected(!selected); // ‼️ 추후 수정
  };

  return (
    <>
      {sheetSize !== 'full' && <Header left="back" background="transparent" />}
      <BottomsheetDrag>
        {sheetSize === 'full' && (
          <Header left="back" center="title" centerTitle="쓰레기통" isSheet />
        )}
        <div className={`${sheetSize === 'full' && 'pt-23'} flex flex-col gap-4 p-5`}>
          <FilterBar type="trash" />
          <p className="text-sm font-normal text-zinc-500">총 {totalNumber}개</p>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold">{location}</h1>
              <TrashCard
                title={`${category} ${number}`}
                description={description}
                selected={selected}
                onClick={handleSelectTrash}
              />
            </div>
          </div>
        </div>
        {sheetSize === 'full' && (
          <div className="fixed bottom-28 flex w-full justify-center">
            <Button onClick={goMap} circle shadow leftIcon="/icons/icon-map.svg" iconAlt="map">
              지도보기
            </Button>
          </div>
        )}
      </BottomsheetDrag>
    </>
  );
};

export default BarrierFreeSheet;
