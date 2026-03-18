/**
 * 검색 실행 커스텀 훅
 * 검색어 저장 + 페이지 이동 등 검색 관련 공통 로직
 */
import { useNavigate } from 'react-router-dom';
import useSearchStore from '@/store/useSearchStore';

export const useSearch = () => {
  const navigate = useNavigate();
  const { addRecentSearch, setSearchQuery } = useSearchStore();

  /**
   * 검색 실행
   * @param {string} query - 검색어
   */
  const executeSearch = (query) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    // 검색어 설정 + 최근 검색어 추가
    setSearchQuery(trimmed);
    addRecentSearch(trimmed);

    // 검색 결과 페이지로 이동
    console.log('검색 실행:', trimmed);
    // TODO: 검색 결과 페이지 구현 후 주석 해제
    // navigate(`/search-result?q=${encodeURIComponent(trimmed)}`);
  };

  return { executeSearch };
};
