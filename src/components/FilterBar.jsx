/**
 * FilterBar 컴포넌트 (type 종류: 3가지 - booth, show)
 *
 * - booth       : [설정] [주관] [카테고리] [요일] [위치]
 * - show        : [설정] [카테고리] [요일] [위치]
 * - trash       : [설정] [카테고리] [위치]
 */

import Chip from '@/components/Chip';

const FILTER_BUTTON_BASE =
  'flex shrink-0 items-center justify-center rounded-3xl border p-2 size-8';
const FILTER_BUTTON_ACTIVE = 'border-emerald-600 bg-emerald-50 text-emerald-600';
const FILTER_BUTTON_INACTIVE = 'border-zinc-200 bg-white text-zinc-500';

function FilterBar({
  type = 'booth',
  filters = {},
  onFilterClick,
  onFilterDelete,
  onSettingClick,
}) {
  const { subject, category, day, location } = filters;
  const hasActiveFilter = !!(subject?.value || category?.value || day?.value || location?.value);

  return (
    <div className="flex items-center gap-2.5">
      {/* 설정 버튼 */}
      <button
        type="button"
        onClick={onSettingClick}
        className={`${FILTER_BUTTON_BASE} ${hasActiveFilter ? FILTER_BUTTON_ACTIVE : FILTER_BUTTON_INACTIVE}`}
      >
        <img
          src="/icons/icon-filter.svg"
          alt="필터 설정"
          className={`size-3 ${hasActiveFilter ? '' : 'grayscale filter'}`}
        />
      </button>

      {/* 필터 칩 목록 */}
      <div className="flex items-center gap-2">
        {type === 'booth' && (
          <Chip
            variant="filter"
            text="주관"
            selectedValue={subject?.value}
            isSelected={!!subject?.value}
            onClick={() => onFilterClick?.('subject')}
            onDelete={() => onFilterDelete?.('subject')}
          />
        )}
        <Chip
          variant="filter"
          text="카테고리"
          selectedValue={category?.value}
          isSelected={!!category?.value}
          onClick={() => onFilterClick?.('category')}
          onDelete={() => onFilterDelete?.('category')}
        />
        {(type === 'booth' || type === 'show') && (
          <Chip
            variant="filter"
            text="요일"
            selectedValue={day?.value}
            isSelected={!!day?.value}
            onClick={() => onFilterClick?.('day')}
            onDelete={() => onFilterDelete?.('day')}
          />
        )}
        <Chip
          variant="filter"
          text="위치"
          selectedValue={location?.value}
          isSelected={!!location?.value}
          onClick={() => onFilterClick?.('location')}
          onDelete={() => onFilterDelete?.('location')}
        />
      </div>
    </div>
  );
}

export default FilterBar;
