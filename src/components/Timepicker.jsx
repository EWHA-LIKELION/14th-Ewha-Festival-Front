/**
 * Timepicker 컴포넌트 (시간 범위 선택 UI)
 * 피그마 디자인에 맞춘 커스텀 버튼 + 투명(원래 ㅡ숨겨져 있었는데 투명으로 변경했음) time input 방식
 * 종료 시간이 시작 시간보다 빠르면 변경을 거부하고 빨간 테두리로 에러 표시
 */

import React, { useState, useEffect, useRef } from 'react';

function Timepicker({
  startTime,
  endTime,
  isSelected,
  onStartChange,
  onEndChange,
  minTime,
  maxTime,
  onError,
}) {
  const [hasError, setHasError] = useState(false);
  const errorTimer = useRef(null);

  // 일단 1초 후에 자동 해제되게 했음
  // (자세한 구현은 기디에서 알려준 스타일로 수정할 예정입니다!!)

  const triggerError = (message) => {
    setHasError(true);

    onError?.(message);

    if (errorTimer.current) clearTimeout(errorTimer.current);
    errorTimer.current = setTimeout(() => setHasError(false), 1000);
  };

  useEffect(() => {
    return () => {
      if (errorTimer.current) clearTimeout(errorTimer.current);
    };
  }, []);

  const handleStartChange = (newStart) => {
    if (newStart < minTime || newStart >= endTime) {
      triggerError('공식 운영시간 이외의 시간은 설정할 수 없습니다.');
      return;
    }
    onStartChange?.(newStart);
  };

  const handleEndChange = (newEnd) => {
    if (newEnd > maxTime || newEnd <= startTime) {
      triggerError('공식 운영시간 이외의 시간은 설정할 수 없습니다.');
      return;
    }
    onEndChange?.(newEnd);
  };

  const textColor = isSelected ? 'text-zinc-500' : 'text-zinc-300';
  const borderClass = hasError ? 'border-red-500' : 'border-zinc-100';

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
          min={minTime}
          max={endTime}
          onChange={(e) => handleStartChange(e.target.value)}
          className={`absolute inset-0 z-10 opacity-0 ${
            isSelected ? 'cursor-pointer' : 'cursor-not-allowed'
          }`}
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
          min={startTime}
          max={maxTime}
          onChange={(e) => handleEndChange(e.target.value)}
          className={`absolute inset-0 z-10 opacity-0 ${
            isSelected ? 'cursor-pointer' : 'cursor-not-allowed'
          }`}
        />
      </div>
    </div>
  );
}

export default Timepicker;
