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
      <div
        className={noPadding ? '' : 'pb-13'}
        style={
          noPadding ? undefined : { paddingBottom: 'calc(3.25rem + env(safe-area-inset-bottom))' }
        }
      >
        <Outlet />
      </div>

      <NavigationBar />
    </>
  );
};

export default NavigationBarLayout;
