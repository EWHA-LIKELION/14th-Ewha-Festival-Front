/**
 * Input 컴포넌트 ( variant: sqaure, round, square_white)
 */

import React, { useState } from 'react';

const VARIANT_CLASS = {
  square: 'rounded-lg',
  round: 'rounded-full',
  square_white: 'rounded-lg bg-white',
};

const Input = ({
  value,
  onChange,
  onSubmit,
  maxLength,
  error = false,
  variant = 'square',
  placeholder = '',
  helperText = '',
}) => {
  const isWhiteVariant = variant === 'square_white';
  const [isFocused, setIsFocused] = useState(false);
  const subTextColor = error ? 'text-red-500' : 'text-gray-500';
  const hasHelper = !!helperText;
  const hasCounter = !!maxLength;
  const showBottom = hasHelper || hasCounter;

  const currentLength = value?.length ?? 0;

  const justify =
    hasHelper && hasCounter ? 'justify-between' : hasHelper ? 'justify-start' : 'justify-end';

  const borderColor = error
    ? 'border border-red-500'
    : isFocused
      ? 'border border-emerald-500'
      : isWhiteVariant
        ? 'border border-gray-200'
        : 'border-0';

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit?.();
      e.currentTarget.blur();
    }
  };

  return (
    <div className="flex w-full flex-col items-start">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          let next = e.target.value;
          if (maxLength && next.length > maxLength) {
            next = next.slice(0, maxLength);
          }
          onChange?.(next);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        className={`box-border h-12 w-full bg-gray-100 px-4 py-3 text-base leading-6 font-normal tracking-normal placeholder-gray-300 outline-none focus:outline-none ${borderColor} ${VARIANT_CLASS[variant]} `}
      />

      {showBottom && (
        <div className={`flex w-full items-center pt-1.5 ${justify}`}>
          {/* helperText */}
          {hasHelper && <p className={`text-xs leading-4 ${subTextColor}`}>{helperText}</p>}

          {/* counter */}
          {hasCounter && (
            <p className={`text-xs leading-4 ${subTextColor}`}>
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
