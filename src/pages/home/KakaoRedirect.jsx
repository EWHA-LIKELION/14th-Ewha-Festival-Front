/**
 * 카카오 콜백 전용
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MeAPI } from '@/apis';
import useAuthStore from '@/store/useAuthStore';
import useAlertStore from '@/store/useAlertStore';

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const openAlert = useAlertStore((s) => s.openAlert);
  const closeAlert = useAlertStore((s) => s.closeAlert);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        // 쿠키 기반 인증 확인 (로그인 성공 여부 검증)
        await MeAPI.getMyProfile();

        // 로그인 상태 업데이트 (token 필요 없음)
        login();

        // 홈으로 이동
        navigate('/', { replace: true });
      } catch (error) {
        // 백엔드 API 에러 메시지 추출
        const message = error?.response?.data?.message || error?.message;

        openAlert({
          variant: 'error',
          title: '로그인 실패',
          text: message || '로그인 처리 중 오류가 발생했습니다.',
          onConfirm: () => {
            navigate('/', { replace: true });
            closeAlert();
          },
        });
      }
    };

    checkLogin();
  }, [navigate, login]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-base font-normal text-zinc-300">로그인 처리 중입니다...</p>
    </div>
  );
};

export default KakaoRedirect;
