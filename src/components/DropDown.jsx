/**
 * DropDown 컴포넌트
 */

import React, { useState, useRef, useEffect } from 'react';

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('number');
  const dropdownRef = useRef(null);

  const options = [
    { value: 'number', label: '번호순' },
    { value: 'scrap', label: '스크랩순' },
    { value: 'name', label: '이름순' },
  ];

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  const selectedLabel = options.find((opt) => opt.value === selectedValue)?.label;

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-32 items-center justify-end gap-3 pr-0.5 text-sm font-normal text-gray-500 focus:outline-none"
      >
        {selectedLabel}
        <div className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <img src="icons/icon-chevrondown.svg" alt="chevron" width="16" height="16" />
        </div>
      </button>

      {isOpen && (
        <div className="shadow-down-md absolute z-10 mt-1.5 w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`h-12 w-full px-5 text-left text-sm transition-colors hover:brightness-100 ${
                selectedValue === option.value
                  ? 'bg-gray-50 font-semibold text-gray-900 hover:bg-gray-100'
                  : 'font-normal text-gray-500 hover:bg-gray-50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
