/**
 * Badge 컴포넌트
 *
 * @param {'closed' | 'performing' | 'operating' | 'upcoming'} state - 배지 상태
 * @param {'md' | 'sm'} size - 배지 크기
 */

import React from 'react';

function Badge({ state = 'closed', size = 'md' }) {
  const states = {
    closed: { text: '종료', color: 'text-[#FF5B5E]' },
    performing: { text: '공연중', color: 'text-[#00BC7D]' },
    operating: { text: '운영중', color: 'text-[#6A7282]' },
    upcoming: { text: '공연전', color: 'text-[#6A7282]' },
  };

  const sizes = {
    md: 'text-[14px] leading-[20px]',
    sm: 'text-[12px] leading-[16px]',
  };

  const { text, color } = states[state];

  return (
    <span
      className={`inline-flex items-center justify-center font-semibold tracking-normal ${color} ${sizes[size]}`}
    >
      {text}
    </span>
  );
}

export default Badge;
