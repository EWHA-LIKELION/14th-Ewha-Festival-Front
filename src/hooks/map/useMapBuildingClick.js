/**
 * 지도 건물 클릭 → 필터 location 토글 + 시트 medium + 포커스 이동
 */

import { useEffect } from 'react';
import { BOOTH_LOCATION, SHOW_LOCATION, BUILDING_IDS } from '@/constants/building';

const useMapBuildingClick = ({
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
}) => {
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

      // 배리어프리 페이지에서는 모든 건물 클릭 차단
      if (matchBarrierFree) {
        showToast('선택할 수 없는 항목입니다.', 'warn');
        return;
      }

      const allowedLocations = isBoothPage
        ? BOOTH_LOCATION
        : isEtcPage
          ? BOOTH_LOCATION
          : isShowsPage
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

      setSheetSize('medium');
      focusBuilding(normalizedId);
    };

    const el = buildingLayerRef.current;
    el.addEventListener('click', handleClick);
    return () => el.removeEventListener('click', handleClick);
  }, [
    buildingLayerRef,
    buildingSvg,
    setFilter,
    setSheetSize,
    setActivePOIId,
    focusBuilding,
    isBoothPage,
    isEtcPage,
    isShowsPage,
    matchBarrierFree,
    showToast,
  ]);
};

export default useMapBuildingClick;
