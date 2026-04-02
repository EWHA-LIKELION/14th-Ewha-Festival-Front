/**
 * FilterBar 컴포넌트 (type 종류: 3가지 - booth, show, etc)
 *
 * - booth : [설정] [주관] [카테고리] [요일] [위치]
 * - show  : [설정] [주관] [카테고리] [요일]
 * - etc   : [설정] [카테고리] [위치]
 */

import Chip from '@/components/Chip';
import { filterConfig } from '@/configs/filterConfig';
import { getLabel } from '@/utils/labelHelper';
import useFilterStore from '@/store/useFilterStore';
import useFilterSheetStore from '@/store/useFilterSheetStore';

const FILTER_BUTTON_BASE =
  'flex shrink-0 items-center justify-center rounded-3xl border p-2 size-8';
const FILTER_BUTTON_ACTIVE = 'border-emerald-600 bg-emerald-50 text-emerald-600';
const FILTER_BUTTON_INACTIVE = 'border-zinc-200 bg-white text-zinc-500';

function FilterBar({ type = 'booth' }) {
  // 전역 상태에서 현재 타입의 필터 가져오기
  const filters = useFilterStore((state) => state.filters[type]) || {};
  const openSheet = useFilterSheetStore((state) => state.openSheet);

  const config = filterConfig[type] || {};
  const { host, category, day, location } = filters;
  const hasActiveFilter = !!(
    (host && host.length > 0) ||
    (category && category.length > 0) ||
    (day && day.length > 0) ||
    (location && location.length > 0)
  );

  // 설정 버튼 클릭 → 필터시트 열기
  const handleSettingClick = () => {
    openSheet(type);
  };

  // 칩 클릭 → 필터시트 열기
  const handleFilterClick = (filterKey) => {
    openSheet(type);
  };

  // 전체 필터 삭제
  const handleDeleteFilter = (filterKey) => {
    const setFilter = useFilterStore.getState().setFilter;
    setFilter(type, filterKey, []);
  };

  // 여러 값을 쉼표로 구분된 문자열로 변환
  const getFilterLabels = (values, options) => {
    if (!values || values.length === 0) return null;
    return values.map((value) => getLabel(value, options)).join(', ');
  };

  return (
    <div className="flex items-center gap-2.5 overflow-x-auto">
      {/* 설정 버튼 */}
      <button
        type="button"
        onClick={handleSettingClick}
        className={`${FILTER_BUTTON_BASE} ${hasActiveFilter ? FILTER_BUTTON_ACTIVE : FILTER_BUTTON_INACTIVE}`}
      >
        <svg
          width="10"
          height="13"
          viewBox="0 0 10 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 7C7.17157 7 6.5 7.67157 6.5 8.5C6.5 9.15575 6.92152 9.71113 7.50781 9.91504C7.50307 9.94268 7.5 9.971 7.5 10V12.5C7.5 12.7761 7.72386 13 8 13C8.27614 13 8.5 12.7761 8.5 12.5V10C8.5 9.97095 8.49597 9.94274 8.49121 9.91504C9.07796 9.71138 9.5 9.15608 9.5 8.5C9.5 7.67157 8.82843 7 8 7ZM8 7C8.27614 7 8.5 6.77614 8.5 6.5V0.5C8.5 0.223858 8.27614 0 8 0C7.72386 0 7.5 0.223858 7.5 0.5V6.5C7.5 6.77614 7.72386 7 8 7ZM1.5 12.5V5C1.5 4.971 1.50307 4.94268 1.50781 4.91504C0.921518 4.71113 0.5 4.15575 0.5 3.5C0.5 2.84413 0.92136 2.2878 1.50781 2.08398C1.50318 2.05664 1.5 2.02867 1.5 2V0.5C1.5 0.223858 1.72386 0 2 0C2.27614 0 2.5 0.223858 2.5 0.5V2C2.5 2.02872 2.49586 2.05659 2.49121 2.08398C3.07812 2.28755 3.5 2.84381 3.5 3.5C3.5 4.15608 3.07796 4.71138 2.49121 4.91504C2.49597 4.94274 2.5 4.97095 2.5 5V12.5C2.5 12.7761 2.27614 13 2 13C1.72386 13 1.5 12.7761 1.5 12.5Z"
            stroke={hasActiveFilter ? '#56A85B' : '#9f9fa9'}
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* 필터 칩 목록 */}
      <div className="flex flex-nowrap items-center gap-2">
        {/* 주관 (부스만) */}
        {config.hosts &&
          (host && host.length > 0 ? (
            // 선택된 값들을 하나의 칩에 쉼표로 표시
            <Chip
              variant="filter"
              text="주관"
              selectedValue={getFilterLabels(host, config.hosts)}
              isSelected={true}
              onClick={() => handleFilterClick('host')}
              onDelete={() => handleDeleteFilter('host')}
            />
          ) : (
            // 선택 안 됨 - 기본 칩
            <Chip
              variant="filter"
              text="주관"
              isSelected={false}
              onClick={() => handleFilterClick('host')}
            />
          ))}

        {/* 카테고리 */}
        {config.categories &&
          (category && category.length > 0 ? (
            // 선택된 값들을 하나의 칩에 쉼표로 표시
            <Chip
              variant="filter"
              text="카테고리"
              selectedValue={getFilterLabels(category, config.categories)}
              isSelected={true}
              onClick={() => handleFilterClick('category')}
              onDelete={() => handleDeleteFilter('category')}
            />
          ) : (
            // 선택 안 됨 - 기본 칩
            <Chip
              variant="filter"
              text="카테고리"
              isSelected={false}
              onClick={() => handleFilterClick('category')}
            />
          ))}

        {/* 요일 (부스, 공연만) */}
        {config.days &&
          (day && day.length > 0 ? (
            // 선택된 값들을 하나의 칩에 쉼표로 표시
            <Chip
              variant="filter"
              text="요일"
              selectedValue={getFilterLabels(day, config.days)}
              isSelected={true}
              onClick={() => handleFilterClick('day')}
              onDelete={() => handleDeleteFilter('day')}
            />
          ) : (
            // 선택 안 됨 - 기본 칩
            <Chip
              variant="filter"
              text="요일"
              isSelected={false}
              onClick={() => handleFilterClick('day')}
            />
          ))}

        {/* 위치 */}
        {config.locations &&
          (location && location.length > 0 ? (
            // 선택된 값들을 하나의 칩에 쉼표로 표시
            <Chip
              variant="filter"
              text="위치"
              selectedValue={getFilterLabels(location, config.locations)}
              isSelected={true}
              onClick={() => handleFilterClick('location')}
              onDelete={() => handleDeleteFilter('location')}
            />
          ) : (
            // 선택 안 됨 - 기본 칩
            <Chip
              variant="filter"
              text="위치"
              isSelected={false}
              onClick={() => handleFilterClick('location')}
            />
          ))}
      </div>
    </div>
  );
}

export default FilterBar;
