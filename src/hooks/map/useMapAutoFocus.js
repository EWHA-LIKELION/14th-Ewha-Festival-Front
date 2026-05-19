/**
 * 페이지/상태 변화에 따른 지도 자동 포커스 이동
 * - 배리어프리 페이지 진입 → 필터 초기화 + GRASS_GROUND 포커스
 * - 부스 상세 페이지 → 해당 부스 POI active + 포커스
 * - 공연 상세 페이지 → 해당 공연 building 포커스
 * - 부스/공연 목록에서 필터로 건물 1개 선택 → 해당 건물 포커스
 */

import { useEffect } from 'react';
import { padNumber } from '@/utils/labelHelper';

const useMapAutoFocus = ({
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
}) => {
  // 배리어프리 페이지 진입 시
  useEffect(() => {
    if (!matchBarrierFree) return;
    setFilter('booth', 'location', []);
    setFilter('etc', 'location', []);
    setFilter('show', 'location', []);
    setActivePOIId(null);
    focusBuilding('GRASS_GROUND');
  }, [matchBarrierFree, setFilter, setActivePOIId, focusBuilding]);

  // 부스 상세 페이지 진입 시
  useEffect(() => {
    if (!boothDetail?.location || !poisSvg) return;
    const { building, number } = boothDetail.location;
    focusPOI(`${building}-BOOTH-${padNumber(number)}`);
  }, [boothDetail, poisSvg, focusPOI]);

  // 공연 상세 페이지 진입 시
  useEffect(() => {
    if (!showDetail?.location?.building) return;
    focusBuilding(showDetail.location.building);
  }, [showDetail, focusBuilding]);

  // 부스/공연 목록에서 필터로 건물 1개만 선택된 경우
  useEffect(() => {
    const targetLocation = isBoothPage ? boothLocation : isShowsPage ? showLocation : null;
    if (!targetLocation || targetLocation.length !== 1) return;
    focusBuilding(targetLocation[0]);
  }, [boothLocation, showLocation, isBoothPage, isShowsPage, focusBuilding]);
};

export default useMapAutoFocus;
