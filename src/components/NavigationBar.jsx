/**
 * NavigationBar 컴포넌트
 */
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
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M4 19V10C4 9.68333 4.071 9.38333 4.213 9.1C4.355 8.81667 4.55067 8.58333 4.8 8.4L10.8 3.9C11.15 3.63333 11.55 3.5 12 3.5C12.45 3.5 12.85 3.63333 13.2 3.9L19.2 8.4C19.45 8.58333 19.646 8.81667 19.788 9.1C19.93 9.38333 20.0007 9.68333 20 10V19C20 19.55 19.804 20.021 19.412 20.413C19.02 20.805 18.5493 21.0007 18 21H15C14.7167 21 14.4793 20.904 14.288 20.712C14.0967 20.52 14.0007 20.2827 14 20V15C14 14.7167 13.904 14.4793 13.712 14.288C13.52 14.0967 13.2827 14.0007 13 14H11C10.7167 14 10.4793 14.096 10.288 14.288C10.0967 14.48 10.0007 14.7173 10 15V20C10 20.2833 9.904 20.521 9.712 20.713C9.52 20.905 9.28267 21.0007 9 21H6C5.45 21 4.97933 20.8043 4.588 20.413C4.19667 20.0217 4.00067 19.5507 4 19Z"
            fill="currentColor"
          />
        </svg>
      ),
      label: '홈',
      path: '/',
      isActive: matchHome,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12.0996 3C14.1151 3 16.0484 3.80055 17.4736 5.22559C18.8988 6.65077 19.7001 8.58411 19.7002 10.5996C19.7002 14.8955 15.3826 19.1921 13.2559 21.0479C12.5861 21.632 11.613 21.6322 10.9434 21.0479C8.81655 19.1921 4.5 14.8955 4.5 10.5996C4.5001 8.58411 5.3004 6.65077 6.72559 5.22559C8.15077 3.8004 10.0841 3.0001 12.0996 3ZM12.1006 6.5C10.1676 6.5 8.60059 8.067 8.60059 10C8.60059 11.933 10.1676 13.5 12.1006 13.5C14.0334 13.4997 15.6006 11.9328 15.6006 10C15.6006 8.06717 14.0334 6.50026 12.1006 6.5Z"
            fill="currentColor"
          />
        </svg>
      ),
      label: '부스/공연',
      path: '/map',
      isActive: matchMap,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM4 18V17.2C4 16.6333 4.146 16.1127 4.438 15.638C4.73 15.1633 5.11733 14.8007 5.6 14.55C6.63333 14.0333 7.68333 13.646 8.75 13.388C9.81667 13.13 10.9 13.0007 12 13C13.1 12.9993 14.1833 13.1287 15.25 13.388C16.3167 13.6473 17.3667 14.0347 18.4 14.55C18.8833 14.8 19.271 15.1627 19.563 15.638C19.855 16.1133 20.0007 16.634 20 17.2V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H6C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18Z"
            fill="currentColor"
          />
        </svg>
      ),
      label: '마이',
      path: '/my',
      isActive: matchMy,
    },
  ];

  return (
    <div
      className="fixed bottom-0 left-1/2 z-10 flex h-15 w-full -translate-x-1/2 items-center justify-between border-t border-gray-100 bg-white px-7 text-xs font-medium md:w-[392px]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {navItems.map((item) => {
        return (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="flex h-fit w-20 flex-col items-center justify-center gap-1 text-xs font-medium"
          >
            <div className={item.isActive ? 'text-emerald-500' : 'text-gray-400'}>{item.icon}</div>
            <p className={item.isActive ? 'text-emerald-500' : 'text-gray-500'}>{item.label}</p>
          </button>
        );
      })}
    </div>
  );
};

export default NavigationBar;
