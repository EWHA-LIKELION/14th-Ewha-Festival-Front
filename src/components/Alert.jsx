/**
 * Alert 컴포넌트 ( variant: delete-삭제, logout-로그아웃)
 */

import React from 'react';

const Alert = ({ variant = 'delete', title, text }) => {
  const isDelete = variant === 'delete';

  return (
    <div className="flex w-80 flex-col items-center justify-center gap-4 p-6">
      <div className="flex flex-col items-center justify-center gap-2 p-0">
        {/* 아이콘은 삭제인 경우만 */}
        {isDelete && <img src="/icons/icon-alert.svg" />}

        {/* 타이틀 */}
        <h2>{isDelete ? `${title} 삭제` : '로그아웃'}</h2>

        {/* 문구 */}
        <p>{text}</p>
      </div>

      <div className="flex gap-3">
        <button>취소</button>
        <button>{isDelete ? '삭제' : '확인'}</button>
      </div>
    </div>
  );
};

export default Alert;
