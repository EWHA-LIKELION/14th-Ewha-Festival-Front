/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import React from 'react';
import Footer from '@/components/Footer';
import { ThumbnailImageUploader } from './FileUploader';
import { DetailImageUploader } from './FileUploader';

const ComponentPreview = () => {
  return (
    <>
      <div>ComponentPreview</div>
      <ThumbnailImageUploader />
      <DetailImageUploader />
      <Footer />
    </>
  );
};

export default ComponentPreview;
