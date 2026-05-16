/**
 * 기타시설 바텀시트
 */

import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import BottomsheetDrag from '@/components/BottomsheetDrag';
import useBottomsheetStore from '@/store/useBottomsheetStore';
import useFilterStore from '@/store/useFilterStore';
import Header from '@/components/Header';
import FilterBar from '@/components/FilterBar';
import EtcCard from '@/components/Card/EtcCard';
import etcData from '@/data/etcData.json';
import { getLabel, padNumber } from '@/utils/labelHelper';
import { BOOTH_LOCATION } from '@/constants/building';
import { ETC_CATEGORY, ETC_DESCRIPTION } from '@/constants/category';

const EtcSheet = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isFull = useBottomsheetStore((s) => s.isFull());
  const setSheetSize = useBottomsheetStore((s) => s.setSheetSize);
  const { focusPOI } = useOutletContext();
  const [selected, setSelected] = useState(false);
  const scrollContainerRef = useRef(null);

  const handleBack = () => navigate('/map/booths');

  useEffect(() => {
    const poi = location.state?.selectedPOI;
    if (poi) {
      const id = `${poi.category}-${poi.location}-${poi.number}`;
      setSelected(id);
      setTimeout(() => {
        document
          .getElementById(`etc-card-${id}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    }
  }, [location.state]);

  // 전역 필터 상태
  const filters = useFilterStore((state) => state.filters.etc);

  useEffect(() => {
    setSheetSize('medium');
  }, [setSheetSize]);

  useEffect(() => {
    if (filters.location?.length > 0) {
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [filters.location]);

  const handleSelectEtc = (item) => {
    const id = `${item.category}-${item.location}-${item.number}`;
    setSelected((prev) => {
      const next = prev === id ? false : id;
      const poiId = next ? `${item.location}-${item.category}-${padNumber(item.number)}` : null;
      focusPOI(poiId);
      if (next) setSheetSize('medium');
      return next;
    });
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
        <Header left="back" background="transparent" onBack={handleBack} />
      </div>
      <BottomsheetDrag scrollContainerRef={scrollContainerRef}>
        {isFull && <Header left="back" center="title" centerTitle="기타시설" isSheet />}
        <div className="flex flex-col gap-2 px-5 py-5">
          {/* 상단 고정 영역 (full 모드에서 sticky) */}
          <div
            className={`flex flex-col gap-4 ${
              isFull ? 'sticky top-0 z-10 -mx-5 -mt-5 bg-white px-5 pt-5 pb-2' : ''
            }`}
          >
            <FilterBar type="etc" />
            <p className="text-sm font-normal text-zinc-500">총 {filteredData.length}개</p>
          </div>
          <div className="flex flex-col gap-10">
            {Object.entries(grouped).map(([location, items]) => (
              <div key={location} className="flex flex-col gap-2">
                <h1 className="text-lg font-semibold">{getLabel(location, BOOTH_LOCATION)}</h1>
                {items.map((item) => (
                  <div
                    key={`${item.category}-${item.number}`}
                    id={`etc-card-${item.category}-${item.location}-${item.number}`}
                  >
                    <EtcCard
                      title={`${getLabel(item.category, ETC_CATEGORY)} ${item.number}`}
                      description={ETC_DESCRIPTION[item.category]}
                      selected={selected === `${item.category}-${item.location}-${item.number}`}
                      onClick={() => handleSelectEtc(item)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {filteredData.length === 0 && (
          <p className="mt-20 text-center text-base font-normal text-zinc-300">
            검색 결과가 없어요.
          </p>
        )}
      </BottomsheetDrag>
    </>
  );
};

export default EtcSheet;
