import { useCallback, useRef } from 'react';
import { BUILDING_CENTERS, MAP_CLICK_ZOOM_SCALE, SVG_HEIGHT } from '@/constants/mapCoordinates';
import { SHEET_SNAP_HEIGHTS } from '@/constants/bottomsheet';

const TOP_OFFSET = 108;

// 시트는 CSS상 height = SHEET_SNAP_HEIGHTS[size] + env(safe-area-inset-bottom) 로 렌더되므로
// 가시 영역 하단 경계 계산에도 safe-area-inset-bottom 만큼을 더해야 함
// 매 호출마다 임시 div를 body에 붙이고 getBoundingClientRect를 읽으면 강제 리플로우가 발생하므로 캐시
// safe-area inset은 orientation 변경 시에만 바뀌므로 resize 이벤트로 무효화
let safeAreaInsetBottomCache = null;
if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    safeAreaInsetBottomCache = null;
  });
}
const getSafeAreaInsetBottom = () => {
  if (typeof document === 'undefined') return 0;
  if (safeAreaInsetBottomCache !== null) return safeAreaInsetBottomCache;
  const el = document.createElement('div');
  el.style.cssText =
    'position:fixed;visibility:hidden;bottom:0;left:0;height:env(safe-area-inset-bottom);';
  document.body.appendChild(el);
  const h = el.getBoundingClientRect().height;
  document.body.removeChild(el);
  safeAreaInsetBottomCache = h;
  return h;
};

// 포커스는 항상 시트 medium 기준 — 클릭 핸들러들이 진입 시 medium으로 맞춤
const getFocusSheetHeight = () => SHEET_SNAP_HEIGHTS.medium + getSafeAreaInsetBottom();

// rotation: 각도(deg), origin: { x, y } 로컬 좌표(렌더 px). origin이 없으면 회전 무시.
const computeTargetTransform = (W, H, svgX, svgY, scale, rotation = 0, origin = null) => {
  const renderScale = H / SVG_HEIGHT;
  const lx = svgX * renderScale;
  const ly = svgY * renderScale;

  // 회전 적용 (SVG 콘텐츠 div가 origin을 기준으로 회전된 상태)
  let rx = lx;
  let ry = ly;
  if (rotation !== 0 && origin) {
    const R = (rotation * Math.PI) / 180;
    const cosR = Math.cos(R);
    const sinR = Math.sin(R);
    const dx = lx - origin.x;
    const dy = ly - origin.y;
    rx = origin.x + dx * cosR - dy * sinR;
    ry = origin.y + dx * sinR + dy * cosR;
  }

  const sheetHeight = getFocusSheetHeight();
  const visibleCenterY = TOP_OFFSET + (H - sheetHeight - TOP_OFFSET) / 2;
  return {
    x: W / 2 - rx * scale,
    y: visibleCenterY - ry * scale,
  };
};

// getRotationState: () => ({ angle: number, origin: { x, y } | null })
const useMapFocus = (getRotationState) => {
  const mapRef = useRef(null);
  const transformRef = useRef(null);

  const moveFocusToPoint = useCallback(
    (svgX, svgY, zoomScale, duration = 400) => {
      if (!transformRef.current || !mapRef.current) return;
      const W = mapRef.current.clientWidth;
      const H = mapRef.current.clientHeight;
      const rotState = getRotationState?.() ?? { angle: 0, origin: null };
      const { x, y } = computeTargetTransform(
        W,
        H,
        svgX,
        svgY,
        zoomScale,
        rotState.angle,
        rotState.origin,
      );
      transformRef.current.setTransform(x, y, zoomScale, duration);
    },
    [getRotationState],
  );

  const moveFocusToBuilding = useCallback(
    (buildingId) => {
      const center = BUILDING_CENTERS[buildingId];
      if (!center) return;
      moveFocusToPoint(center.x, center.y, MAP_CLICK_ZOOM_SCALE);
    },
    [moveFocusToPoint],
  );

  const getInitialPosition = useCallback((svgX, svgY, scale) => {
    // 초기 진입 시점엔 회전 0이므로 회전 인자 불필요
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
