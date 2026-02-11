/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import React from 'react';
import Tab from '@/components/Tab';

const ComponentPreview = () => {
  return (
    <>
      <div className="p-8">
        <div>Type 1 탭</div>
        <br />
        <Tab tabs={['부스', '공연']} activeIndex={0} onChange={(i) => setActiveIndex(i)} />
        <br />
        <br />
        <br />
        <div>Type 2 탭</div>
        <br />
        <Tab
          variant="underline"
          tabs={['리스트', '후기']}
          activeIndex={0}
          onChange={(i) => setActiveIndex(i)}
        />
        <br />
        <Tab
          variant="underline"
          tabs={['세트리스트', '후기']}
          activeIndex={1}
          onChange={(i) => setActiveIndex(i)}
        />
      </div>
    </>
  );
};

export default ComponentPreview;
