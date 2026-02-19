/**
 * Badge 컴포넌트
 *
 * @param {'closed' | 'performing' | 'operating' | 'upcoming'} state - 배지 상태
 * @param {'md' | 'sm'} size - 배지 크기
 */

import React from 'react';

function Badge({ state = 'closed', size = 'md' }) {
  const states = {
    closed: { text: '종료', color: 'text-red-400' },
    performing: { text: '공연중', color: 'text-emerald-500' },
    operating: { text: '운영중', color: 'text-gray-500' },
    upcoming: { text: '공연전', color: 'text-gray-500' },
  };

  const sizes = {
    md: 'text-3.5 leading-5',
    sm: 'text-3 leading-4',
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
