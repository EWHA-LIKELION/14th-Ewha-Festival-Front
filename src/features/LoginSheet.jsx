/**
 * 로그인 바텀시트
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomsheetScrim from '@/components/BottomsheetScrim';
import Button from '@/components/Button';
import useAuthStore from '@/store/useAuthStore';

const LoginSheet = () => {
  const navigate = useNavigate();
  const closeLoginSheet = useAuthStore((s) => s.closeLoginSheet);

  const goAdminConfirm = () => {
    closeLoginSheet();
    navigate('/admin/confirm');
  };

  return (
    <BottomsheetScrim size="small" onClose={closeLoginSheet}>
      <div className="flex h-full w-full flex-col items-center py-5">
        <h2 className="w-full pb-1 text-left text-xl font-semibold text-zinc-800">
          로그인하고 계속 이용해보세요!
        </h2>
        <p className="w-full pb-9 text-left text-base font-normal text-zinc-500">
          사이트 내 모든 기능을 바로 이용할 수 있어요.
        </p>
        <button className="mb-3 flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#FEE500] px-5 py-3">
          <img src="/icons/logo-kakaotalk-login.svg" alt="kakaotalk-logo" />
          <p className="text-base font-medium text-black/85">카카오 로그인</p>
        </button>
        <Button variant="underline-gray" size="sm" onClick={goAdminConfirm}>
          관리자이신가요?
        </Button>
      </div>
    </BottomsheetScrim>
  );
};

export default LoginSheet;
