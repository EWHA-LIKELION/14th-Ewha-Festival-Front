import { useCallback, useEffect, useRef } from 'react';
import useBottomsheetStore from '@/store/useBottomsheetStore';
import { BUILDING_CENTERS, MAP_CLICK_ZOOM_SCALE, SVG_HEIGHT } from '@/constants/mapCoordinates';
import { SHEET_SNAP_HEIGHTS } from '@/constants/bottomsheet';

const TOP_OFFSET = 108;

// 시트가 large/full로 차있어도 가시 영역이 너무 작아지지 않도록 medium으로 클램프
const normalizeSheetSizeForFocus = (size) =>
  size === 'large' || size === 'full' ? 'medium' : size;

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
      const heights = SHEET_SNAP_HEIGHTS;
      const effectiveSheetSize = normalizeSheetSizeForFocus(
        overrideSheetSize ?? sheetSizeRef.current,
      );
      const sheetHeight = heights[effectiveSheetSize] ?? heights.medium;
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
    const heights = SHEET_SNAP_HEIGHTS;
    const effectiveSheetSize = normalizeSheetSizeForFocus(
      overrideSheetSize ?? sheetSizeRef.current ?? 'medium',
    );
    const sheetHeight = heights[effectiveSheetSize] ?? heights.medium;
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
