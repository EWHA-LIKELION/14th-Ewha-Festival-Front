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

function FilterBar({ type = 'booth' }) {
  // 전역 상태에서 현재 타입의 필터 가져오기
  const filters = useFilterStore((state) => state.filters[type]) || {};
  const deleteFilter = useFilterStore((state) => state.deleteFilter);
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
    deleteFilter(type, filterKey);
  };

  // 여러 값을 쉼표로 구분된 문자열로 변환
  const getFilterLabels = (values, options) => {
    if (!values || values.length === 0) return null;
    return values.map((value) => getLabel(value, options)).join(', ');
  };

  return (
    <div className="flex items-center gap-2.5 overflow-x-auto">
      {/* 설정 버튼 */}
      <Chip variant="toggle" isSelected={hasActiveFilter} onClick={handleSettingClick} />

      {/* 필터 칩 목록 */}
      <div className="flex flex-nowrap items-center gap-2">
        {/* 주관 (부스만) */}
        {config.host &&
          (host && host.length > 0 ? (
            // 선택된 값들을 하나의 칩에 쉼표로 표시
            <Chip
              variant="filter"
              text="주관"
              selectedValue={getFilterLabels(host, config.host)}
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
        {config.category &&
          (category && category.length > 0 ? (
            // 선택된 값들을 하나의 칩에 쉼표로 표시
            <Chip
              variant="filter"
              text="카테고리"
              selectedValue={getFilterLabels(category, config.category)}
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
        {config.day &&
          (day && day.length > 0 ? (
            // 선택된 값들을 하나의 칩에 쉼표로 표시
            <Chip
              variant="filter"
              text="요일"
              selectedValue={getFilterLabels(day, config.day)}
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
        {config.location &&
          (location && location.length > 0 ? (
            // 선택된 값들을 하나의 칩에 쉼표로 표시
            <Chip
              variant="filter"
              text="위치"
              selectedValue={getFilterLabels(location, config.location)}
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
