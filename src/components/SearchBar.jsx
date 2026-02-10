/**
 * SearchBar 컴포넌트 (isMap: 지도용 스타일)
 */

import React, { useState } from 'react';
import IconButton from '@/components/IconButton';

const SearchBar = ({ isMap = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="relative w-88">
      <input
        type="text"
        placeholder="부스/공연명, 메뉴명, 부스번호 검색"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={`h-12 w-full rounded-full ${isMap ? 'bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.12)]' : 'bg-gray-100'} px-12.5 py-3 text-base font-normal text-gray-900 placeholder:text-gray-300 focus:outline-none ${inputValue ? 'pr-22.5' : ''}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <IconButton
        name="search"
        className={`absolute top-1/2 -translate-y-1/2 ${isFocused || inputValue ? 'right-2.5' : 'left-2.5'}`}
      />
      {(isFocused || inputValue) && (
        <IconButton name="chevronleft" className="absolute top-1/2 left-1 -translate-y-1/2" />
      )}
      {inputValue && (
        <IconButton
          name="xmarkgrey"
          className="absolute top-1/2 right-12.5 -translate-y-1/2"
          onClick={() => setInputValue('')}
        />
      )}
    </div>
  );
};

export default SearchBar;
