import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar';

const NavigationBarLayout = ({ noPadding = false }) => {
  return (
    <>
      {/* 페이지 콘텐츠 */}
      <div className={noPadding ? '' : 'pb-20'}>
        <Outlet />
      </div>

      <NavigationBar />
    </>
  );
};

export default NavigationBarLayout;
