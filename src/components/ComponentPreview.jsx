/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import React from 'react';
import Footer from '@/components/Footer';
import Radio from '@/components/Radio';

const ComponentPreview = () => {
  return (
    <>
      <div>ComponentPreview</div>
      <div className="p-4">
      <br/>
      <Radio label="라디오 버튼" selected={false} error={false} showLabel={true} onChange={() => {}}/>
      <br/>
      <Radio label="라디오 버튼" selected={true} error={false} showLabel={true} onChange={() => {}}/>
      <br/>
      <Radio label="라디오 버튼" selected={false} error={true} showLabel={true} onChange={() => {}}/>
      <br/>
      <Radio label="" selected={false} error={false} showLabel={false} onChange={() => {}}/>
      <br/>
      <Radio label="" selected={true} error={false} showLabel={false} onChange={() => {}}/>
      <br/>
      <Radio label="" selected={false} error={true} showLabel={false} onChange={() => {}}/>
        </div>
    </>
  );
};

export default ComponentPreview;
