/**
 * Divider 컴포넌트 (Public 페이지용과 Admin 페이지용 구분)
 */
import React from 'react';

export const PublicDivider = () => {
  return <hr className="w-88 border-gray-100" />;
};

//AdminDivider width type 2가지(short/long)
export const AdminDivider = ({ width = 'short' }) => {
  const widthClass = width === 'long' ? 'w-98' : 'w-88';
  return <hr className={`border-gray-200 ${widthClass}`} />;
};
