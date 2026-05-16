/**
 * 드래그 되고 Scrim 없는 Bottomsheet
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import useBottomsheetStore from '@/store/useBottomsheetStore';
import { SHEET_SNAP_HEIGHTS as SNAP_HEIGHTS } from '@/constants/bottomsheet';

const FULL_THRESHOLD = (SNAP_HEIGHTS.large + window.innerHeight) / 2;

const getNearestSize = (height) => {
  if (height >= FULL_THRESHOLD) return 'full';
  return ['small', 'medium', 'large'].reduce(
    (nearest, s) =>
      Math.abs(SNAP_HEIGHTS[s] - height) < Math.abs(SNAP_HEIGHTS[nearest] - height) ? s : nearest,
    'small',
  );
};

const BottomsheetDrag = ({ children, scrollContainerRef }) => {
  const { sheetSize, setSheetSize, isDragging, setIsDragging } = useBottomsheetStore();
  const [dragHeight, setDragHeight] = useState(null);

  const startYRef = useRef(0);
  const startHeightRef = useRef(0);
  const dragHeightRef = useRef(null);
  const internalScrollRef = useRef(null);
  const containerRef = scrollContainerRef || internalScrollRef;

  const handlePointerDown = useCallback(
    (e) => {
      e.preventDefault();
      startYRef.current = e.clientY;
      startHeightRef.current = sheetSize === 'full' ? window.innerHeight : SNAP_HEIGHTS[sheetSize];

      const handlePointerMove = (moveEvent) => {
        const delta = startYRef.current - moveEvent.clientY;
        const newHeight = Math.max(SNAP_HEIGHTS.small, startHeightRef.current + delta);
        dragHeightRef.current = newHeight;
        setDragHeight(newHeight);
        setIsDragging(true);
      };

      const handlePointerUp = () => {
        const height = dragHeightRef.current;
        if (height !== null) {
          const nearest = getNearestSize(height);
          setSheetSize(nearest);
        }
        dragHeightRef.current = null;
        setDragHeight(null);
        setIsDragging(false);
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
      };

      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    },
    [sheetSize, setSheetSize, setIsDragging],
  );

  const isFull = sheetSize === 'full' && !isDragging;
  const isActuallyDragging = dragHeight !== null;

  const sheetStyle = (() => {
    if (isActuallyDragging) {
      const clamped = Math.min(dragHeight, window.innerHeight);
      return { height: `${clamped}px`, transition: 'none' };
    }
    if (isFull) {
      return { height: '100dvh', transition: 'height 0.3s ease' };
    }
    return {
      height: `calc(${SNAP_HEIGHTS[sheetSize]}px + env(safe-area-inset-bottom))`,
      transition: 'height 0.3s ease',
    };
  })();

  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;

    let lastTouchY = null;

    const handleTouchStart = (e) => {
      // touchstart 단계부터 막아야 외부(지도 라이브러리)가 팬 추적을 시작하지 않음
      e.stopPropagation();
      lastTouchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      // 시트 내부 스크롤은 어떤 경우에도 외부(지도)로 전파되지 않도록 차단
      e.stopPropagation();

      const { scrollTop, scrollHeight, clientHeight } = el;
      const currentY = e.touches[0].clientY;
      const diff = lastTouchY === null ? 0 : lastTouchY - currentY;
      lastTouchY = currentY;

      const isAtTop = scrollTop <= 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;
      const isScrollingDown = diff > 0;
      const isScrollingUp = diff < 0;

      // 경계에 도달했을 때는 default까지 막아 브라우저 native overscroll(체인 스크롤) 방지
      if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      lastTouchY = null;
    };

    const handleWheel = (e) => {
      e.stopPropagation();

      const { scrollTop, scrollHeight, clientHeight } = el;
      const isAtTop = scrollTop <= 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
        e.preventDefault();
      }
    };

    // Pointer Events도 함께 차단 (react-zoom-pan-pinch가 내부적으로 pointer 사용)
    const stopPointer = (e) => {
      e.stopPropagation();
    };

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });
    el.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('pointerdown', stopPointer);
    el.addEventListener('pointermove', stopPointer);
    el.addEventListener('pointerup', stopPointer);

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
      el.removeEventListener('touchcancel', handleTouchEnd);
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('pointerdown', stopPointer);
      el.removeEventListener('pointermove', stopPointer);
      el.removeEventListener('pointerup', stopPointer);
    };
  }, [containerRef]);

  return (
    <div
      className={`reactive-width shadow-up-md fixed bottom-0 left-1/2 z-10 flex w-full -translate-x-1/2 flex-col bg-white ${
        isFull ? 'rounded-none' : 'overflow-clip rounded-t-3xl'
      }`}
      style={{
        ...sheetStyle,
        paddingTop: isFull ? 'env(safe-area-inset-top)' : undefined,
        paddingBottom: 'calc(3.75rem + env(safe-area-inset-bottom))',
      }}
    >
      <div
        className={`cursor-grab touch-none flex-col items-center px-4 pt-5 pb-1 active:cursor-grabbing ${
          isFull ? 'absolute top-0 z-20 flex w-full' : 'flex shrink-0'
        }`}
        onPointerDown={handlePointerDown}
      >
        {!isFull && <div className="h-0.75 w-6.5 rounded-full bg-zinc-300" />}
      </div>

      {/* 헤더 영역 padding */}
      <div
        ref={containerRef}
        className={`relative w-full flex-1 overflow-y-auto ${isFull ? 'pt-18' : ''}`}
        style={{ overscrollBehavior: 'contain', touchAction: 'pan-y' }}
      >
        {children}
      </div>

      {isFull && (
        <div className="reactive-width fixed bottom-20 left-1/2 -translate-x-1/2">
          <div className="flex justify-center">
            <button
              onClick={() => setSheetSize('medium')}
              className="shadow-down-lg flex items-center gap-1.5 rounded-full bg-emerald-600 px-5 py-2.5 text-base leading-6 font-medium text-white"
            >
              <img src="/icons/icon-map-pin.svg" alt="map" />
              지도보기
            </button>
          </div>
          <div style={{ height: 'env(safe-area-inset-bottom)' }} />
        </div>
      )}
    </div>
  );
};

export default BottomsheetDrag;
