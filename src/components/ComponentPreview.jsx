/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import React from 'react';
import Header from '@/components/Header';

const ComponentPreview = () => {
  return (
    <div className="flex h-600 flex-col items-center gap-5 bg-gray-400">
      <Header left="back" center="title" right="edit" background="gradient" />
      <Header left="back" center="title" right="save" background="gradient" />
      <Header left="logo" right="search" />
      <Header center="search" searchValue="안녕하세요" background="white" />
      <Header center="search" background="transparent" />
      <Header left="back" center="title" right="edit" />
      <Header left="back" center="title" centerTitle="스크랩북" right="search" />
      <Header left="back" background="transparent" />
    </div>
  );
};

export default ComponentPreview;
