/**
 * TextArea 컴포넌트 ( size: large, medium, small)
 */

import React, { forwardRef } from 'react';

const SIZE = {
  large: {
    minHeight: 'h-30',
    label: 'text-base leading-6',
  },
  medium: {
    minHeight: 'h-24',
    label: 'text-sm leading-5',
  },
  small: {
    minHeight: 'h-12.5',
    label: 'text-sm leading-5',
  },
};

const TextArea = forwardRef(
  (
    {
      size = 'medium',
      label,
      required = false,
      labelPosition = 'top', // top | left
      helperText,
      error = false,
      value = '',
      maxLength,
      className = '',
      onChange,
      placeholder,
    },
    ref,
  ) => {
    const isLeft = labelPosition === 'left';

    const subTextColor = error ? 'text-red-500' : 'text-gray-500';

    const hasHelper = !!helperText;
    const hasCounter = !!maxLength;
    const showBottom = hasHelper || hasCounter;

    const currentLength = value?.length ?? 0;

    const justify =
      hasHelper && hasCounter ? 'justify-between' : hasHelper ? 'justify-start' : 'justify-end';

    return (
      <div className={isLeft ? 'flex items-start gap-2' : 'flex flex-col gap-2'}>
        {label && (
          <div className={`flex min-w-fit gap-1 ${isLeft ? 'items-start' : 'items-center'}`}>
            <span className={`${SIZE[size].label} font-semibold tracking-normal text-gray-900`}>
              {label}
            </span>
            {required && (
              <span className="text-xs leading-4 font-normal tracking-normal text-emerald-500">
                *필수
              </span>
            )}
          </div>
        )}

        <div className="flex flex-1 flex-col">
          <textarea
            ref={ref}
            value={value}
            onChange={(e) => {
              let next = e.target.value;
              if (maxLength && next.length > maxLength) {
                next = next.slice(0, maxLength);
              }
              onChange?.(next);
            }}
            placeholder={placeholder}
            className={`box-border w-full resize-none rounded-lg border bg-white px-4 py-3 text-base leading-6 font-normal tracking-normal text-gray-900 placeholder-gray-300 outline-none focus:outline-none ${error ? 'border-red-500' : 'border-gray-100'} ${SIZE[size].minHeight} ${className} `}
          />

          {showBottom && (
            <div className={`flex items-center pt-1.5 ${justify}`}>
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
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
