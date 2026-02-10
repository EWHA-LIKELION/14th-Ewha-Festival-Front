/**
 * Timepicker 컴포넌트 (시간 범위 선택 UI)
 * 피그마 디자인에 맞춘 커스텀 버튼 + 숨겨진 time input 방식
 */

import React, { useRef } from 'react';

function Timepicker({
  startTime = '09:00',
  endTime = '18:00',
  isActive = true,
  onStartChange,
  onEndChange,
}) {
  const startRef = useRef(null);
  const endRef = useRef(null);

  const textColor = isActive ? 'text-gray-500' : 'text-[#b5bbc5]';

  return (
    <div className="flex items-center gap-2">
      {/* 시작 시간 */}
      <button
        type="button"
        onClick={() => isActive && startRef.current?.showPicker()}
        className="flex w-16 shrink-0 items-center justify-center overflow-clip rounded-[0.6875rem] border border-gray-100 bg-white px-5 py-3"
      >
        <span className={`text-center text-base leading-6 ${textColor}`}>{startTime}</span>
        <input
          ref={startRef}
          type="time"
          value={startTime}
          onChange={(e) => onStartChange?.(e.target.value)}
          className="invisible absolute h-0 w-0"
          tabIndex={-1}
        />
      </button>

      <span className="shrink-0 text-center text-xs leading-4 text-black">~</span>

      {/* 종료 시간 */}
      <button
        type="button"
        onClick={() => isActive && endRef.current?.showPicker()}
        className="flex w-16 shrink-0 items-center justify-center overflow-clip rounded-[0.6875rem] border border-gray-100 bg-white px-5 py-3"
      >
        <span className={`text-center text-base leading-6 ${textColor}`}>{endTime}</span>
        <input
          ref={endRef}
          type="time"
          value={endTime}
          onChange={(e) => onEndChange?.(e.target.value)}
          className="invisible absolute h-0 w-0"
          tabIndex={-1}
        />
      </button>
    </div>
  );
}

export default Timepicker;
