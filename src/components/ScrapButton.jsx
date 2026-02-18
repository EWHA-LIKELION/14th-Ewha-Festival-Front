/**
 * ScrapButton 컴포넌트
 */

import React, { useState } from 'react';

const ScrapButton = ({ initialScrapped = false, count = 0, onToggle }) => {
  const [isScrapped, setIsScrapped] = useState(initialScrapped);
  const [scrapCount, setScrapCount] = useState(count);

  const formatCount = (num) => {
    if (!num) return '00';
    return String(num).padStart(2, '0');
  };

  const handleClick = (e) => {
    e.stopPropagation();

    const next = !isScrapped;
    setIsScrapped(next);

    setScrapCount((prev) => (next ? prev + 1 : prev - 1));

    if (onToggle) onToggle(next);
  };

  return (
    <button onClick={handleClick} className="flex cursor-pointer flex-col items-center">
      {/* 상태에 따라 아이콘 변경 */}
      <img
        src={isScrapped ? '/icons/icon-scrap-active.svg' : '/icons/icon-scrap.svg'}
        alt="scrap"
      />

      {/* 숫자도 상태 반영 */}
      <p className={`text-xs leading-4 ${isScrapped ? 'text-emerald-500' : 'text-gray-300'}`}>
        {formatCount(scrapCount)}
      </p>
    </button>
  );
};

export default ScrapButton;
