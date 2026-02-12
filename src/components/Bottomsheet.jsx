import React, { useState, useRef, useCallback, useEffect } from 'react';
import Scrim from '@/components/Scrim';

// Scrim 없을때 : 각 size별 Bottomsheet 전체 높이
const SNAP_HEIGHTS = {
  small: 148,
  medium: 468,
  large: 628,
};

const SIZE_ORDER = ['small', 'medium', 'large'];

//
// —————————————————————— Scrim 있을때 : Bottomsheet 전체 높이 ——————————————————————

const SHEET_HEIGHT_CLASS = {
  small: 'h-[34.5rem]',
  medium: 'h-[24rem]',
  large: 'h-[18.25rem]',
};

const getNearestSize = (height) => {
  return SIZE_ORDER.reduce(
    (nearest, s) =>
      Math.abs(SNAP_HEIGHTS[s] - height) < Math.abs(SNAP_HEIGHTS[nearest] - height) ? s : nearest,
    'small',
  );
};

const Bottomsheet = ({ size = 'medium', hasScrim = false, onClose, onSizeChange, children }) => {
  const [currentSize, setCurrentSize] = useState(size);
  const [dragHeight, setDragHeight] = useState(null);
  const isDragging = dragHeight !== null;

  const startYRef = useRef(0);
  const startHeightRef = useRef(0);
  const dragHeightRef = useRef(null);

  useEffect(() => {
    setCurrentSize(size);
  }, [size]);

  const handlePointerDown = useCallback(
    (e) => {
      if (hasScrim) return;
      e.preventDefault();
      startYRef.current = e.clientY;
      startHeightRef.current = SNAP_HEIGHTS[currentSize];

      const handlePointerMove = (moveEvent) => {
        const delta = startYRef.current - moveEvent.clientY;
        const newHeight = Math.max(
          SNAP_HEIGHTS.small,
          Math.min(SNAP_HEIGHTS.large, startHeightRef.current + delta),
        );
        dragHeightRef.current = newHeight;
        setDragHeight(newHeight);
      };

      const handlePointerUp = () => {
        const height = dragHeightRef.current;
        if (height !== null) {
          const nearest = getNearestSize(height);
          setCurrentSize(nearest);
          onSizeChange?.(nearest);
        }
        dragHeightRef.current = null;
        setDragHeight(null);
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
      };

      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    },
    [hasScrim, currentSize, onSizeChange],
  );

  //
  // —————————————————————— Scrim 없는 타입 : inline style로 높이 제어 ——————————————————————

  const sheetStyle = !hasScrim
    ? {
        height: isDragging ? `${dragHeight}px` : `${SNAP_HEIGHTS[currentSize]}px`,
        transition: isDragging ? 'none' : 'height 0.3s ease',
      }
    : undefined;

  return (
    <>
      {hasScrim && <Scrim onClick={onClose} />}

      <div
        className={`fixed bottom-0 left-1/2 z-50 flex w-full max-w-98 -translate-x-1/2 flex-col overflow-clip rounded-t-3xl bg-white shadow-[0px_-2px_10px_0px_rgba(0,0,0,0.09)] ${
          hasScrim ? SHEET_HEIGHT_CLASS[size] : ''
        }`}
        style={sheetStyle}
      >
        {/* Header 영역 */}
        <div
          className={`flex shrink-0 flex-col items-center justify-end px-4 pt-2 ${
            hasScrim ? 'h-8' : 'h-6 cursor-grab touch-none active:cursor-grabbing'
          }`}
          onPointerDown={!hasScrim ? handlePointerDown : undefined}
        >
          {hasScrim ? (
            <button
              type="button"
              onClick={onClose}
              className="flex size-6 items-center justify-center"
            >
              <img src="/icons/icon-chevrondown.svg" alt="닫기" />
            </button>
          ) : (
            <div className="h-0.75 w-6.5 rounded-full bg-gray-300" />
          )}
        </div>

        {/* Content 영역*/}
        <div className="w-full flex-1 overflow-x-clip overflow-y-auto">{children}</div>
      </div>
    </>
  );
};

export default Bottomsheet;
