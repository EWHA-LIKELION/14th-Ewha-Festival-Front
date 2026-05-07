import { useEffect } from 'react';
import { POI_CATEGORIES } from '@/constants/category';

/**
 * 지도 building / POI 레이어의 .is-active 클래스를 앱 상태와 DOM 동기화
 * - building: 현재 페이지의 location 필터 + showDetail.location.building
 * - POI: activePOIId (BOOTH는 부스 페이지, 나머지는 etc 페이지에서만 표시)
 *        + Barrierfree 아이콘은 배리어프리 페이지에서 active
 *
 * pois-layer는 useArtistAssets 토글로 SVG가 교체될 수 있어
 * MutationObserver로 재적용까지 보장한다.
 */
const useMapActiveSync = ({
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
}) => {
  // building is-active 동기화
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

    // 공연 상세 페이지에서는 필터와 별개로 showDetail의 building도 active
    if (matchShowDetail && showDetail?.location?.building) {
      activeLocations = [...new Set([...activeLocations, showDetail.location.building])];
    }

    activeLocations.forEach((id) => {
      buildingLayerRef.current.querySelectorAll(`[id^="${id}"]`).forEach((el) => {
        el.classList.add('is-active');
      });
    });
  }, [
    buildingLayerRef,
    buildingSvg,
    boothLocation,
    etcLocation,
    showLocation,
    isBoothPage,
    isEtcPage,
    isShowsPage,
    matchShowDetail,
    showDetail,
  ]);

  // POI is-active 동기화
  useEffect(() => {
    if (!poisLayerRef.current || !poisSvg) return;

    const applyActive = () => {
      const layer = poisLayerRef.current;
      if (!layer) return;
      layer.querySelectorAll('.is-active').forEach((el) => {
        el.classList.remove('is-active');
        POI_CATEGORIES.forEach((cat) => el.classList.remove(`poi-${cat.toLowerCase()}`));
      });

      // Barrierfree 아이콘: 배리어프리 페이지에서 active
      if (matchBarrierFree) {
        const barrierEl = layer.querySelector('[id="Barrierfree"]');
        if (barrierEl) barrierEl.classList.add('is-active');
      }

      if (!activePOIId) return;
      const isBoothPOI = activePOIId.includes('BOOTH');
      if (isBoothPOI && !isBoothPage) return;
      if (!isBoothPOI && !isEtcPage) return;
      const el = layer.querySelector(`[id="${activePOIId}"]`);
      if (!el) return;
      const category = POI_CATEGORIES.find((cat) => activePOIId.includes(cat));
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
  }, [poisLayerRef, activePOIId, poisSvg, isBoothPage, isEtcPage, matchBarrierFree]);
};

export default useMapActiveSync;
