/**
 * DropDown 컴포넌트
 */

import { useState, useRef, useEffect } from 'react';

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
        className="flex items-center gap-1 text-sm font-normal text-zinc-500 focus:outline-none"
      >
        {selectedLabel}
        <div className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M14 5L8 11L2 5"
              stroke="#9F9FA9"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="shadow-down-md absolute right-0 z-10 mt-1.5 w-32 overflow-hidden rounded-lg border border-zinc-200 bg-white">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`h-12 w-full px-5 text-left text-sm transition-colors hover:brightness-100 ${
                selectedValue === option.value
                  ? 'bg-zinc-50 font-semibold text-zinc-800 hover:bg-zinc-100'
                  : 'font-normal text-zinc-500 hover:bg-zinc-50'
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
