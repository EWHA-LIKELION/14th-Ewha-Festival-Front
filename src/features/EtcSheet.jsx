/**
 * 기타시설 바텀시트
 */

import { useState, useEffect } from 'react';
import BottomsheetDrag from '@/components/BottomsheetDrag';
import useBottomsheetStore from '@/store/useBottomsheetStore';
import Header from '@/components/Header';
import FilterBar from '@/components/FilterBar';
import TrashCard from '@/components/Card/TrashCard';
import trashData from '@/data/trashData.json';

// location 한글 변환
const LOCATION_LABELS = {
  MAIN_GATE: '정문',
  GRASS_GROUND: '잔디광장',
  SPORT_TRACK: '스포츠트랙',
  HYUUT_GIL: '휴웃길',
  WELCH_RYANG_AUDITORIUM: '대강당',
  EWHA_POSCO_BUILDING: '포스코관',
  STUDENT_UNION: '학생문화관',
  HUMAN_ECOLOGY_BUILDING: '생활환경관',
  HAK_GWAN: '학관',
  EDUCATION_BUILDING: '교육관',
};

// category 한글 변환
const CATEGORY_LABELS = {
  Trash: '쓰레기통',
  Dish: '다회용기',
  Gas: '부탄가스',
};

const EtcSheet = () => {
  const isFull = useBottomsheetStore((s) => s.isFull());
  const setSheetSize = useBottomsheetStore((s) => s.setSheetSize);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSheetSize('medium');
  }, [setSheetSize]);

  const handleSelectTrash = (item) => {
    setSelected(`${item.category}-${item.number}`);
  };

  // location별 그룹핑
  const grouped = trashData.reduce((acc, item) => {
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
          <FilterBar type="trash" />
          <p className="text-sm font-normal text-zinc-500">총 {trashData.length}개</p>
          <div className="flex flex-col gap-10">
            {Object.entries(grouped).map(([location, items]) => (
              <div key={location} className="flex flex-col gap-2">
                <h1 className="text-lg font-semibold">{LOCATION_LABELS[location] ?? location}</h1>
                {items.map((item) => (
                  <TrashCard
                    key={`${item.category}-${item.number}`}
                    title={`${CATEGORY_LABELS[item.category] ?? item.category} ${item.number}`}
                    description={item.description}
                    selected={selected === `${item.category}-${item.number}`}
                    onClick={() => handleSelectTrash(item)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </BottomsheetDrag>
    </>
  );
};

export default EtcSheet;
