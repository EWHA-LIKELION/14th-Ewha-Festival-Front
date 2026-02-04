/**
 * Toast 컴포넌트
 */

import React from 'react';

const Toast = ({ text = '' }) => {
  return (
    <div className="backdrop-blur-token-lg flex w-89.5 items-center gap-2 rounded-lg bg-black/50 px-5 py-3">
      <img src="/icons/icon-greencheck.svg" />
      <p className="text-sm leading-5 font-semibold tracking-normal text-white">{text}</p>
    </div>
  );
};

export default Toast;
