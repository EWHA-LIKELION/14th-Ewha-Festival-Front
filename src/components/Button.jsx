/**
 * Button 컴포넌트
 *
 * @param {Object} props
 * @param {('sm'|'md'|'lg')} [props.size='lg'] - 버튼 크기
 * @param {('bg-green'|'bg-red'|'bg-gray'|'bg-white'|'bg-pink'|'text-black'|'text-gray'|'underline-green'|'underline-gray'|'underline-white')} [props.variant='bg-green'] - 버튼 스타일 variant
 * @param {boolean} [props.circle=false] - 둥근 버튼 여부 (true일 경우 둥근 버튼, false이면서 bg있으면 사각형 버튼)
 * @param {boolean} [props.shadow=false] - 그림자 효과 여부
 * @param {boolean} [props.disabled=false] - 비활성화 상태
 * @param {string|React.ReactNode} [props.leftIcon] - 왼쪽 아이콘 (이미지 경로 또는 JSX 요소)
 * @param {string|React.ReactNode} [props.rightIcon] - 오른쪽 아이콘 (이미지 경로 또는 JSX 요소)
 * @param {boolean} [props.iconColor=false] - true일 경우 아이콘 원본 색상 유지
 * @param {React.ReactNode} props.children - 버튼 내용
 * @param {string} [props.className=''] - 추가 CSS 클래스
 * @param {Object} props.props - 기타 HTML button 속성들 (onClick, type 등)
 */

import React from 'react';

const size = {
  sm: 'px-4 py-1.5 gap-1.5 text-sm font-medium',
  md: 'px-4 py-2 gap-1.5 text-base font-medium',
  lg: 'px-5 py-3 gap-1.5 text-base font-medium',
};

const style = {
  'bg-green': 'bg-emerald-500 text-white',
  'bg-red': 'bg-red-400 text-white',
  'bg-gray': 'bg-gray-100 text-gray-500',
  'bg-white': 'bg-white text-gray-500 border border-gray-100',
  'bg-pink': 'bg-red-100 text-red-400',
  'text-black': 'text-gray-900',
  'text-gray': 'text-gray-500',
  'underline-green': 'text-emerald-500 underline underline-offset-2',
  'underline-gray': 'text-gray-500 underline underline-offset-2',
  'underline-white': 'text-white underline underline-offset-2',
};

const Button = ({
  size: sizeType = 'lg',
  variant = 'bg-green',
  circle = false,
  shadow = false,
  disabled = false,
  leftIcon, //아이콘 이미지 경로 또는 JSX 요소
  rightIcon, //아이콘 이미지 경로 또는 JSX 요소
  iconColor = false, //true일 경우 아이콘 원본 색상 유지
  children,
  className = '',
  ...props
}) => {
  const sizeClass = size[sizeType];
  const styleClass = style[variant];

  // 배경색이 있는 경우만 rounded 추가
  const hasBg = variant.startsWith('bg-');
  let roundedClass = '';

  if (hasBg) {
    if (circle) {
      roundedClass = 'rounded-full';
    } else {
      roundedClass = sizeType === 'sm' ? 'rounded-md' : 'rounded-lg';
    }
  }

  // disabled 상태 스타일
  const disabledClass = disabled
    ? `!text-gray-300 cursor-not-allowed ${hasBg ? '!bg-gray-100' : ''}`
    : '';

  // shadow 스타일
  const shadowClass = shadow ? 'shadow-down-lg' : '';

  // 아이콘만 있고 children이 없을 때 padding 조정 (py와 px를 동일하게)
  const hasOnlyIcon = !children && (leftIcon || rightIcon);
  const iconOnlyPadding = hasOnlyIcon
    ? sizeType === 'sm'
      ? '!px-1.5'
      : sizeType === 'md'
        ? '!px-2'
        : '!px-3'
    : '';

  // 아이콘 사이즈 (아이콘만 있을때 와 텍스트와 함께 있을때 다름)
  const iconSize = hasOnlyIcon
    ? sizeType === 'sm'
      ? 'w-4 h-4'
      : sizeType === 'md'
        ? 'w-5 h-5'
        : 'w-6 h-6'
    : sizeType === 'sm'
      ? 'w-4 h-4'
      : 'w-5 h-5';

  // 텍스트 색상에 맞추어 아이콘 색상 변경 및 렌더링
  const renderIcon = (icon) => {
    if (typeof icon === 'string') {
      // iconColor가 true일 경우 원본 이미지 그대로 사용
      if (iconColor) {
        return <img src={icon} alt="" className={iconSize} />;
      }

      let iconColorClass = '';

      // disabled일 때는 gray-300
      if (disabled) {
        iconColorClass = '!text-gray-300';
      }
      // text-gray일 때: 아이콘 gray-400
      else if (variant === 'text-gray') {
        iconColorClass = '!text-gray-400';
      }
      // bg-gray일 때: 텍스트와 함께 있으면 gray-400, 아이콘만 있으면 gray-600
      else if (variant === 'bg-gray') {
        iconColorClass = hasOnlyIcon ? '!text-gray-600' : '!text-gray-400';
      }
      // text-gray 900인 경우 아이콘은 gray-600 (bg-gray가 아닌 다른 경우)
      else if (styleClass.includes('text-gray-900')) {
        iconColorClass = '!text-gray-600';
      }

      return (
        <span
          className={`inline-block ${iconSize} bg-current ${iconColorClass}`}
          style={{
            maskImage: `url(${icon})`,
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskImage: `url(${icon})`,
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
          }}
        />
      );
    }
    return icon;
  };

  return (
    <button
      className={[
        'flex items-center justify-center',
        sizeClass,
        styleClass,
        roundedClass,
        shadowClass,
        disabledClass,
        iconOnlyPadding,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="flex items-center">{renderIcon(leftIcon)}</span>}
      {children}
      {rightIcon && <span className="flex items-center">{renderIcon(rightIcon)}</span>}
    </button>
  );
};

export default Button;
