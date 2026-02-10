/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import React from 'react';
import Footer from '@/components/Footer';
import Checkbox from '@/components/Checkbox';

const ComponentPreview = () => {
  return (
    <>
      <div className="flex flex-col p-4 gap-3">
      <div className="mb-2">ComponentPreview</div>
        <Checkbox label="Checkbox label" />
        <Checkbox label="Checkbox label" isSelected={true} />
        <Checkbox label="Checkbox label" isError={true} />
        <br/>
        <Checkbox />
        <Checkbox isSelected={true} />
        <Checkbox isError={true}/>
      </div>
    </>
  );
};

export default ComponentPreview;
