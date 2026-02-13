/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import React from 'react';
import Header from '@/components/Header';

const ComponentPreview = () => {
  return (
    <div className="flex h-600 flex-col items-center gap-5 bg-gray-400">
      <Header left="back" center="title" right="edit" background="gradient" />
    </div>
  );
};

export default ComponentPreview;
