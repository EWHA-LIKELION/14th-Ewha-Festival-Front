/**
 * Timepicker 컴포넌트 (시간 범위 선택 UI)
 * 피그마 디자인에 맞춘 커스텀 버튼 + 투명(원래 ㅡ숨겨져 있었는데 투명으로 변경했음) time input 방식
 * 종료 시간이 시작 시간보다 빠르면 변경을 거부하고 빨간 테두리로 에러 표시
 */

import React, { useState, useEffect, useRef } from 'react';

function Timepicker({
  startTime = '09:00',
  endTime = '18:00',
  isSelected = true,
  onStartChange,
  onEndChange,
}) {
  const [hasError, setHasError] = useState(false);
  const errorTimer = useRef(null);

  // 일단 1초 후에 자동 해제되게 했음
  // (자세한 구현은 기디에서 알려준 스타일로 수정할 예정입니다!!)

  const triggerError = () => {
    setHasError(true);
    if (errorTimer.current) clearTimeout(errorTimer.current);
    errorTimer.current = setTimeout(() => setHasError(false), 1000);
  };

  useEffect(() => {
    return () => {
      if (errorTimer.current) clearTimeout(errorTimer.current);
    };
  }, []);

  const handleStartChange = (newStart) => {
    if (newStart >= endTime) {
      triggerError();
      return;
    }
    onStartChange?.(newStart);
  };

  const handleEndChange = (newEnd) => {
    if (newEnd <= startTime) {
      triggerError();
      return;
    }
    onEndChange?.(newEnd);
  };

  const textColor = isSelected ? 'text-gray-500' : 'text-[#b5bbc5]';
  const borderClass = hasError
    ? 'border-red-500'
    : 'border-gray-100';

  return (
    <div className="flex items-center gap-2">
      {/* ————————————————————— 시작 시간 ————————————————————— */}
      <div
        className={`relative flex w-16 shrink-0 items-center justify-center overflow-clip rounded-[0.6875rem] border ${borderClass} bg-white px-5 py-3 transition-colors duration-300`}
      >
        <span className={`text-center text-base leading-6 ${textColor}`}>{startTime}</span>
        <input
          type="time"
          value={startTime}
          onChange={(e) => handleStartChange(e.target.value)}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
      </div>

      <span className="shrink-0 text-center text-xs leading-4 text-black">~</span>

      {/* ————————————————————— 종료 시간 ————————————————————— */}
      <div
        className={`relative flex w-16 shrink-0 items-center justify-center overflow-clip rounded-[0.6875rem] border ${borderClass} bg-white px-5 py-3 transition-colors duration-300`}
      >
        <span className={`text-center text-base leading-6 ${textColor}`}>{endTime}</span>
        <input
          type="time"
          value={endTime}
          onChange={(e) => handleEndChange(e.target.value)}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
      </div>
    </div>
  );
}

export default Timepicker;
