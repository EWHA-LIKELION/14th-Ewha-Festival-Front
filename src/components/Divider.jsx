/**
 * Divider 컴포넌트
 *
 * @param {boolean} isAdmin - 관리자 페이지 여부. true면 연한 회색(border-zinc-200), false면 기본 회색(border-zinc-100) 적용
 */
import React from 'react';

const Divider = (isAdmin = 'false') => {
  return <hr className={`w-full ${isAdmin ? `border-zinc-200` : `border-zinc-100`}`} />;
};

export default Divider;
