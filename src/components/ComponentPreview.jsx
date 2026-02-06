/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import React from 'react';
import Footer from '@/components/Footer';
import Alert from '@/components/Alert';
import Scrim from './Scrim';

const ComponentPreview = () => {
  return (
    <>
      <div>ComponentPreview</div>
      <Scrim />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <Alert variant="login" />
      </div>
      <Footer />
    </>
  );
};

export default ComponentPreview;
