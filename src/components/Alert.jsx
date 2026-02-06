/**
 * Alert 컴포넌트 ( variant: delete-삭제, logout-로그아웃)
 */

import React from 'react';

const Alert = ({ variant = 'delete', title = '', text, onCancel, onConfirm }) => {
  const isDelete = variant === 'delete';

  return (
    <div className="alert-shadow flex w-80 flex-col items-center justify-center gap-4 rounded-2xl bg-white p-6">
      <div
        className={`flex flex-col items-center justify-center gap-2 ${isDelete ? 'p-0' : 'p-4'}`}
      >
        {/* 아이콘은 삭제인 경우만 */}
        {isDelete && <img src="/icons/icon-alert.svg" />}

        {/* 타이틀 */}
        <h2 className="mt-0.5 text-center text-lg leading-6 font-semibold tracking-normal text-gray-900">
          {isDelete && `${title} 삭제`}
          {!isDelete && '로그아웃하시겠어요?'}
        </h2>

        {/* 문구 */}
        <p className="text-center text-sm leading-5 font-normal tracking-normal text-gray-500">
          {isDelete ? text : '언제든지 다시 로그인하실 수 있어요.'}
        </p>
      </div>

      <div className="flex gap-3 p-0">
        <button
          type="button"
          onClick={onCancel}
          className="flex w-32.5 items-center justify-center gap-1.5 rounded-lg bg-gray-100 p-3 text-center text-base leading-6 font-medium tracking-normal text-gray-500"
        >
          취소
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={`flex w-32.5 items-center justify-center gap-1.5 rounded-lg p-3 text-center text-base leading-6 font-medium tracking-normal ${
            isDelete ? 'bg-red-400 text-white' : 'bg-emerald-500 text-white'
          }`}
        >
          {isDelete ? '삭제' : '확인'}
        </button>
      </div>
    </div>
  );
};

export default Alert;
