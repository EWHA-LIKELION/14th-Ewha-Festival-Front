/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import React from 'react';
import { PublicDivider, AdminDivider } from '@/components/Divider';

const ComponentPreview = () => {
  return (
    <>
      <br />
      <PublicDivider />
      <br />
      <AdminDivider />
      <br />
      <AdminDivider width="long" />
    </>
  );
};

export default ComponentPreview;
