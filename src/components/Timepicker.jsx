/**
 * Timepicker 컴포넌트 (시간 범위 선택 UI)
 * 피그마 디자인에 맞춘 커스텀 버튼 + 투명(원래 ㅡ숨겨져 있었는데 투명으로 변경했음) time input 방식
 */

import React from 'react';

function Timepicker({
  startTime = '09:00',
  endTime = '18:00',
  isActive = true,
  onStartChange,
  onEndChange,
}) {
  const textColor = isActive ? 'text-gray-500' : 'text-[#b5bbc5]';

  return (
    <div className="flex items-center gap-2">
      {/* 시작 시간 */}
      <div className="relative flex w-16 shrink-0 items-center justify-center overflow-clip rounded-[0.6875rem] border border-gray-100 bg-white px-5 py-3">
        <span className={`text-center text-base leading-6 ${textColor}`}>{startTime}</span>
        {isActive && (
          <input
            type="time"
            value={startTime}
            onChange={(e) => onStartChange?.(e.target.value)}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        )}
      </div>

      <span className="shrink-0 text-center text-xs leading-4 text-black">~</span>

      {/* 종료 시간 */}
      <div className="relative flex w-16 shrink-0 items-center justify-center overflow-clip rounded-[0.6875rem] border border-gray-100 bg-white px-5 py-3">
        <span className={`text-center text-base leading-6 ${textColor}`}>{endTime}</span>
        {isActive && (
          <input
            type="time"
            value={endTime}
            onChange={(e) => onEndChange?.(e.target.value)}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        )}
      </div>
    </div>
  );
}

export default Timepicker;
