/**
 * 무한 스크롤 커스텀 훅
 * @param {Object} scrollContainerRef - 스크롤 컨테이너 ref
 * @param {Function} fetchNextPage - 다음 페이지를 가져오는 함수 (TanStack Query의 fetchNextPage)
 * @param {boolean} hasNextPage - 다음 페이지 존재 여부
 * @param {boolean} isFetchingNextPage - 다음 페이지 로딩 중 여부
 * @param {number} threshold - 스크롤 트리거 임계값 (0~1 사이, 기본 0.8 = 80%)
 */

import { useEffect } from 'react';

export const useInfiniteScroll = ({
  scrollContainerRef,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  threshold = 0.8,
}) => {
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

      // threshold 이상 스크롤하면 다음 페이지 로드
      if (scrollPercentage > threshold && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [scrollContainerRef, fetchNextPage, hasNextPage, isFetchingNextPage, threshold]);
};
