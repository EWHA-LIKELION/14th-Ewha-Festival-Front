/**
 * 검색 페이지
 */
import Header from '@/components/Header';
import Chip from '@/components/Chip';
import useSearchStore from '@/store/useSearchStore';
import { useSearch } from '@/hooks';

const SearchPage = () => {
  const { recentSearches, removeRecentSearch, clearRecentSearches } = useSearchStore();
  const { executeSearch } = useSearch();

  // Chip 또는 인기 검색어 클릭 시 검색 실행
  const handleSearchClick = (query) => {
    executeSearch(query);
  };

  const handleDelete = (query) => {
    removeRecentSearch(query);
  };

  const handleClearAll = () => {
    clearRecentSearches();
  };

  return (
    <>
      <Header center="search" />
      <section className="flex w-full flex-col justify-center gap-9 p-5 pt-23">
        <div className="flex flex-col gap-3">
          <h1 className="text-lg font-semibold text-gray-900">최근 검색어</h1>
          <div
            className={`flex min-h-18 w-full ${recentSearches.length > 0 ? 'items-start' : 'items-center justify-center'}`}
          >
            {recentSearches.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((query) => (
                  <Chip
                    key={query}
                    variant="recent"
                    text={query}
                    onDelete={() => handleDelete(query)}
                    onClick={() => handleSearchClick(query)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-base font-normal text-gray-300">
                최근 검색어가 없습니다.
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900">인기 검색어</h1>
            <p className="text-xs font-normal text-gray-300">오전 12시 업데이트</p>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-3">
            {/* 왼쪽 열: 1~5 */}
            {[1, 2, 3, 4, 5].map((rank) => (
              <div key={rank} className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-500">{rank}</span>
                <button
                  onClick={() => handleSearchClick(`인기검색어${rank}`)}
                  className="text-sm font-medium text-gray-900"
                >
                  인기검색어{rank}
                </button>
              </div>
            ))}

            {/* 오른쪽 열: 6~10 */}
            {[6, 7, 8, 9, 10].map((rank) => (
              <div key={rank} className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-500">{rank}</span>
                <button
                  onClick={() => handleSearchClick(`인기검색어${rank}`)}
                  className="text-sm font-medium text-gray-900"
                >
                  인기검색어{rank}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchPage;
