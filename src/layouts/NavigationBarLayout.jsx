/**
 * NavigationBar 레이아웃 (noPadding: Map 페이지용)
 */

import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar';

const NavigationBarLayout = () => {
  const { pathname } = useLocation();
  const noPadding = pathname.startsWith('/map') && !pathname.includes('/notice');
  const isHomePage = pathname === '/';

  // 홈 페이지에서만 스크롤에 따라 네비게이션바 표시/숨김
  const [showNavBar, setShowNavBar] = useState(!isHomePage);

  useEffect(() => {
    // 홈 페이지가 아니면 항상 표시
    if (!isHomePage) {
      setShowNavBar(true);
      return;
    }

    // 홈 페이지: 스크롤 이벤트 리스너
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowNavBar(true);
      } else {
        setShowNavBar(false);
      }
    };

    // 초기 상태 설정
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  return (
    <>
      {/* 페이지 콘텐츠 */}
      <div className={noPadding ? '' : 'pb-15'}>
        <Outlet />
      </div>

      {/* 네비게이션바 */}
      <NavigationBar className={showNavBar ? 'translate-y-0' : 'translate-y-full'} />
    </>
  );
};

export default NavigationBarLayout;
