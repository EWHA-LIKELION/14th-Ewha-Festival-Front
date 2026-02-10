/**
 * NavigationBar 레이아웃 (noPadding: Map 페이지용)
 */
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar';

const NavigationBarLayout = ({ noPadding = false }) => {
  return (
    <>
      {/* 페이지 콘텐츠 */}
      <div className={noPadding ? '' : 'pb-13'}>
        <Outlet />
      </div>

      <NavigationBar />
    </>
  );
};

export default NavigationBarLayout;
