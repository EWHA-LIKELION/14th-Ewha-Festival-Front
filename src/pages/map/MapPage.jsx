/**
 * 지도
 */

import { useEffect, useRef, useState } from 'react';
import './map-page.css';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useNavigate, useMatch, Outlet } from 'react-router-dom';
import useBottomsheetStore from '@/store/useBottomsheetStore';
import useFilterStore from '@/store/useFilterStore';
import {
  MAP_ZOOM_LEVELS,
  BUILDING_CENTERS,
  MAP_CLICK_ZOOM_SCALE,
  SVG_WIDTH,
  SVG_HEIGHT,
} from '@/constants/mapCoordinates';

const savedTransform = { scale: MAP_ZOOM_LEVELS.ZL2, positionX: 0, positionY: 0 };

const MapPage = () => {
  const SHEET_SNAP_HEIGHTS = { small: 87, medium: 385, large: 589, full: window.innerHeight };

  const setSheetSize = useBottomsheetStore((s) => s.setSheetSize);
  const sheetSize = useBottomsheetStore((s) => s.sheetSize);
  const sheetSizeRef = useRef(sheetSize);
  useEffect(() => {
    sheetSizeRef.current = sheetSize;
  }, [sheetSize]);
  const boothLocation = useFilterStore((s) => s.filters.booth?.location ?? []);
  const etcLocation = useFilterStore((s) => s.filters.etc?.location ?? []);
  const setFilter = useFilterStore((s) => s.setFilter);
  const filtersRef = useRef({ boothLocation, etcLocation });

  const navigate = useNavigate();
  const mapRef = useRef(null);
  const transformRef = useRef(null);
  const buildingLayerRef = useRef(null);
  const poisLayerRef = useRef(null);

  const [buildingSvg, setBuildingSvg] = useState('');
  const [poisSvg, setPoisSvg] = useState('');

  const matchTrash = useMatch('/map/etc');
  const matchBarrierFree = useMatch('/map/barrierfree');

  const goList = () => {
    setSheetSize('full');
  };

  useEffect(() => {
    const preventZoom = (e) => {
      if (e.ctrlKey) e.preventDefault();
    };
    document.addEventListener('wheel', preventZoom, { passive: false });
    return () => document.removeEventListener('wheel', preventZoom);
  }, []);

  const goEtc = () => {
    navigate('/map/etc');
  };

  const goBarrierFree = () => {
    navigate('/map/barrierfree');
  };

  // SVG 불러오기
  useEffect(() => {
    fetch('/map/map-building.svg')
      .then((res) => res.text())
      .then((data) => setBuildingSvg(data));
    fetch('/map/map-pois.svg')
      .then((res) => res.text())
      .then((data) => setPoisSvg(data));
  }, []);

  const BUILDING_IDS = [
    'STUDENT_UNION',
    'SPORT_TRACK',
    'HYUUT_GIL',
    'HUMAN_ECOLOGY_BUILDING',
    'HAK_GWAN',
    'GRASS_GROUND',
    'EWHA_SHINSEGAE_BUILDING',
    'EWHA_POSCO_BUILDING',
    'EDUCATION_BUILDING',
    'WELCH_RYANG_AUDITORIUM',
    'SENTENNIAL_MUSEUM',
  ];

  // filtersRef를 최신 상태로 유지 (클릭 핸들러 클로저에서 사용)
  useEffect(() => {
    filtersRef.current = { boothLocation, etcLocation };
  });

  // location 필터 삭제 시 booth ↔ etc 동기화
  useEffect(() => {
    if (boothLocation.length === 0 && etcLocation.length > 0) setFilter('etc', 'location', []);
  }, [boothLocation]);
  useEffect(() => {
    if (etcLocation.length === 0 && boothLocation.length > 0) setFilter('booth', 'location', []);
  }, [etcLocation]);

  // 필터 location → 지도 building is-active 동기화
  useEffect(() => {
    if (!buildingLayerRef.current || !buildingSvg) return;

    buildingLayerRef.current.querySelectorAll('.is-active').forEach((el) => {
      el.classList.remove('is-active');
    });

    const selected = new Set([...boothLocation, ...etcLocation]);
    selected.forEach((id) => {
      buildingLayerRef.current.querySelectorAll(`[id^="${id}"]`).forEach((el) => {
        el.classList.add('is-active');
      });
    });
  }, [boothLocation, etcLocation, buildingSvg]);

  // 건물 클릭 → 필터 location 토글
  useEffect(() => {
    if (!buildingLayerRef.current) return;

    const buildingSelector = BUILDING_IDS.map((id) => `[id^="${id}"]`).join(',');

    const handleClick = (e) => {
      e.stopPropagation();
      if (!(e.target instanceof SVGElement)) return;

      const target = e.target.closest(buildingSelector);
      if (!target) return;

      const normalizedId = BUILDING_IDS.find((id) => target.id.startsWith(id));
      if (!normalizedId) return;

      setFilter('booth', 'location', [normalizedId]);
      setFilter('etc', 'location', [normalizedId]);

      console.log(`🏢 건물 클릭: ${normalizedId}`);

      //포커스 이동
      const center = BUILDING_CENTERS[normalizedId];
      if (center && transformRef.current && mapRef.current) {
        const W = mapRef.current.clientWidth;
        const H = mapRef.current.clientHeight;
        // object-contain 렌더 배율 및 letterbox 오프셋 계산
        const renderScale = Math.min(W / SVG_WIDTH, H / SVG_HEIGHT);
        const offsetX = (W - SVG_WIDTH * renderScale) / 2;
        const offsetY = (H - SVG_HEIGHT * renderScale) / 2;
        // SVG 원본 좌표 → 컨텐츠 좌표
        const cx = offsetX + center.x * renderScale;
        const cy = offsetY + center.y * renderScale;
        const zoomScale = MAP_CLICK_ZOOM_SCALE;
        const sheetHeight = SHEET_SNAP_HEIGHTS[sheetSizeRef.current] ?? SHEET_SNAP_HEIGHTS.medium;
        const visibleCenterY = 108 + (H - sheetHeight - 108) / 2;
        transformRef.current.setTransform(
          W / 2 - cx * zoomScale,
          visibleCenterY - cy * zoomScale,
          zoomScale,
          400,
        );
      }
    };

    buildingLayerRef.current.addEventListener('click', handleClick);
    return () => buildingLayerRef.current?.removeEventListener('click', handleClick);
  }, [buildingSvg, setFilter]);

  // Pois 클릭 이벤트
  useEffect(() => {
    if (!poisLayerRef.current) return;

    const CATEGORIES = ['BOOTH', 'TRASH', 'DISH', 'CAS', 'STUFF', 'FOOD'];
    const selector = CATEGORIES.map((cat) => `[id*="${cat}"]`).join(',');

    const handleClick = (e) => {
      e.stopPropagation();
      if (!(e.target instanceof SVGElement)) return;

      const target = e.target.closest(selector);
      if (!target) return;

      const category = CATEGORIES.find((cat) => target.id.includes(cat));

      poisLayerRef.current?.querySelectorAll('.is-active').forEach((el) => {
        el.classList.remove('is-active');
        delete el.dataset.category;
      });

      target.classList.add('is-active');
      target.dataset.category = category;
      console.log(`🗺️ POI 클릭: ${target.id} (${category})`);
    };

    poisLayerRef.current.addEventListener('click', handleClick);
    return () => poisLayerRef.current?.removeEventListener('click', handleClick);
  }, [poisSvg]);

  return (
    <div ref={mapRef} className="relative h-dvh w-full">
      <div className="fixed top-18 z-5 flex gap-2 bg-transparent px-5">
        <button
          onClick={goEtc}
          className={`shadow-down-lg flex items-center gap-1.5 rounded-full px-4 py-2 text-sm leading-5 font-medium transition-all duration-200 ${matchTrash ? 'bg-red-400 text-white' : 'bg-white text-zinc-800'}`}
        >
          <img
            src="/icons/icon-map-etc.svg"
            alt="etc"
            className={`h-4 w-4 shrink-0 ${matchTrash ? 'brightness-0 invert' : ''}`}
          />
          기타시설
        </button>
        <button
          onClick={goBarrierFree}
          className={`shadow-down-lg flex items-center gap-1.5 rounded-full px-4 py-2 text-sm leading-5 font-medium transition-all duration-200 ${matchBarrierFree ? 'bg-cyan-400 text-white' : 'bg-white text-zinc-800'}`}
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
        maxScale={50}
        initialScale={savedTransform.scale}
        initialPositionX={savedTransform.positionX}
        initialPositionY={savedTransform.positionY}
        onTransformed={(_, state) => {
          savedTransform.scale = state.scale;
          savedTransform.positionX = state.positionX;
          savedTransform.positionY = state.positionY;
        }}
      >
        <TransformComponent wrapperClass="w-full h-dvh" contentClass="w-full h-dvh">
          <div className="relative h-dvh w-full">
            <img
              src="/map/map-background.svg"
              alt="map-background"
              className="h-full w-full object-contain"
            />
            <div
              ref={buildingLayerRef}
              className="building-layer absolute inset-0 h-full w-full [&>svg]:h-full [&>svg]:w-full [&>svg]:object-contain"
              dangerouslySetInnerHTML={{ __html: buildingSvg }}
              style={{ pointerEvents: 'auto' }}
            />
            <img
              src="/map/map-label.svg"
              alt="map-label"
              className="pointer-events-none absolute inset-0 h-full w-full object-contain"
            />
            <div
              ref={poisLayerRef}
              className="pois-layer absolute inset-0 h-full w-full [&>svg]:h-full [&>svg]:w-full [&>svg]:object-contain"
              dangerouslySetInnerHTML={{ __html: poisSvg }}
              style={{ pointerEvents: 'none' }}
            />
          </div>
        </TransformComponent>
      </TransformWrapper>

      <Outlet />

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
