/**
 * 로그인 바텀시트
 */

import BottomsheetScrim from '@/components/BottomsheetScrim';
import useAuthStore from '@/store/useAuthStore';
import logoKakaotalkLogin from '@/assets/icons/logo-kakaotalk-login.svg';

const LoginSheet = () => {
  const closeLoginSheet = useAuthStore((s) => s.closeLoginSheet);

  const handleKakaoLogin = () => {
    // state(로그인 후 리다이렉트 대상)는 빌드 모드(import.meta.env.DEV)가 아니라
    // 런타임 hostname으로 판정 — 빌드가 development 모드로 나가도 프로덕션 도메인에선 항상 'prod'
    const { hostname } = window.location;
    const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
    const state = isLocal ? 'local' : 'prod';
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/accounts/login/kakao/?state=${state}`;
  };

  return (
    <BottomsheetScrim onClose={closeLoginSheet}>
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
          <img src={logoKakaotalkLogin} alt="kakaotalk-logo" />
          <p className="text-base font-medium text-black/85">카카오 로그인</p>
        </button>
      </div>
    </BottomsheetScrim>
  );
};

export default LoginSheet;
