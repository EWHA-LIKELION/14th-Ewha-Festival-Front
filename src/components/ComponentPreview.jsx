/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import React from 'react';
import DropDown from '@/components/DropDown';

const ComponentPreview = () => {
  return (
    <>
      <div className="flex h-100 items-center justify-center">
        <DropDown />
      </div>
    </>
  );
};

export default ComponentPreview;
