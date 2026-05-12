/**
 * 스크롤 위치 저장/복원 hook
 * - 모듈 단위 Map에 key별 scrollTop을 보관 (페이지 이동 후 돌아와도 유지)
 * - DOM detach 이후엔 scrollTop이 0을 반환하므로 ref로 최신값을 추적
 */

import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

const scrollPositions = new Map();

const useScrollRestore = (key, scrollContainerRef, isReady = true) => {
  const restoredRef = useRef(false);
  const latestScrollTopRef = useRef(0);

  // 복원: 컨텐츠가 준비된 후 1회만
  useLayoutEffect(() => {
    if (!isReady || restoredRef.current) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    const saved = scrollPositions.get(key);
    if (saved != null) {
      el.scrollTop = saved;
      latestScrollTopRef.current = saved;
    }
    restoredRef.current = true;
  }, [isReady, key, scrollContainerRef]);

  // 저장: scroll 이벤트마다 ref와 Map 갱신
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleScroll = () => {
      latestScrollTopRef.current = el.scrollTop;
      scrollPositions.set(key, el.scrollTop);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      // DOM detach 후엔 el.scrollTop이 0이므로 ref에 보관된 마지막 값을 저장
      scrollPositions.set(key, latestScrollTopRef.current);
      el.removeEventListener('scroll', handleScroll);
    };
  }, [key, scrollContainerRef]);

  // 명시적으로 저장하고 싶을 때 (예: 카드 클릭 직전)
  const save = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    latestScrollTopRef.current = el.scrollTop;
    scrollPositions.set(key, el.scrollTop);
  }, [key, scrollContainerRef]);

  return save;
};

export default useScrollRestore;
