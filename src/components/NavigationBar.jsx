import React from 'react';
import { useNavigate, useMatch } from 'react-router-dom';

const NavigationBar = () => {
  const navigate = useNavigate();

  // Hooks를 최상위에서 호출하여 순서 보장
  const matchHome = useMatch({ path: '/', end: true });
  const matchMap = useMatch('/map/*');
  const matchMy = useMatch('/my/*');

  const navItems = [
    {
      iconActive: '/icons/icon-home-selected.svg',
      iconInactive: '/icons/icon-home-unselected.svg',
      label: '홈',
      path: '/',
      isActive: matchHome,
    },
    {
      iconActive: '/icons/icon-location-selected.svg',
      iconInactive: '/icons/icon-location-unselected.svg',
      label: '부스/공연',
      path: '/map',
      isActive: matchMap,
    },
    {
      iconActive: '/icons/icon-my-selected.svg',
      iconInactive: '/icons/icon-my-unselected.svg',
      label: '마이',
      path: '/my',
      isActive: matchMy,
    },
  ];

  return (
    <div
      className="fixed bottom-0 left-1/2 z-50 flex h-13 w-[392px] -translate-x-1/2 justify-between border-t border-gray-100 bg-white pt-1.5 text-xs font-medium"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {navItems.map((item) => {
        return (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`flex h-fit w-20 flex-col items-center justify-center gap-1 ${
              item.isActive ? 'text-emerald-500' : 'text-gray-500'
            }`}
          >
            <img src={item.isActive ? item.iconActive : item.iconInactive} alt={item.label} />
            <p>{item.label}</p>
          </button>
        );
      })}
    </div>
  );
};

export default NavigationBar;
