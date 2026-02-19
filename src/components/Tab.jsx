/**
 * Tab 컴포넌트 (variant 종류 : 2가지 - text / underline)
 *
 * Tab Type 1 (variant="text")  : 텍스트만 표시, 간격 1rem (예: 부스 / 공연)
 * Tab Type 2 (variant="underline") : 텍스트 + 하단 언더라인 인디케이터 (예: 리스트 / 후기)
 */

import React from 'react';

const TAB_STYLE = {
  active: 'text-emerald-500',
  inactive: 'text-gray-400',
};

function Tab({ variant = 'text', tabs = [], activeIndex = 0, onChange }) {
  const handleTabClick = (index) => {
    if (onChange) {
      onChange(index);
    }
  };

  if (variant === 'underline') {
    return (
      <div className="relative h-9 w-88">
        {/* 전체 너비 배경 라인 */}
        <div className="absolute top-8 left-0 h-0.5 w-88 bg-gray-100" />

        {/* 탭 아이템 목록 */}
        <div className="absolute top-0 left-0 flex items-start gap-0">
          {tabs.map((label, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={label}
                type="button"
                onClick={() => handleTabClick(index)}
                className="flex h-9 w-20 flex-col items-center gap-2"
              >
                <span
                  className={`text-center text-lg leading-6 font-semibold whitespace-nowrap ${isActive ? TAB_STYLE.active : TAB_STYLE.inactive}`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* 이동하는 언더라인 인디케이터 */}
        <div
          className="absolute top-8 z-10 h-0.5 w-20 bg-emerald-500 transition-[left] duration-300 ease-in-out"
          style={{ left: `${activeIndex * 5}rem` }}
        />
      </div>
    );
  }

  // variant === 'text' (기본)
  return (
    <div className="flex items-center gap-4">
      {tabs.map((label, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={label}
            type="button"
            onClick={() => handleTabClick(index)}
            className={`text-center text-lg leading-6 font-semibold whitespace-nowrap ${isActive ? TAB_STYLE.active : TAB_STYLE.inactive}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default Tab;
