/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import React from 'react';
import SearchBar from '@/components/SearchBar';

const ComponentPreview = () => {
  return (
    <div className="flex flex-col items-center">
      <br />
      <SearchBar />
      <br />
      <SearchBar isMap />
      <br />
    </div>
  );
};

export default ComponentPreview;
