/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import React from 'react';
import Footer from '@/components/Footer';
import { Accordion, AdminAccordion } from '@/components/Accordion';

const ComponentPreview = () => {
  return (
    <>
      <div className="flex flex-col gap-3 p-4">
        <Accordion title="Title of accordion" time="2" isUpdate content="Content text" />
        <AdminAccordion title="Title of accordion">children content</AdminAccordion>
      </div>
    </>
  );
};

export default ComponentPreview;
