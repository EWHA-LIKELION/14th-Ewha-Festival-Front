import { useCallback, useRef } from 'react';
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

// 포커스는 항상 시트 medium 기준 — 클릭 핸들러들이 진입 시 medium으로 맞춤
const getFocusSheetHeight = () => SHEET_SNAP_HEIGHTS.medium + getSafeAreaInsetBottom();

const computeTargetTransform = (W, H, svgX, svgY, scale) => {
  const renderScale = H / SVG_HEIGHT;
  const cx = svgX * renderScale;
  const cy = svgY * renderScale;
  const sheetHeight = getFocusSheetHeight();
  const visibleCenterY = TOP_OFFSET + (H - sheetHeight - TOP_OFFSET) / 2;
  return {
    x: W / 2 - cx * scale,
    y: visibleCenterY - cy * scale,
  };
};

const useMapFocus = () => {
  const mapRef = useRef(null);
  const transformRef = useRef(null);

  const moveFocusToPoint = useCallback((svgX, svgY, zoomScale, duration = 400) => {
    if (!transformRef.current || !mapRef.current) return;
    const W = mapRef.current.clientWidth;
    const H = mapRef.current.clientHeight;
    const { x, y } = computeTargetTransform(W, H, svgX, svgY, zoomScale);
    transformRef.current.setTransform(x, y, zoomScale, duration);
  }, []);

  const moveFocusToBuilding = useCallback(
    (buildingId) => {
      const center = BUILDING_CENTERS[buildingId];
      if (!center) return;
      moveFocusToPoint(center.x, center.y, MAP_CLICK_ZOOM_SCALE);
    },
    [moveFocusToPoint],
  );

  const getInitialPosition = useCallback((svgX, svgY, scale) => {
    return computeTargetTransform(window.innerWidth, window.innerHeight, svgX, svgY, scale);
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
