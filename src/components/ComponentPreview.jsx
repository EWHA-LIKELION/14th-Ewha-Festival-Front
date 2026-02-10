/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import React from 'react';
import Footer from '@/components/Footer';
import Timepicker from '@/components/Timepicker';

const ComponentPreview = () => {
  return (
    <>
      <div>ComponentPreview</div>
      <div className="p-4">
        <Timepicker isActive={true} />
        <Timepicker isActive={false} />
      </div>
    </>
  );
};

export default ComponentPreview;
