/**
 * 지도
 */

import { useCallback, useEffect, useRef } from 'react';
import './map-page.css';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useNavigate, useMatch, Outlet, useLocation } from 'react-router-dom';
import useBottomsheetStore from '@/store/useBottomsheetStore';
import useFilterStore from '@/store/useFilterStore';
import useSearchStore from '@/store/useSearchStore';
import useToastStore from '@/store/useToastStore';
import {
  useMapFocus,
  useMapAssets,
  useMapActiveSync,
  useMapFilterSync,
  useMapRotation,
  useMapBuildingClick,
  useMapPOIClick,
  useActivePOISync,
  useMapAutoFocus,
  useBoothDetail,
  useShowDetail,
} from '@/hooks';
import { padNumber } from '@/utils/labelHelper';
import {
  MAP_ZOOM_LEVELS,
  MAP_CLICK_ZOOM_SCALE,
  SVG_WIDTH,
  SVG_HEIGHT,
  INITIAL_CENTER,
  ARTIST_BUILDING_CENTERS,
} from '@/constants/mapCoordinates';

const savedTransform = { scale: MAP_ZOOM_LEVELS.ZL2, positionX: 0, positionY: 0 };
const EMPTY_ARRAY = [];

// 아티스트 라벨/POI 적용일 (2026-05-22)
const IS_ARTIST_DAY = (() => {
  const today = new Date();
  return today.getFullYear() === 2026 && today.getMonth() + 1 === 5 && today.getDate() === 22;
})();

