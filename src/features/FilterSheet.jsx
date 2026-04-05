/**
 * 필터링 바텀시트
 */

import { useState } from 'react';
import BottomsheetScrim from '@/components/BottomsheetScrim';
import useFilterSheetStore from '@/store/useFilterSheetStore';
import useFilterStore from '@/store/useFilterStore';
import { filterConfig } from '@/configs/filterConfig';
import Chip from '@/components/Chip';

const FilterSheet = () => {
  const { type, isOpen, closeSheet } = useFilterSheetStore();
  const filters = useFilterStore((state) => state.filters[type]);
  const setFilter = useFilterStore((state) => state.setFilter);
  const resetFilter = useFilterStore((state) => state.resetFilter);

  // 로컬 임시 필터 상태 (적용 전까지)
  const [tempFilters, setTempFilters] = useState(filters || {});

  // scrap_ 접두사 제거하여 동일한 config 사용
  const configType = type?.replace('scrap_', '') || type;
  const config = filterConfig[configType] || {};

  if (!isOpen || !type) return null;

  // 필터 선택/해제 (다중 선택)
  const handleSelect = (filterKey, value) => {
    setTempFilters((prev) => {
      const currentValues = prev[filterKey] || [];
      const isSelected = currentValues.includes(value);

      return {
        ...prev,
        [filterKey]: isSelected
          ? currentValues.filter((v) => v !== value) // 이미 선택됨 → 제거
          : [...currentValues, value], // 선택 안됨 → 추가
      };
    });
  };

  // 취소
  const handleCancel = () => {
    setTempFilters({});
    closeSheet();
  };

  // 초기화
  const handleReset = () => {
    setTempFilters({});
    resetFilter(type);
    closeSheet();
  };

  // 적용
  const handleApply = () => {
    Object.entries(tempFilters).forEach(([key, value]) => {
      setFilter(type, key, value);
    });
    closeSheet();
  };

  return (
    <BottomsheetScrim onClose={handleCancel}>
      <div className="flex flex-col">
        {/* 필터 내용 */}
        <div className="space-y-6">
          {/* 주관 */}
          {config.host && (
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-black">주관</h3>
              <div className="flex flex-wrap gap-2">
                {config.host.map((option) => (
                  <Chip
                    key={option.value}
                    variant="bottomsheet"
                    text={option.label}
                    isSelected={(tempFilters.host || []).includes(option.value)}
                    onClick={() => handleSelect('host', option.value)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 카테고리 */}
          {config.category && (
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-black">카테고리</h3>
              <div className="flex flex-wrap gap-2">
                {config.category.map((option) => (
                  <Chip
                    key={option.value}
                    variant="bottomsheet"
                    text={option.label}
                    isSelected={(tempFilters.category || []).includes(option.value)}
                    onClick={() => handleSelect('category', option.value)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 요일 */}
          {config.day && (
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-black">요일</h3>
              <div className="flex flex-wrap gap-2">
                {config.day.map((option) => (
                  <Chip
                    key={option.value}
                    variant="bottomsheet"
                    text={option.label}
                    isSelected={(tempFilters.day || []).includes(option.value)}
                    onClick={() => handleSelect('day', option.value)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 위치 */}
          {config.location && (
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-black">위치</h3>
              <div className="flex flex-wrap gap-2">
                {config.location.map((option) => (
                  <Chip
                    key={option.value}
                    variant="bottomsheet"
                    text={option.label}
                    isSelected={(tempFilters.location || []).includes(option.value)}
                    onClick={() => handleSelect('location', option.value)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={handleReset}
            className="flex-5 rounded-lg bg-zinc-100 px-5 py-3 text-base font-medium text-zinc-500"
          >
            초기화
          </button>
          <button
            onClick={handleApply}
            className="flex-12 rounded-lg bg-emerald-600 px-5 py-3 text-base font-medium text-white"
          >
            결과 보기
          </button>
        </div>
      </div>
    </BottomsheetScrim>
  );
};

export default FilterSheet;
