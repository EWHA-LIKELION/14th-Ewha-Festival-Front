import { useEffect, useRef } from 'react';
import { SHOW_LOCATION } from '@/constants/building';

/**
 * 부스 ↔ 기타시설 ↔ 공연 location 필터 동기화
 * - 한쪽 location 필터가 비워지면 다른 두 쪽도 비움
 * - 페이지 이동(booth ↔ etc ↔ show) 시 직전 페이지 location 필터를 새 페이지로 복사
 *   (show 페이지로 갈 때는 SHOW_LOCATION에 존재하는 값만)
 */
const useMapFilterSync = ({
  boothLocation,
  etcLocation,
  showLocation,
  setFilter,
  pathname,
}) => {
  const filtersRef = useRef({ boothLocation, etcLocation, showLocation });
  const prevPathnameRef = useRef(pathname);

  // 클릭 핸들러 등 클로저에서 최신 필터를 보기 위한 ref 갱신
  useEffect(() => {
    filtersRef.current = { boothLocation, etcLocation, showLocation };
  });

  // 한쪽이 비면 나머지도 동기화로 비우기
  useEffect(() => {
    if (boothLocation.length > 0) return;
    if (etcLocation.length > 0) setFilter('etc', 'location', []);
    if (showLocation.length > 0) setFilter('show', 'location', []);
  }, [boothLocation]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (etcLocation.length > 0) return;
    if (boothLocation.length > 0) setFilter('booth', 'location', []);
    if (showLocation.length > 0) setFilter('show', 'location', []);
  }, [etcLocation]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (showLocation.length > 0) return;
    if (boothLocation.length > 0) setFilter('booth', 'location', []);
    if (etcLocation.length > 0) setFilter('etc', 'location', []);
  }, [showLocation]); // eslint-disable-line react-hooks/exhaustive-deps

  // 페이지 이동 시 직전 페이지 location 필터를 새 페이지로 복사
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

    const src = filtersRef.current[`${prevType}Location`] ?? [];

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
};

export default useMapFilterSync;
