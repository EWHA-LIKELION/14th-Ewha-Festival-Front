/**
 * SearchBar 컴포넌트 (isMap: 지도용 스타일)
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import useSearchStore from '@/store/useSearchStore';
import useBottomsheetStore from '@/store/useBottomsheetStore';
import { useSearch } from '@/hooks';

const SearchBar = ({ isMap = false }) => {
  const navigate = useNavigate();
  const setSheetSize = useBottomsheetStore((s) => s.setSheetSize);
  const { searchQuery, setSearchQuery, clearSearchQuery, isFocused, setIsFocused } =
    useSearchStore();
  const { executeSearch } = useSearch();

  const handleBack = () => {
    clearSearchQuery();
    setSheetSize('medium');
    navigate('/map/booths');
    // 지도 초기화
  };

  const handleClear = () => {
    clearSearchQuery();
    setSheetSize('medium');
    navigate('/map/booths');
    // 지도 유지
  };

  const handleSearch = () => {
    executeSearch(searchQuery);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputClick = () => {
    setIsFocused(true);
    navigate('/search');
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="부스/공연명, 메뉴명, 부스번호 검색"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onClick={handleInputClick}
        className={`h-12 w-full rounded-full transition-all duration-100 ${isMap ? 'shadow-down-lg bg-white' : 'bg-zinc-100'} py-3 text-base font-normal text-zinc-800 placeholder:text-zinc-300 focus:outline-none ${
          isFocused || searchQuery ? 'px-12.5 ' : 'px-5'
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Button
        leftIcon="/icons/icon-search.svg"
        variant={!(isFocused || searchQuery) ? 'text-gray' : 'text-black'}
        size="md"
        onClick={handleSearch}
        className="absolute top-1/2 right-2.5 -translate-y-1/2"
      />
      <Button
        leftIcon="/icons/icon-chevronleft.svg"
        variant="text-black"
        size="md"
        onClick={handleBack}
        className={`absolute top-1/2 left-1 -translate-y-1/2 transition-opacity duration-100 ${
          isFocused || searchQuery ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <Button
        leftIcon="/icons/icon-xmarkgrey.svg"
        variant="text-grey"
        size="md"
        iconColor
        className={`absolute top-1/2 right-12.5 -translate-y-1/2 transition-opacity duration-100 ${
          searchQuery ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={handleClear}
      />
    </div>
  );
};

export default SearchBar;
