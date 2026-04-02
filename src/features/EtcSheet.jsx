/**
 * 기타시설 바텀시트
 */

import { useEffect, useState } from 'react';
import BottomsheetDrag from '@/components/BottomsheetDrag';
import useBottomsheetStore from '@/store/useBottomsheetStore';
import useFilterStore from '@/store/useFilterStore';
import Header from '@/components/Header';
import FilterBar from '@/components/FilterBar';
import TrashCard from '@/components/Card/TrashCard';
import etcData from '@/data/etcData.json';
import { getLabel } from '@/utils/labelHelper';
import { BOOTH_LOCATION } from '@/constants/building';
import { ETC_CATEGORY } from '@/constants/category';

const EtcSheet = () => {
  const isFull = useBottomsheetStore((s) => s.isFull());
  const setSheetSize = useBottomsheetStore((s) => s.setSheetSize);
  const [selected, setSelected] = useState(false);

  // 전역 필터 상태
  const filters = useFilterStore((state) => state.filters.etc);

  useEffect(() => {
    setSheetSize('medium');
  }, [setSheetSize]);

  const handleSelectTrash = (item) => {
    setSelected(`${item.category}-${item.number}`);
  };

  // 필터링된 데이터
  const filteredData = etcData.filter((item) => {
    if (
      filters.category &&
      filters.category.length > 0 &&
      !filters.category.includes(item.category)
    ) {
      return false;
    }
    if (
      filters.location &&
      filters.location.length > 0 &&
      !filters.location.includes(item.location)
    ) {
      return false;
    }
    return true;
  });

  // location별 그룹핑
  const grouped = filteredData.reduce((acc, item) => {
    if (!acc[item.location]) acc[item.location] = [];
    acc[item.location].push(item);
    return acc;
  }, {});

  return (
    <>
      <div className={isFull ? 'relative z-10' : 'relative z-20'}>
        <Header left="back" background="transparent" />
      </div>
      <BottomsheetDrag>
        {isFull && <Header left="back" center="title" centerTitle="기타시설" isSheet />}
        <div className="flex flex-col gap-4 p-5">
          <FilterBar type="etc" />
          <p className="text-sm font-normal text-zinc-500">총 {filteredData.length}개</p>
          <div className="flex flex-col gap-10">
            {Object.entries(grouped).map(([location, items]) => (
              <div key={location} className="flex flex-col gap-2">
                <h1 className="text-lg font-semibold">{getLabel(location, BOOTH_LOCATION)}</h1>
                {items.map((item) => (
                  <TrashCard
                    key={`${item.category}-${item.number}`}
                    title={`${getLabel(item.category, ETC_CATEGORY)} ${item.number}`}
                    description={item.description}
                    selected={selected === `${item.category}-${item.number}`}
                    onClick={() => handleSelectTrash(item)}
                  />
                ))}
              </div>
            ))}
          </div>
          {filteredData.length === 0 && (
            <p className="mt-20 text-center text-base font-normal text-zinc-300">
              검색 결과가 없어요.
            </p>
          )}
        </div>
      </BottomsheetDrag>
    </>
  );
};

export default EtcSheet;
