/**
 * Divider 컴포넌트
 *
 * @param {boolean} isAdmin - 관리자 페이지 여부. true면 연한 회색(border-gray-200), false면 기본 회색(border-gray-100) 적용
 */
import React from 'react';

const Divider = (isAdmin = 'false') => {
  return <hr className={`w-full ${isAdmin ? `border-gray-200` : `border-gray-100`}`} />;
};

export default Divider;
