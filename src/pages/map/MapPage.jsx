/**
 * 지도
 */

import { useEffect, useRef, useState } from 'react';
import './map-page.css';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useNavigate, useMatch, Outlet } from 'react-router-dom';
import useBottomsheetStore from '@/store/useBottomsheetStore';

const savedTransform = { scale: 1, positionX: 0, positionY: 0 };

const MapPage = () => {
  const setSheetSize = useBottomsheetStore((s) => s.setSheetSize);

  const navigate = useNavigate();
  const mapRef = useRef(null);
  const transformRef = useRef(null);
  const buildingLayerRef = useRef(null);
  const boothLayerRef = useRef(null);

  const [buildingSvg, setBuildingSvg] = useState('');
  const [boothSvg, setBoothSvg] = useState('');

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
    fetch('/map/map-booth.svg')
      .then((res) => res.text())
      .then((data) => setBoothSvg(data));
  }, []);

  // 건물 클릭 이벤트
  useEffect(() => {
    if (!buildingLayerRef.current) return;

    const handleClick = (e) => {
      e.stopPropagation();
      if (!(e.target instanceof SVGElement)) return;

      const target = e.target.closest('[id^="building-"]');
      if (!target) return;

      if (target.classList.contains('is-active')) {
        target.classList.remove('is-active');
        return;
      }

      // building active 초기화 (booth가 아닌 building에서 초기화)
      buildingLayerRef.current?.querySelectorAll('.is-active').forEach((el) => {
        el.classList.remove('is-active');
      });

      target.classList.add('is-active');
      console.log(`🏢 건물 클릭: ${target.id}`);
    };

    buildingLayerRef.current.addEventListener('click', handleClick);
    return () => buildingLayerRef.current?.removeEventListener('click', handleClick);
  }, [buildingSvg]);

  // 부스 클릭 이벤트
  useEffect(() => {
    if (!boothLayerRef.current) return;

    const handleClick = (e) => {
      e.stopPropagation();
      if (!(e.target instanceof SVGElement)) return;

      const target = e.target.closest('[id^="Map icon button"]');
      if (!target) return;

      if (target.classList.contains('is-active')) {
        target.classList.remove('is-active');
        return;
      }

      boothLayerRef.current?.querySelectorAll('.is-active').forEach((el) => {
        el.classList.remove('is-active');
      });

      target.classList.add('is-active');
      console.log(`🎪 부스 클릭: ${target.id}`);
    };

    boothLayerRef.current.addEventListener('click', handleClick);
    return () => boothLayerRef.current?.removeEventListener('click', handleClick);
  }, [boothSvg]);

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
              className="absolute inset-0 h-full w-full [&>svg]:h-full [&>svg]:w-full [&>svg]:object-contain"
              dangerouslySetInnerHTML={{ __html: buildingSvg }}
              style={{ pointerEvents: 'auto' }}
            />
            <img
              src="/map/map-label.svg"
              alt="map-label"
              className="pointer-events-none absolute inset-0 h-full w-full object-contain"
            />
            <div
              ref={boothLayerRef}
              className="absolute inset-0 h-full w-full [&>svg]:h-full [&>svg]:w-full [&>svg]:object-contain"
              dangerouslySetInnerHTML={{ __html: boothSvg }}
              style={{ pointerEvents: 'auto' }}
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
