/**
 * activePOIId 상태 관리 + 검색어/경로 변화에 따른 정리 로직
 * - 검색어가 비워지면 BOOTH active 해제 (부스 상세 페이지 제외)
 * - BOOTH active 해제 시 검색어 비우기
 * - 페이지 이동 시 카테고리 불일치하면 active 해제
 */

import { useEffect, useRef, useState } from 'react';

const useActivePOISync = ({ searchQuery, setSearchQuery, pathname, matchBoothDetail }) => {
  const [activePOIId, setActivePOIId] = useState(null);

  // 검색어가 비워지면 BOOTH active 해제 (단, 부스 상세 페이지에서는 유지)
  useEffect(() => {
    if (searchQuery) return;
    if (matchBoothDetail) return;
    if (activePOIId?.includes('BOOTH')) setActivePOIId(null);
  }, [searchQuery, activePOIId, matchBoothDetail]);

  // BOOTH active 상태가 해제되면 검색어 비우기
  const prevWasBoothActiveRef = useRef(false);
  useEffect(() => {
    const isBoothActive = activePOIId?.includes('BOOTH') ?? false;
    if (prevWasBoothActiveRef.current && !isBoothActive && searchQuery) {
      setSearchQuery('');
    }
    prevWasBoothActiveRef.current = isBoothActive;
  }, [activePOIId, searchQuery, setSearchQuery]);

  // 페이지 이동으로 현재 POI 카테고리와 페이지가 맞지 않으면 activePOIId 해제
  const prevPathForPOIRef = useRef(pathname);
  useEffect(() => {
    const prev = prevPathForPOIRef.current;
    prevPathForPOIRef.current = pathname;
    if (prev === pathname || !activePOIId) return;
    const isBoothPOI = activePOIId.includes('BOOTH');
    if (isBoothPOI && !pathname.startsWith('/map/booths')) setActivePOIId(null);
    else if (!isBoothPOI && pathname !== '/map/etc') setActivePOIId(null);
  }, [pathname, activePOIId]);

  return { activePOIId, setActivePOIId };
};

export default useActivePOISync;
