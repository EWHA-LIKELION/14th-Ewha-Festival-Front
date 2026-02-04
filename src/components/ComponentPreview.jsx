/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import React from 'react';
import Alert from '@/components/Alert';
import Toast from '@/components/Toast';

const ComponentPreview = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 bg-gray-200 p-4">
        <Alert
          variant="delete"
          title="공지"
          text={
            <>
              공지를 삭제할까요? <br />
              삭제한 공지는 복구되지 않아요.
            </>
          }
        />
        <Alert variant="login" title="공지" text={<>언제든지 다시 로그인하실 수 있어요.</>} />
        <Toast text="리스트가 등록되었어요." />

        <div className="relative h-50">
          {/* 배경 */}
          <img src="/images/test.jpg" className="absolute inset-0 h-full w-full object-cover" />

          {/* Toast */}
          <div className="relative z-10 flex justify-center pt-10">
            <Toast text="리스트가 등록되었어요." />
          </div>
        </div>
      </div>
    </>
  );
};

export default ComponentPreview;
