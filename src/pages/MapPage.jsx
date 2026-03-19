/**
 * 지도
 */

import { useEffect, useRef } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useNavigate, Outlet } from 'react-router-dom';
import Button from '@/components/Button';

const savedTransform = { scale: 1, positionX: 0, positionY: 0 };

const MapPage = () => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const transformRef = useRef(null);

  useEffect(() => {
    const preventZoom = (e) => {
      if (e.ctrlKey) e.preventDefault();
    };
    document.addEventListener('wheel', preventZoom, { passive: false });
    return () => document.removeEventListener('wheel', preventZoom);
  }, []);

  const goTrash = () => {
    navigate('/map/trash');
  };

  const goBarrierFree = () => {
    navigate('/map/barrierfree');
  };

  return (
    <div ref={mapRef} className="relative h-dvh w-full">
      <div className="fixed top-18 z-5 flex gap-2 bg-transparent px-5">
        <button
          onClick={goTrash}
          className="shadow-down-lg flex flex-nowrap gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-normal text-zinc-800"
        >
          <img src="/icons/icon-map-trash.svg" alt="trash" />
          쓰레기통
        </button>
        <button
          onClick={goBarrierFree}
          className="shadow-down-lg flex flex-nowrap gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-normal text-zinc-800"
        >
          <img src="/icons/icon-map-barrierfree.svg" alt="barrierfree" />
          배리어프리
        </button>
      </div>
      <TransformWrapper
        ref={transformRef}
        wheel={{ activationKeys: [], step: 0.5 }}
        pinch={{ disabled: false }}
        panning={{ disabled: false }}
        limitToBounds={false}
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
          <img src="/icons/map.svg" alt="map" className="h-dvh w-full object-contain" />
        </TransformComponent>
      </TransformWrapper>

      <Outlet />
    </div>
  );
};

export default MapPage;
