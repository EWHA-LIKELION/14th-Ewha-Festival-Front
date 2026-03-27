/**
 * 카카오 콜백 전용
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthAPI } from '@/apis';
import useAuthStore from '@/store/useAuthStore';
import Alert from '@/components/Alert';

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const login = useAuthStore((s) => s.login);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        // 쿠키 기반 인증 확인 (로그인 성공 여부 검증)
        await AuthAPI.checkLoginStatus();

        // 로그인 상태 업데이트 (token 필요 없음)
        login();

        // 홈으로 이동
        navigate('/', { replace: true });
      } catch (error) {
        // 백엔드 API 에러 메시지 추출
        const message = error?.response?.data?.message || error?.message;

        setAlert({
          variant: 'error',
          title: '로그인 실패',
          text: message || '로그인 처리 중 오류가 발생했습니다.',
          onConfirm: () => navigate('/', { replace: true }),
        });
      }
    };

    checkLogin();
  }, [navigate, login]);

  return (
    <>
      <div>로그인 처리 중입니다...</div>

      {alert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <Alert
            variant={alert.variant}
            title={alert.title}
            text={alert.text}
            onCancel={() => navigate('/', { replace: true })}
            onConfirm={alert.onConfirm}
          />
        </div>
      )}
    </>
  );
};

export default KakaoRedirect;
