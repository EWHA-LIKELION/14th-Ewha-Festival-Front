/**
 * 드래그 되고 Scrim 없는 ㅍBottomsheet
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';

const SNAP_HEIGHTS = {
  small: 95,
  medium: 468,
  large: 628,
  full: window.innerHeight,
};

const FULL_THRESHOLD = (SNAP_HEIGHTS.large + window.innerHeight) / 2;

const getNearestSize = (height) => {
  if (height >= FULL_THRESHOLD) return 'full';
  return ['small', 'medium', 'large'].reduce(
    (nearest, s) =>
      Math.abs(SNAP_HEIGHTS[s] - height) < Math.abs(SNAP_HEIGHTS[nearest] - height) ? s : nearest,
    'small',
  );
};

const BottomsheetDrag = ({ size = 'medium', onSizeChange, children }) => {
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
      e.preventDefault();
      startYRef.current = e.clientY;
      startHeightRef.current =
        currentSize === 'full' ? window.innerHeight : SNAP_HEIGHTS[currentSize];

      const handlePointerMove = (moveEvent) => {
        const delta = startYRef.current - moveEvent.clientY;
        const newHeight = Math.max(SNAP_HEIGHTS.small, startHeightRef.current + delta);
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
    [currentSize, onSizeChange],
  );

  const isFull = currentSize === 'full';

  const sheetStyle = (() => {
    if (isDragging) {
      const clamped = Math.min(dragHeight, window.innerHeight);
      return { height: `${clamped}px`, transition: 'none' };
    }
    if (isFull) {
      return { height: '100dvh', transition: 'height 0.3s ease' };
    }
    return {
      height: `${SNAP_HEIGHTS[currentSize]}px`,
      transition: 'height 0.3s ease',
    };
  })();

  return (
    <div
      className={`reactive-width shadow-up-md fixed bottom-0 left-1/2 z-5 flex w-full -translate-x-1/2 flex-col overflow-clip bg-white pb-15 ${
        isFull ? 'rounded-none' : 'rounded-t-3xl'
      }`}
      style={sheetStyle}
    >
      <div
        className={`cursor-grab touch-none flex-col items-center px-4 pt-5 pb-3 active:cursor-grabbing ${
          isFull ? 'absolute top-0 z-10 flex w-full' : 'flex shrink-0'
        }`}
        onPointerDown={handlePointerDown}
      >
        {!isFull && <div className="h-0.75 w-6.5 rounded-full bg-gray-300" />}
      </div>

      <div className="relative w-full flex-1 overflow-x-clip overflow-y-auto">{children}</div>
    </div>
  );
};

export default BottomsheetDrag;
