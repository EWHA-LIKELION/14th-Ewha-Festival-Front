/**
 * NavigationBar 레이아웃 (noPadding: Map 페이지용)
 */

import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar';

const NavigationBarLayout = () => {
  const { pathname } = useLocation();
  const noPadding = pathname.startsWith('/map') && !pathname.includes('/notice');

  return (
    <>
      {/* 페이지 콘텐츠 */}
      <div className={noPadding ? '' : 'pb-15'}>
        <Outlet />
      </div>

      <NavigationBar />
    </>
  );
};

export default NavigationBarLayout;
