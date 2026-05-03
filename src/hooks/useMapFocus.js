import { useCallback, useEffect, useRef } from 'react';
import useBottomsheetStore from '@/store/useBottomsheetStore';
import { BUILDING_CENTERS, MAP_CLICK_ZOOM_SCALE, SVG_HEIGHT } from '@/constants/mapCoordinates';
import { SHEET_SNAP_HEIGHTS } from '@/constants/bottomsheet';

const TOP_OFFSET = 108;

// 시트는 CSS상 height = SHEET_SNAP_HEIGHTS[size] + env(safe-area-inset-bottom) 로 렌더되므로
// 가시 영역 하단 경계 계산에도 safe-area-inset-bottom 만큼을 더해야 함
const getSafeAreaInsetBottom = () => {
  if (typeof document === 'undefined') return 0;
  const el = document.createElement('div');
  el.style.cssText =
    'position:fixed;visibility:hidden;bottom:0;left:0;height:env(safe-area-inset-bottom);';
  document.body.appendChild(el);
  const h = el.getBoundingClientRect().height;
  document.body.removeChild(el);
  return h;
};

// 시트가 large/full로 차있어도 가시 영역이 너무 작아지지 않도록 medium으로 클램프
const normalizeSheetSizeForFocus = (size) =>
  size === 'large' || size === 'full' ? 'medium' : size;

const getEffectiveSheetHeight = (size) => {
  const base = SHEET_SNAP_HEIGHTS[size] ?? SHEET_SNAP_HEIGHTS.medium;
  return base + getSafeAreaInsetBottom();
};

const computeTargetTransform = (W, H, svgX, svgY, scale, sheetHeight) => {
  const renderScale = H / SVG_HEIGHT;
  const cx = svgX * renderScale;
  const cy = svgY * renderScale;
  const visibleCenterY = TOP_OFFSET + (H - sheetHeight - TOP_OFFSET) / 2;
  return {
    x: W / 2 - cx * scale,
    y: visibleCenterY - cy * scale,
  };
};

const useMapFocus = () => {
  const mapRef = useRef(null);
  const transformRef = useRef(null);
  const sheetSizeRef = useRef(useBottomsheetStore.getState().sheetSize);

  useEffect(() => {
    return useBottomsheetStore.subscribe((state) => {
      sheetSizeRef.current = state.sheetSize;
    });
  }, []);

  const moveFocusToPoint = useCallback(
    (svgX, svgY, zoomScale, duration = 400, overrideSheetSize) => {
      if (!transformRef.current || !mapRef.current) return;
      const W = mapRef.current.clientWidth;
      const H = mapRef.current.clientHeight;
      const effectiveSheetSize = normalizeSheetSizeForFocus(
        overrideSheetSize ?? sheetSizeRef.current,
      );
      const sheetHeight = getEffectiveSheetHeight(effectiveSheetSize);
      const { x, y } = computeTargetTransform(W, H, svgX, svgY, zoomScale, sheetHeight);
      transformRef.current.setTransform(x, y, zoomScale, duration);
    },
    [],
  );

  const moveFocusToBuilding = useCallback(
    (buildingId) => {
      const center = BUILDING_CENTERS[buildingId];
      if (!center) return;
      moveFocusToPoint(center.x, center.y, MAP_CLICK_ZOOM_SCALE);
    },
    [moveFocusToPoint],
  );

  const getInitialPosition = useCallback((svgX, svgY, scale, overrideSheetSize) => {
    const effectiveSheetSize = normalizeSheetSizeForFocus(
      overrideSheetSize ?? sheetSizeRef.current ?? 'medium',
    );
    const sheetHeight = getEffectiveSheetHeight(effectiveSheetSize);
    return computeTargetTransform(
      window.innerWidth,
      window.innerHeight,
      svgX,
      svgY,
      scale,
      sheetHeight,
    );
  }, []);

  return {
    mapRef,
    transformRef,
    moveFocusToPoint,
    moveFocusToBuilding,
    getInitialPosition,
  };
};

export default useMapFocus;