const MapPage = () => {
  const setSheetSize = useBottomsheetStore((s) => s.setSheetSize);
  const showToast = useToastStore((s) => s.showToast);
  const boothLocation = useFilterStore((s) => s.filters.booth?.location ?? EMPTY_ARRAY);
  const etcLocation = useFilterStore((s) => s.filters.etc?.location ?? EMPTY_ARRAY);
  const showLocation = useFilterStore((s) => s.filters.show?.location ?? EMPTY_ARRAY);
  const setFilter = useFilterStore((s) => s.setFilter);
  const searchQuery = useSearchStore((s) => s.searchQuery);
  const setSearchQuery = useSearchStore((s) => s.setSearchQuery);
  const addRecentSearch = useSearchStore((s) => s.addRecentSearch);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const buildingLayerRef = useRef(null);
  const poisLayerRef = useRef(null);

  // 회전 상태 — ref로 관리하여 매 프레임 React 재렌더링 회피
  const rotationRef = useRef(0);
  const rotationOriginRef = useRef(null);

  const getRotationState = useCallback(
    () => ({ angle: rotationRef.current, origin: rotationOriginRef.current }),
    [],
  );

  const { mapRef, transformRef, moveFocusToPoint, moveFocusToBuilding, getInitialPosition } =
    useMapFocus(getRotationState);

  // 라우트 매칭
  const matchEtc = useMatch('/map/etc');
  const matchBarrierFree = useMatch('/map/barrierfree');
  const matchBooths = useMatch('/map/booths/*');
  const matchBoothDetail = useMatch('/map/booths/:id');
  const matchShows = useMatch('/map/shows/*');
  const matchShowDetail = useMatch('/map/shows/:id');
  const isBoothPage = !!matchBooths;
  const isEtcPage = !!matchEtc;
  const isShowsPage = !!matchShows;
  const boothDetailId = matchBoothDetail?.params?.id;
  const showDetailId = matchShowDetail?.params?.id;
  const { data: boothDetail } = useBoothDetail(boothDetailId);
  const { data: showDetail } = useShowDetail(showDetailId);

  // 아티스트 데이(5/22) 또는 배리어프리 페이지 → artist 라벨/POI로 교체
  const useArtistAssets = IS_ARTIST_DAY || !!matchBarrierFree;

  // 지도 SVG 에셋
  const { buildingSvg, labelSvg, poisSvg } = useMapAssets(useArtistAssets);

  // 회전 제스처 + 라벨 카운터 회전
  const { svgContentRef, labelLayerRef, resetRotation } = useMapRotation({
    mapRef,
    transformRef,
    labelSvg,
    savedTransform,
    rotationRef,
    rotationOriginRef,
  });

  // activePOIId 상태 + 정리 로직
  const { activePOIId, setActivePOIId } = useActivePOISync({
    searchQuery,
    setSearchQuery,
    pathname,
    matchBoothDetail,
  });

  // Ctrl+Wheel 줌 차단 (브라우저 기본)
  useEffect(() => {
    const preventZoom = (e) => {
      if (e.ctrlKey) e.preventDefault();
    };
    document.addEventListener('wheel', preventZoom, { passive: false });
    return () => document.removeEventListener('wheel', preventZoom);
  }, []);

  // 아티스트 모드에서 GRASS_GROUND 등은 좌표를 override 해서 포커스
  const focusBuilding = useCallback(
    (buildingId) => {
      const override = useArtistAssets ? ARTIST_BUILDING_CENTERS[buildingId] : null;
      if (override) {
        moveFocusToPoint(override.x, override.y, MAP_CLICK_ZOOM_SCALE);
      } else {
        moveFocusToBuilding(buildingId);
      }
    },
    [useArtistAssets, moveFocusToBuilding, moveFocusToPoint],
  );

  // POI를 active 상태로 만들고 해당 좌표로 focus 이동
  const focusPOI = useCallback(
    (poiId) => {
      setActivePOIId(poiId);
      if (!poiId || !poisLayerRef.current) return;
      const el = poisLayerRef.current.querySelector(`[id="${poiId}"]`);
      if (el && typeof el.getBBox === 'function') {
        const bbox = el.getBBox();
        const zoomScale = Math.max(savedTransform.scale, MAP_CLICK_ZOOM_SCALE);
        moveFocusToPoint(bbox.x + bbox.width / 2, bbox.y + bbox.height / 2, zoomScale);
      }
    },
    [moveFocusToPoint, setActivePOIId],
  );

  // booth ↔ etc ↔ show location 필터 동기화 + 페이지 이동 시 필터 복사
  useMapFilterSync({ boothLocation, etcLocation, showLocation, setFilter, pathname });

  // 페이지/상태 변화에 따른 자동 포커스
  useMapAutoFocus({
    matchBarrierFree,
    boothDetail,
    showDetail,
    poisSvg,
    isBoothPage,
    isShowsPage,
    boothLocation,
    showLocation,
    focusBuilding,
    focusPOI,
    setFilter,
    setActivePOIId,
    resetRotation,
  });

  // 지도 building/POI is-active 클래스를 앱 상태와 DOM 동기화
  useMapActiveSync({
    buildingLayerRef,
    buildingSvg,
    poisLayerRef,
    poisSvg,
    boothLocation,
    etcLocation,
    showLocation,
    isBoothPage,
    isEtcPage,
    isShowsPage,
    matchShowDetail,
    showDetail,
    matchBarrierFree,
    activePOIId,
  });

  // 건물 클릭 핸들러
  useMapBuildingClick({
    buildingLayerRef,
    buildingSvg,
    isBoothPage,
    isEtcPage,
    isShowsPage,
    matchBarrierFree,
    setFilter,
    setSheetSize,
    setActivePOIId,
    focusBuilding,
    showToast,
  });

  // POI 클릭 핸들러
  useMapPOIClick({
    poisLayerRef,
    poisSvg,
    moveFocusToPoint,
    navigate,
    setFilter,
    setSheetSize,
    setSearchQuery,
    addRecentSearch,
    setActivePOIId,
    savedTransform,
  });

  const goList = () => setSheetSize('full');
  const goEtc = () => navigate('/map/etc');
  const goBarrierFree = () => navigate('/map/barrierfree');

  // 포커스는 항상 시트 medium 기준 (useMapFocus 참조)
  const initialPos = getInitialPosition(INITIAL_CENTER.x, INITIAL_CENTER.y, MAP_ZOOM_LEVELS.ZL2);

  return (
    <div ref={mapRef} className="relative h-dvh w-full">
      <div className="fixed top-18 z-5 flex gap-2 bg-transparent px-5">
        <button
          onClick={goEtc}
          className={`shadow-down-lg flex items-center gap-1.5 rounded-full px-4 py-2 text-sm leading-5 font-medium transition-all duration-200 ${matchEtc ? 'bg-red-400 text-white' : 'bg-white text-zinc-800'}`}
        >
          <img
            src="/icons/icon-map-etc.svg"
            alt="etc"
            className={`h-4 w-4 shrink-0 ${matchEtc ? 'brightness-0 invert' : ''}`}
          />
          기타시설
        </button>
        <button
          onClick={goBarrierFree}
          className={`shadow-down-lg flex items-center gap-1.5 rounded-full px-4 py-2 text-sm leading-5 font-medium transition-all duration-200 ${matchBarrierFree ? 'bg-teal-400 text-white' : 'bg-white text-zinc-800'}`}
        >
          <img
            src="/icons/icon-map-barrierfree.svg"
            alt="barrierfree"
            className={`h-4 w-4 shrink-0 ${matchBarrierFree ? 'brightness-0 invert' : ''}`}
          />
          배리어프리
        </button>
      </div>
      <TransformWrapper
        ref={transformRef}
        wheel={{ activationKeys: [], step: 1000 }}
        pinch={{ disabled: false }}
        panning={{ disabled: false }}
        limitToBounds={true}
        minScale={MAP_ZOOM_LEVELS.ZL1}
        maxScale={MAP_ZOOM_LEVELS.ZL4}
        initialScale={MAP_ZOOM_LEVELS.ZL2}
        initialPositionX={initialPos.x}
        initialPositionY={initialPos.y}
        onInit={() => {
          moveFocusToPoint(INITIAL_CENTER.x, INITIAL_CENTER.y, MAP_ZOOM_LEVELS.ZL2, 0);
        }}
        onTransformed={(_, state) => {
          savedTransform.scale = state.scale;
          savedTransform.positionX = state.positionX;
          savedTransform.positionY = state.positionY;
          if (poisLayerRef.current) {
            poisLayerRef.current.style.visibility =
              state.scale >= MAP_ZOOM_LEVELS.ZL2 ? 'visible' : 'hidden';
          }
        }}
      >
        <TransformComponent wrapperClass="!w-full !h-dvh overflow-hidden">
          <div
            ref={svgContentRef}
            className="relative h-dvh"
            style={{ aspectRatio: `${SVG_WIDTH} / ${SVG_HEIGHT}` }}
          >
            <img src="/map/map-background.svg" alt="map-background" className="h-full w-full" />
            <div
              ref={buildingLayerRef}
              className="building-layer absolute inset-0 [&>svg]:h-full [&>svg]:w-full"
              dangerouslySetInnerHTML={{ __html: buildingSvg }}
              style={{ pointerEvents: 'auto' }}
            />
            <div
              ref={labelLayerRef}
              className="pointer-events-none absolute inset-0 [&>svg]:h-full [&>svg]:w-full"
              dangerouslySetInnerHTML={{ __html: labelSvg }}
            />
            <div
              ref={poisLayerRef}
              className="pois-layer absolute inset-0 [&>svg]:h-full [&>svg]:w-full"
              dangerouslySetInnerHTML={{ __html: poisSvg }}
              style={{
                pointerEvents: 'none',
                visibility: savedTransform.scale >= MAP_ZOOM_LEVELS.ZL2 ? 'visible' : 'hidden',
              }}
            />
          </div>
        </TransformComponent>
      </TransformWrapper>

      <Outlet context={{ focusPOI }} />

      <div className="reactive-width fixed bottom-28 left-1/2 -translate-x-1/2">
        <div className="flex justify-center">
          <button
            onClick={goList}
            className="shadow-down-lg flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-base leading-6 font-medium text-emerald-600"
          >
            <img src="/icons/icon-map-list.svg" alt="list" />
            목록보기
          </button>
        </div>
        {/* safe area 여백 — iPhone PWA 홈 인디케이터 영역 */}
        <div style={{ height: 'env(safe-area-inset-bottom)' }} />
      </div>
    </div>
  );
};

export default MapPage;
