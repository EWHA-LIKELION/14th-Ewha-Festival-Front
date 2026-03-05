/**
 * 마이페이지
 */

import React, { useEffect } from 'react';
import useAuthStore from '@/store/useAuthStore';

const MyPage = () => {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const openLoginSheet = useAuthStore((s) => s.openLoginSheet);

  useEffect(() => {
    if (!isLoggedIn) {
      openLoginSheet();
    }
  }, []);

  return <></>;
};

export default MyPage;
