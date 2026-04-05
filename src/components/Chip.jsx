/**
 * Chip 컴포넌트 (variant 종류: 5가지 - bottomsheet, state, recent, filter, toggle)
 *
 * - bottomsheet : 바텀시트 필터 칩
 * - state       : 운영 상태 표시 칩
 * - recent      : 최근 검색어 칩
 * - filter      : 필터바 텍스트 칩
 * - toggle      : 필터바 토글 칩
 */

const BASE_STYLE =
  'inline-flex w-fit items-center justify-center whitespace-nowrap rounded-3xl border h-8';

const SIZE_MD = 'px-4 py-2';
const SIZE_SM = 'px-3 py-2';
const SIZE_TOGGLE = 'py-2 px-2.5';

const ACTIVE_CHIP = 'border-emerald-600 bg-emerald-50';
const INACTIVE_CHIP = 'border-zinc-200 bg-white';

const ACTIVE_TEXT_MD = 'text-sm font-medium leading-5 tracking-normal text-center text-emerald-600';
const INACTIVE_TEXT_MD = 'text-sm font-normal leading-5 tracking-normal text-center text-zinc-500';

const ACTIVE_TEXT_SM = 'text-xs font-medium leading-4 tracking-normal text-center text-emerald-600';
const INACTIVE_TEXT_SM = 'text-xs font-medium leading-4 tracking-normal text-center text-zinc-500';

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
  const sizeClass = variant === 'toggle' ? SIZE_TOGGLE : isSmall ? SIZE_SM : SIZE_MD;
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
      {variant === 'toggle' ? (
        <svg
          width="10"
          height="13"
          viewBox="0 0 10 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 7C7.17157 7 6.5 7.67157 6.5 8.5C6.5 9.15575 6.92152 9.71113 7.50781 9.91504C7.50307 9.94268 7.5 9.971 7.5 10V12.5C7.5 12.7761 7.72386 13 8 13C8.27614 13 8.5 12.7761 8.5 12.5V10C8.5 9.97095 8.49597 9.94274 8.49121 9.91504C9.07796 9.71138 9.5 9.15608 9.5 8.5C9.5 7.67157 8.82843 7 8 7ZM8 7C8.27614 7 8.5 6.77614 8.5 6.5V0.5C8.5 0.223858 8.27614 0 8 0C7.72386 0 7.5 0.223858 7.5 0.5V6.5C7.5 6.77614 7.72386 7 8 7ZM1.5 12.5V5C1.5 4.971 1.50307 4.94268 1.50781 4.91504C0.921518 4.71113 0.5 4.15575 0.5 3.5C0.5 2.84413 0.92136 2.2878 1.50781 2.08398C1.50318 2.05664 1.5 2.02867 1.5 2V0.5C1.5 0.223858 1.72386 0 2 0C2.27614 0 2.5 0.223858 2.5 0.5V2C2.5 2.02872 2.49586 2.05659 2.49121 2.08398C3.07812 2.28755 3.5 2.84381 3.5 3.5C3.5 4.15608 3.07796 4.71138 2.49121 4.91504C2.49597 4.94274 2.5 4.97095 2.5 5V12.5C2.5 12.7761 2.27614 13 2 13C1.72386 13 1.5 12.7761 1.5 12.5Z"
            stroke={isActive ? '#56A85B' : '#9f9fa9'}
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <span className={textStyle}>{displayText}</span>
      )}
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
          className={`flex shrink-0 items-center justify-center ${isActive ? 'text-emerald-600' : 'text-zinc-500'}`}
        >
          <svg
            className="size-4"
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
