/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import React, { useState } from 'react';
import Tab from '@/components/Tab';

const ComponentPreview = () => {
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [activeIndex2, setActiveIndex2] = useState(0);
  const [activeIndex3, setActiveIndex3] = useState(0);
  const [activeIndex4, setActiveIndex4] = useState(0);
  return (
    <>
      <div className="p-8">
        <div>Type 1 탭</div>
        <br />
        <Tab tabs={['부스', '공연']} activeIndex={activeIndex1} onChange={setActiveIndex1} />
        <br />
        <br />
        <br />
        <div>Type 2 탭</div>
        <br />
        <Tab
          variant="underline"
          tabs={['리스트', '후기']}
          activeIndex={activeIndex3}
          onChange={setActiveIndex3}
        />
        <br />
        <Tab
          variant="underline"
          tabs={['세트리스트', '후기']}
          activeIndex={activeIndex4}
          onChange={setActiveIndex4}
        />
      </div>
    </>
  );
};

export default ComponentPreview;