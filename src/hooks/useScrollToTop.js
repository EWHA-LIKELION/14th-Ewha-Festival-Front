import { useEffect } from 'react';

/**
 * 페이지 첫 진입 시 스크롤을 맨 위로 이동
 */
const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

export default useScrollToTop;
