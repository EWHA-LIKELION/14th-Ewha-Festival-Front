/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import React from 'react';
import Footer from '@/components/Footer';
import { Accordion, AdminAccordion } from '@/components/Accordion';

const ComponentPreview = () => {
  //확인용
  const handleClick = () => console.log('chip clicked');
  const handleDelete = () => console.log('chip deleted');
  const handleFilterClick = (key) => console.log('filter click:', key);
  const handleFilterDelete = (key) => console.log('filter delete:', key);
  const handleSettingClick = () => console.log('setting clicked');

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
