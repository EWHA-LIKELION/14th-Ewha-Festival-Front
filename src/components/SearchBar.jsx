/**
 * SearchBar 컴포넌트 (isMap: 지도용 스타일)
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@/components/IconButton';

const SearchBar = ({ isMap = false, onSearch, searchValue }) => {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(searchValue || '');
  }, [searchValue]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/'); //이전 페이지가 없으면 home으로
    }
  };

  const handleSearch = () => {
    if (onSearch && inputValue.trim()) {
      onSearch(inputValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative w-88">
      <input
        type="text"
        placeholder="부스/공연명, 메뉴명, 부스번호 검색"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`h-12 w-full rounded-full transition-all duration-100 ${isMap ? 'bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.12)]' : 'bg-gray-100'} py-3 text-base font-normal text-gray-900 placeholder:text-gray-300 focus:outline-none ${
          isFocused || inputValue ? 'px-12.5 ' : 'px-5'
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <IconButton
        name="search"
        onClick={handleSearch}
        color={!(isFocused || inputValue) ? '#99A1AF' : '#4A5565'}
        className="absolute top-1/2 right-2.5 -translate-y-1/2"
      />
      <IconButton
        name="chevronleft"
        onClick={handleBack}
        className={`absolute top-1/2 left-1 -translate-y-1/2 transition-opacity duration-100 ${
          isFocused || inputValue ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <IconButton
        name="xmarkgrey"
        className={`absolute top-1/2 right-12.5 -translate-y-1/2 transition-opacity duration-100 ${
          inputValue ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setInputValue('')}
      />
    </div>
  );
};

export default SearchBar;
