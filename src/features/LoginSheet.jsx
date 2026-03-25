/**
 * 로그인 바텀시트
 */

import BottomsheetScrim from '@/components/BottomsheetScrim';
import useAuthStore from '@/store/useAuthStore';

const LoginSheet = () => {
  const closeLoginSheet = useAuthStore((s) => s.closeLoginSheet);

  // 카카오 로그인 버튼 클릭 핸들러
  const handleKakaoLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/accounts/login/kakao/`;
  };

  return (
    <BottomsheetScrim size="login" onClose={closeLoginSheet}>
      <div className="flex h-full w-full flex-col items-center py-5">
        <h2 className="w-full pb-1 text-left text-xl font-semibold text-zinc-800">
          로그인하고 계속 이용해보세요!
        </h2>
        <p className="w-full pb-9 text-left text-base font-normal text-zinc-500">
          사이트 내 모든 기능을 바로 이용할 수 있어요.
        </p>
        <button
          className="mb-3 flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#FEE500] px-5 py-3"
          onClick={handleKakaoLogin}
        >
          <img src="/icons/logo-kakaotalk-login.svg" alt="kakaotalk-logo" />
          <p className="text-base font-medium text-black/85">카카오 로그인</p>
        </button>
      </div>
    </BottomsheetScrim>
  );
};

export default LoginSheet;
