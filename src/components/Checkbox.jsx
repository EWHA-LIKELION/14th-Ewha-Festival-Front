/**
 * Checkbox 컴포넌트 (중복 선택 가능)
 */

import React from 'react';

function Checkbox({ label, isSelected = false, isError = false, onChange }) {
  const handleCheckboxChange = () => {
    onChange?.(!isSelected);
  };

  return (
    <label className="inline-flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        className="sr-only"
      />

      <div className="flex size-6 shrink-0 items-center justify-center">
        {isSelected ? (
          <div className="flex size-4.5 items-center justify-center rounded-sm bg-emerald-500">
            <svg
              width="12"
              height="9"
              viewBox="0 0 12 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 4L4.5 7.5L11 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ) : (
          <div
            className={`size-4.5 rounded-sm border bg-white ${
              isError ? 'border-red-400' : 'border-gray-200'
            }`}
          />
        )}
      </div>

      {label && (
        <span className="py-px text-sm leading-5 tracking-normal text-gray-900">{label}</span>
      )}
    </label>
  );
}

export default Checkbox;
