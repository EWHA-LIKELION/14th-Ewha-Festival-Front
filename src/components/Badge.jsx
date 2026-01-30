/**
 * Badge 컴포넌트 (variant 종류 : 2가지)
 */

import React from 'react';

function Badge({ variant = 'ongoing' }) {
  const variants = {
    ongoing: { text: '공연중' },
    ended: { text: '종료' },
  };

  return (
    <span className="inline-flex min-w-fit items-center justify-center rounded-[18px] bg-[#5d5a88] p-2.5 px-2.5 py-1 text-[12px] leading-normal font-medium tracking-[-0.012px] text-white">
      {variants[variant].text}
    </span>
  );
}

export default Badge;
