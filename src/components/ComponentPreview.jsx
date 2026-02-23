/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import React, { useState } from 'react';
import Footer from '@/components/Footer';
import Timepicker from '@/components/Timepicker';

const ComponentPreview = () => {
  const [startTime1, setStartTime1] = useState('09:00');
  const [endTime1, setEndTime1] = useState('18:00');
  const [startTime2, setStartTime2] = useState('09:00');
  const [endTime2, setEndTime2] = useState('18:00');

  return (
    <>
      <div>ComponentPreview</div>
      <div className="p-4">
        <Timepicker
          startTime={startTime1}
          endTime={endTime1}
          isSelected={true}
          onStartChange={setStartTime1}
          onEndChange={setEndTime1}
        />
        <Timepicker
          startTime={startTime2}
          endTime={endTime2}
          isSelected={false}
          onStartChange={setStartTime2}
          onEndChange={setEndTime2}
        />
      </div>
    </>
  );
};

export default ComponentPreview;
