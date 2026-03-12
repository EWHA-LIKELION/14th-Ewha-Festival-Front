/**
 * 관리자 코드 인증 페이지
 */

import React, { useState } from 'react';
import Header from '@/components/Header';
import Input from '@/components/Input/Input';
import Button from '@/components/Button';
import Scrim from '@/components/Scrim';

const AdminConfirmPage = () => {
  const [boothNumber, setBoothNumber] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  const isDisabled = !boothNumber || !adminCode;
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
        <>
          <Scrim />
          <div className="shadow-up-sm flex w-80 flex-col items-center justify-center gap-4 rounded-2xl bg-white p-6">
            <div className="flex flex-col items-center justify-center gap-2 self-stretch">
              <img src="/icons/icon-alert.svg" />
              <h2 className="mt-0.5">관리자 인증 오류</h2>
              <p>
                부스/공연 번호 혹은 관리자 코드를
                <br />
                다시 확인해주세요.
              </p>
            </div>

            <Button>확인</Button>
          </div>
        </>
      )}
    </>
  );
};

export default AdminConfirmPage;
