/**
 * Chip 컴포넌트 (variant 종류: 5가지 - bottomsheet, state, recent, filter, toggle)
 *
 * - bottomsheet : 바텀시트 필터 칩
 * - state       : 운영 상태 표시 칩
 * - recent      : 최근 검색어 칩
 * - filter      : 필터바 텍스트 칩
 * - toggle      : 필터바 토글 칩
 */

import React from 'react';

const BASE_STYLE =
  'inline-flex w-fit items-center justify-center whitespace-nowrap rounded-3xl border h-8';

const SIZE_MD = 'px-4 py-2';
const SIZE_SM = 'px-3 py-2';

const ACTIVE_CHIP = 'border-[#00bc7d] bg-emerald-50';
const INACTIVE_CHIP = 'border-gray-200 bg-white';

const ACTIVE_TEXT_MD = 'text-sm font-medium leading-5 tracking-normal text-center text-[#00bc7d]';
const INACTIVE_TEXT_MD = 'text-sm font-normal leading-5 tracking-normal text-center text-[#6a7282]';

const ACTIVE_TEXT_SM = 'text-xs font-medium leading-4 tracking-normal text-center text-[#00bc7d]';
const INACTIVE_TEXT_SM = 'text-xs font-medium leading-4 tracking-normal text-center text-[#6a7282]';

function Chip({
  variant = 'bottomsheet',
  text,
  selectedValue,
  isSelected = false,
  onDelete,
  onClick,
}) {
  const isSmall = variant === 'filter' || variant === 'toggle';
  const isActive = variant === 'recent' ? false : isSelected;
  const isClickable = !!onClick;

  // 표시 텍스트 결정하가ㅣ
  const getDisplayText = () => {
    if (variant === 'state') return isSelected ? '운영 중' : '종료';
    if (variant === 'filter' && isSelected && selectedValue) return selectedValue;
    return text;
  };

  const displayText = getDisplayText();
  const sizeClass = isSmall ? SIZE_SM : SIZE_MD;
  const textStyle = isSmall
    ? isActive
      ? ACTIVE_TEXT_SM
      : INACTIVE_TEXT_SM
    : isActive
      ? ACTIVE_TEXT_MD
      : INACTIVE_TEXT_MD;

  const hasDeleteIcon = variant === 'recent' || (variant === 'filter' && isSelected);
  const gapClass = hasDeleteIcon ? 'gap-0.5' : 'gap-1';

  const chipClass = `${BASE_STYLE} ${sizeClass} ${gapClass} ${isActive ? ACTIVE_CHIP : INACTIVE_CHIP} ${isClickable ? 'cursor-pointer' : ''}`;
  const Tag = isClickable ? 'button' : 'div';

  return (
    <Tag {...(isClickable && { type: 'button' })} className={chipClass} onClick={onClick}>
      <span className={textStyle}>{displayText}</span>
      {hasDeleteIcon && (
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation();
              onDelete?.();
            }
          }}
          className={`flex shrink-0 items-center justify-center ${isActive ? 'text-[#00bc7d]' : 'text-[#6a7282]'}`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      )}
    </Tag>
  );
}

export default Chip;
