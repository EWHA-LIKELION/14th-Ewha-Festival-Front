/**
 * 지도
 */

import { useEffect, useRef, useState } from 'react';
import './map-page.css';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useNavigate, useMatch, Outlet, useLocation } from 'react-router-dom';
import useBottomsheetStore from '@/store/useBottomsheetStore';
import useFilterStore from '@/store/useFilterStore';
import useSearchStore from '@/store/useSearchStore';
import useToastStore from '@/store/useToastStore';
import { useMapFocus } from '@/hooks';
import { useBoothDetail } from '@/hooks/useBoothDetail';
import { BOOTH_LOCATION, SHOW_LOCATION } from '@/constants/building';
import { getLabel, padNumber } from '@/utils/labelHelper';
import {
  MAP_ZOOM_LEVELS,
  MAP_CLICK_ZOOM_SCALE,
  SVG_WIDTH,
  SVG_HEIGHT,
  INITIAL_CENTER,
} from '@/constants/mapCoordinates';

const savedTransform = { scale: MAP_ZOOM_LEVELS.ZL2, positionX: 0, positionY: 0 };
const EMPTY_ARRAY = [];

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
  const filtersRef = useRef({ boothLocation, etcLocation, showLocation });

  const { mapRef, transformRef, moveFocusToPoint, moveFocusToBuilding, getInitialPosition } =
    useMapFocus();

  const navigate = useNavigate();
  const buildingLayerRef = useRef(null);
  const poisLayerRef = useRef(null);

  const [buildingSvg, setBuildingSvg] = useState('');
  const [labelSvg, setLabelSvg] = useState('');
  const [poisSvg, setPoisSvg] = useState('');
  const [activePOIId, setActivePOIId] = useState(null);

  const matchEtc = useMatch('/map/etc');
  const matchBarrierFree = useMatch('/map/barrierfree');
  const matchBooths = useMatch('/map/booths/*');
  const matchBoothDetail = useMatch('/map/booths/:id');
  const matchShows = useMatch('/map/shows/*');
  const isBoothPage = !!matchBooths;
  const isEtcPage = !!matchEtc;
  const isShowsPage = !!matchShows;
  const boothDetailId = matchBoothDetail?.params?.id;
  const { data: boothDetail } = useBoothDetail(boothDetailId);

  const { pathname } = useLocation();
  const prevPathnameRef = useRef(pathname);

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
    fetch('/map/map-label.svg')
      .then((res) => res.text())
      .then((data) => setLabelSvg(data));
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
    filtersRef.current = { boothLocation, etcLocation, showLocation };
  });

  // location 필터 삭제 시 booth ↔ etc ↔ show 동기화
  useEffect(() => {
    if (boothLocation.length > 0) return;
    if (etcLocation.length > 0) setFilter('etc', 'location', []);
    if (showLocation.length > 0) setFilter('show', 'location', []);
  }, [boothLocation]);
  useEffect(() => {
    if (etcLocation.length > 0) return;
    if (boothLocation.length > 0) setFilter('booth', 'location', []);
    if (showLocation.length > 0) setFilter('show', 'location', []);
  }, [etcLocation]);
  useEffect(() => {
    if (showLocation.length > 0) return;
    if (boothLocation.length > 0) setFilter('booth', 'location', []);
    if (etcLocation.length > 0) setFilter('etc', 'location', []);
  }, [showLocation]);

  // 부스목록 ↔ 기타시설 ↔ 공연 페이지 이동 시 선택 건물 필터를 목적지로 복사
  useEffect(() => {
    const prev = prevPathnameRef.current;
    prevPathnameRef.current = pathname;
    if (prev === pathname) return;

    const getType = (p) => {
      if (p === '/map/booths' || p.startsWith('/map/booths/')) return 'booth';
      if (p === '/map/etc') return 'etc';
      if (p === '/map/shows' || p.startsWith('/map/shows/')) return 'show';
      return null;
    };

    const prevType = getType(prev);
    const currType = getType(pathname);
    if (!prevType || !currType || prevType === currType) return;

    const srcKey = `${prevType}Location`;
    const src = filtersRef.current[srcKey] ?? [];

    if (currType === 'show') {
      const showValues = new Set(SHOW_LOCATION.map((o) => o.value));
      setFilter(
        'show',
        'location',
        src.filter((id) => showValues.has(id)),
      );
    } else {
      setFilter(currType, 'location', src);
    }
  }, [pathname, setFilter]);

  // 배리어프리 페이지 진입 시 building/booth/etc/show active 초기화
  useEffect(() => {
    if (!matchBarrierFree) return;
    setFilter('booth', 'location', []);
    setFilter('etc', 'location', []);
    setFilter('show', 'location', []);
    setActivePOIId(null);
  }, [matchBarrierFree, setFilter]);

  // 필터 location → 지도 building is-active 동기화 (현재 페이지 기준)
  useEffect(() => {
    if (!buildingLayerRef.current || !buildingSvg) return;

    buildingLayerRef.current.querySelectorAll('.is-active').forEach((el) => {
      el.classList.remove('is-active');
    });

    let activeLocations;
    if (isBoothPage) activeLocations = boothLocation;
    else if (isEtcPage) activeLocations = etcLocation;
    else if (isShowsPage) activeLocations = showLocation;
    else activeLocations = [...new Set([...boothLocation, ...etcLocation, ...showLocation])];

    activeLocations.forEach((id) => {
      buildingLayerRef.current.querySelectorAll(`[id^="${id}"]`).forEach((el) => {
        el.classList.add('is-active');
      });
    });
  }, [boothLocation, etcLocation, showLocation, buildingSvg, isBoothPage, isEtcPage, isShowsPage]);

  // activePOIId → 지도 POI is-active 동기화
  // pois-layer의 SVG가 재렌더링으로 교체될 수 있어, MutationObserver로 재적용까지 보장
  // BOOTH는 부스 목록 페이지에서만, 나머지는 기타시설 페이지에서만 active 표시
  useEffect(() => {
    if (!poisLayerRef.current || !poisSvg) return;
    const CATEGORIES = ['BOOTH', 'TRASH', 'DISH', 'GAS', 'STUFF', 'FOOD'];

    const applyActive = () => {
      const layer = poisLayerRef.current;
      if (!layer) return;
      layer.querySelectorAll('.is-active').forEach((el) => {
        el.classList.remove('is-active');
        CATEGORIES.forEach((cat) => el.classList.remove(`poi-${cat.toLowerCase()}`));
      });
      if (!activePOIId) return;
      const isBoothPOI = activePOIId.includes('BOOTH');
      if (isBoothPOI && !isBoothPage) return;
      if (!isBoothPOI && !isEtcPage) return;
      const el = layer.querySelector(`[id="${activePOIId}"]`);
      if (!el) return;
      const category = CATEGORIES.find((cat) => activePOIId.includes(cat));
      el.classList.add('is-active');
      if (category) el.classList.add(`poi-${category.toLowerCase()}`);
    };

    applyActive();

    const observer = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.type === 'childList' && m.target === poisLayerRef.current)) {
        applyActive();
      }
    });
    observer.observe(poisLayerRef.current, { childList: true });
    return () => observer.disconnect();
  }, [activePOIId, poisSvg, isBoothPage, isEtcPage]);

  // 부스 상세 페이지(/map/booths/:id) 진입 시 해당 부스 POI active + 포커스 이동
  useEffect(() => {
    if (!boothDetail?.location || !poisLayerRef.current || !poisSvg) return;
    const { building, number } = boothDetail.location;
    const poiId = `${building}-BOOTH-${padNumber(number)}`;
    setActivePOIId(poiId);

    const el = poisLayerRef.current.querySelector(`[id="${poiId}"]`);
    if (el && typeof el.getBBox === 'function') {
      const bbox = el.getBBox();
      const zoomScale = Math.max(savedTransform.scale, MAP_CLICK_ZOOM_SCALE);
      moveFocusToPoint(bbox.x + bbox.width / 2, bbox.y + bbox.height / 2, zoomScale);
    }
  }, [boothDetail, poisSvg, moveFocusToPoint]);

  // 검색어가 비워지면(X 버튼/뒤로가기) BOOTH active 해제
  // 단, 부스 상세 페이지에서는 검색어 없이도 active 유지
  useEffect(() => {
    if (searchQuery) return;
    if (matchBoothDetail) return;
    if (activePOIId?.includes('BOOTH')) setActivePOIId(null);
  }, [searchQuery, activePOIId, matchBoothDetail]);

  // BOOTH active 상태가 해제되면(다른 POI 클릭/건물 클릭/페이지 이동 등) 검색어 비우기
  const prevWasBoothActiveRef = useRef(false);
  useEffect(() => {
    const isBoothActive = activePOIId?.includes('BOOTH') ?? false;
    if (prevWasBoothActiveRef.current && !isBoothActive && searchQuery) {
      setSearchQuery('');
    }
    prevWasBoothActiveRef.current = isBoothActive;
  }, [activePOIId, searchQuery, setSearchQuery]);

  // 페이지 이동으로 현재 POI 카테고리와 페이지가 맞지 않으면 activePOIId 해제
  // pathname 변경 시에만 실행 (방금 set한 activePOIId를 같은 렌더에서 날리지 않도록)
  const prevPathForPOIRef = useRef(pathname);
  useEffect(() => {
    const prev = prevPathForPOIRef.current;
    prevPathForPOIRef.current = pathname;
    if (prev === pathname || !activePOIId) return;
    const isBoothPOI = activePOIId.includes('BOOTH');
    if (isBoothPOI && !pathname.startsWith('/map/booths')) setActivePOIId(null);
    else if (!isBoothPOI && pathname !== '/map/etc') setActivePOIId(null);
  }, [pathname, activePOIId]);

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

      const allowedLocations = isBoothPage
        ? BOOTH_LOCATION
        : isEtcPage
          ? BOOTH_LOCATION
          : isShowsPage
            ? SHOW_LOCATION
            : matchBarrierFree
              ? SHOW_LOCATION
              : null;
      if (allowedLocations && !allowedLocations.some((o) => o.value === normalizedId)) {
        showToast('선택할 수 없는 항목입니다.', 'warn');
        return;
      }

      setActivePOIId(null);
      const isShowLocation = SHOW_LOCATION.some((o) => o.value === normalizedId);
      if (isBoothPage) {
        setFilter('booth', 'location', [normalizedId]);
      } else if (isEtcPage) {
        setFilter('etc', 'location', [normalizedId]);
      } else if (isShowsPage) {
        setFilter('show', 'location', [normalizedId]);
      } else {
        setFilter('booth', 'location', [normalizedId]);
        setFilter('etc', 'location', [normalizedId]);
        setFilter('show', 'location', isShowLocation ? [normalizedId] : []);
      }

      console.log(`🏢 건물 클릭: ${normalizedId}`);
      moveFocusToBuilding(normalizedId);
    };

    const el = buildingLayerRef.current;
    el.addEventListener('click', handleClick);
    return () => el.removeEventListener('click', handleClick);
  }, [
    buildingSvg,
    setFilter,
    moveFocusToBuilding,
    isBoothPage,
    isEtcPage,
    isShowsPage,
    matchBarrierFree,
    showToast,
  ]);

  // Pois 클릭 이벤트
  useEffect(() => {
    if (!poisLayerRef.current) return;

    const CATEGORIES = ['BOOTH', 'TRASH', 'DISH', 'GAS', 'STUFF', 'FOOD'];
    const selector = CATEGORIES.map((cat) => `[id*="${cat}"]`).join(',');

    const handleClick = (e) => {
      e.stopPropagation();
      if (!(e.target instanceof SVGElement)) return;

      const target = e.target.closest(selector);
      if (!target) return;

      const category = CATEGORIES.find((cat) => target.id.includes(cat));

      setActivePOIId(target.id);
      setFilter('booth', 'location', []);
      setFilter('etc', 'location', []);
      setFilter('show', 'location', []);

      console.log(`🗺️ POI 클릭: ${target.id} (${category})`);
      const bbox = target.getBBox();
      const zoomScale = Math.max(savedTransform.scale, MAP_CLICK_ZOOM_SCALE);
      // 비BOOTH POI는 /map/etc로 이동 → 시트가 medium으로 올라오므로 미리 반영
      const targetSheetSize = category !== 'BOOTH' ? 'medium' : undefined;
      moveFocusToPoint(
        bbox.x + bbox.width / 2,
        bbox.y + bbox.height / 2,
        zoomScale,
        400,
        targetSheetSize,
      );

      const location = BUILDING_IDS.find((id) => target.id.includes(id));
      const number = parseInt(target.id.split(`${category}-`).pop(), 10);

      if (category === 'BOOTH') {
        const query = `${getLabel(location, BOOTH_LOCATION)}${number}`;
        setSearchQuery(query);
        addRecentSearch(query);
        navigate('/map/booths');
      } else {
        navigate('/map/etc', { state: { selectedPOI: { category, location, number } } });
      }
    };

    const el = poisLayerRef.current;
    el.addEventListener('click', handleClick);
    return () => el.removeEventListener('click', handleClick);
  }, [poisSvg, moveFocusToPoint, navigate, setFilter, setSearchQuery, addRecentSearch]);

  // EtcSheet/BarrierFreeSheet은 마운트 시 시트를 medium으로 올림 → 포커스 계산도 medium 가정
  const initialSheetSize = matchEtc || matchBarrierFree ? 'medium' : undefined;
  const initialPos = getInitialPosition(
    INITIAL_CENTER.x,
    INITIAL_CENTER.y,
    MAP_ZOOM_LEVELS.ZL2,
    initialSheetSize,
  );

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
          moveFocusToPoint(
            INITIAL_CENTER.x,
            INITIAL_CENTER.y,
            MAP_ZOOM_LEVELS.ZL2,
            0,
            initialSheetSize,
          );
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
          <div className="relative h-dvh" style={{ aspectRatio: `${SVG_WIDTH} / ${SVG_HEIGHT}` }}>
            <img src="/map/map-background.svg" alt="map-background" className="h-full w-full" />
            <div
              ref={buildingLayerRef}
              className="building-layer absolute inset-0 [&>svg]:h-full [&>svg]:w-full"
              dangerouslySetInnerHTML={{ __html: buildingSvg }}
              style={{ pointerEvents: 'auto' }}
            />
            <div
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
