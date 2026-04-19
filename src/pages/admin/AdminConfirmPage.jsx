/**
 * 관리자 코드 인증 페이지
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { AdminAPI } from '@/apis';
import useAuthStore from '@/store/useAuthStore';
import useAlertStore from '@/store/useAlertStore';
import useToastStore from '@/store/useToastStore';
import Header from '@/components/Header';
import Input from '@/components/Input/Input';
import Button from '@/components/Button';

const AdminConfirmPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();
  const openAlert = useAlertStore((s) => s.openAlert);
  const closeAlert = useAlertStore((s) => s.closeAlert);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const openLoginSheet = useAuthStore((s) => s.openLoginSheet);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/my');
      openLoginSheet();
    }
  }, [isLoggedIn]);

  const [boothNumber, setBoothNumber] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [boothNumberError, setBoothNumberError] = useState('');
  const [adminCodeError, setAdminCodeError] = useState('');

  const isDisabled = !boothNumber || !adminCode;

  const handleConfirm = async () => {
    setBoothNumberError('');
    setAdminCodeError('');
    try {
      await AdminAPI.verifyAdminCode(boothNumber, adminCode);
      await queryClient.invalidateQueries({ queryKey: ['myProfile'] });
      showToast('인증되었어요.');
      navigate('/my');
    } catch (error) {
      if (error?.programname || error?.password) {
        setBoothNumberError(error.programname?.[0] ?? '');
        setAdminCodeError(error.password?.[0] ?? '');
      } else {
        openAlert({
          variant: 'error',
          title: '관리자 인증 오류',
          text: error?.detail ?? (
            <>
              부스/공연 번호 혹은 관리자 코드를
              <br />
              다시 확인해주세요.
            </>
          ),
          onConfirm: closeAlert,
        });
      }
    }
  };

  return (
    <>
      <Header left="back" center="title" centerTitle="관리자 인증하기" />

      <div className="flex flex-col items-start justify-between px-5 pt-23">
        <div className="flex flex-col items-start gap-3 self-stretch">
          <h3 className="text-base leading-6 font-semibold tracking-normal text-zinc-800">
            부스/공연 번호
          </h3>
          <Input
            variant="round"
            value={boothNumber}
            placeholder="부스/공연 번호를 입력해주세요"
            onChange={(value) => {
              setBoothNumber(value);
              setBoothNumberError('');
            }}
            error={!!boothNumberError}
            helperText={boothNumberError}
          />
        </div>

        <div className="mt-6 flex flex-col items-start gap-2 self-stretch">
          <h3 className="text-base leading-6 font-semibold tracking-normal text-zinc-800">
            관리자 코드
          </h3>
          <Input
            variant="round"
            value={adminCode}
            placeholder="관리자 코드를 입력해주세요"
            onChange={(value) => {
              setAdminCode(value);
              setAdminCodeError('');
            }}
            error={!!adminCodeError}
            helperText={adminCodeError}
          />
        </div>

        <Button
          className="absolute right-5 bottom-10 left-5"
          disabled={isDisabled}
          onClick={handleConfirm}
        >
          확인
        </Button>
      </div>
    </>
  );
};

export default AdminConfirmPage;
