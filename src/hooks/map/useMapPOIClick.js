/**
 * 지도 POI 클릭 → active 설정 + 시트 medium + 포커스 이동 + 페이지 이동
 */

import { useEffect } from 'react';
import { BOOTH_LOCATION, BUILDING_IDS } from '@/constants/building';
import { POI_CATEGORIES } from '@/constants/category';
import { getLabel } from '@/utils/labelHelper';
import { MAP_CLICK_ZOOM_SCALE } from '@/constants/mapCoordinates';

const useMapPOIClick = ({
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
}) => {
  useEffect(() => {
    if (!poisLayerRef.current) return;

    const selector = POI_CATEGORIES.map((cat) => `[id*="${cat}"]`).join(',');

    const handleClick = (e) => {
      e.stopPropagation();
      if (!(e.target instanceof SVGElement)) return;

      // Barrierfree 아이콘 → 배리어프리 페이지로 이동
      const barrierTarget = e.target.closest('[id="Barrierfree"]');
      if (barrierTarget) {
        navigate('/map/barrierfree');
        return;
      }

      const target = e.target.closest(selector);
      if (!target) return;

      const category = POI_CATEGORIES.find((cat) => target.id.includes(cat));

      setActivePOIId(target.id);
      setFilter('booth', 'location', []);
      setFilter('etc', 'location', []);
      setFilter('show', 'location', []);

      setSheetSize('medium');

      const bbox = target.getBBox();
      const zoomScale = Math.max(savedTransform.scale, MAP_CLICK_ZOOM_SCALE);
      moveFocusToPoint(bbox.x + bbox.width / 2, bbox.y + bbox.height / 2, zoomScale);

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
  }, [
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
  ]);
};

export default useMapPOIClick;
