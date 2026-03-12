/**
 * 관리자 코드 인증 페이지
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Input from '@/components/Input/Input';
import Button from '@/components/Button';
import Scrim from '@/components/Scrim';
import Alert from '@/components/Alert';
import useToastStore from '@/store/useToastStore';

const AdminConfirmPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToastStore();

  const [boothNumber, setBoothNumber] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  const isDisabled = !boothNumber || !adminCode;

  //추후 수정 예정
  const handleConfirm = async () => {
    try {
      //성공시 5-1-2페이지로 이동 및 토스트 생성
      if (boothNumber === '123456' && adminCode === 'CODE1886') {
        showToast('인증되었어요.');
        navigate('/5-1-2');
      } else {
        setShowErrorModal(true);
      }
      //db에 없을 경우 입력 값 유지
    } catch (error) {
      setShowErrorModal(true);
    }
  };

  return (
    <>
      <Header left="back" center="title" centerTitle="관리자 인증하기" />

      <div className="flex flex-col items-start justify-between pt-5 pr-5 pb-10 pl-5">
        <div className="flex flex-col items-start gap-3 self-stretch">
          <h3 className="text-base leading-6 font-semibold tracking-normal text-zinc-800">
            부스/공연 번호
          </h3>
          <Input
            variant="round"
            value={boothNumber}
            placeholder="부스/공연 번호를 입력해주세요"
            onChange={(value) => setBoothNumber(value)}
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
            onChange={(value) => setAdminCode(value)}
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

      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Scrim />
          <Alert
            variant="error"
            title="관리자 인증 오류"
            text={
              <>
                부스/공연 번호 혹은 관리자 코드를
                <br />
                다시 확인해주세요.
              </>
            }
            onConfirm={() => setShowErrorModal(false)}
          />
        </div>
      )}
    </>
  );
};

export default AdminConfirmPage;
