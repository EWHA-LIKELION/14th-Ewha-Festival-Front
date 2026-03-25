/**
 * 카카오 콜백 전용
 */

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthAPI } from '@/apis';
import useAuthStore from '@/store/useAuthStore';
import Alert from '@/components/Alert';

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [alert, setAlert] = useState(null);
  const login = useAuthStore((s) => s.login);

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      setAlert({
        variant: 'error',
        title: '로그인 실패',
        text: '카카오 로그인이 취소되었습니다.',
        onConfirm: () => navigate('/', { replace: true }),
      });
      return;
    }

    if (!code) {
      setAlert({
        variant: 'error',
        title: '로그인 실패',
        text: '인증 코드가 없습니다.',
        onConfirm: () => navigate('/', { replace: true }),
      });
      return;
    }

    (async () => {
      try {
        const data = await AuthAPI.handleKakaoCallback({ code });

        login(data.access);
        localStorage.setItem('refreshToken', data.refresh);

        navigate('/', { replace: true });
      } catch (error) {
        const message = error?.response?.data?.message;
        setAlert({
          variant: 'error',
          title: '로그인 실패',
          text: message || '로그인 처리 중 오류가 발생했습니다.',
          onConfirm: () => navigate('/', { replace: true }),
        });
      }
    })();
  }, [navigate, searchParams, login]);

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
            onConfirm={alert.onConfirm || (() => setAlert(null))}
          />
        </div>
      )}
    </>
  );
};

export default KakaoRedirect;
