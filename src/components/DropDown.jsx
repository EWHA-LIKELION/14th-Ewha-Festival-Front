/**
 * DropDown 컴포넌트
 */

import { useState, useRef, useEffect } from 'react';
import { filterConfig } from '@/configs/filterConfig';
import { getDefaultValue } from '@/utils/labelHelper';
import useFilterStore from '@/store/useFilterStore';

const DropDown = ({ type = 'booth' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 전역 상태에서 현재 타입의 필터 가져오기
  const filters = useFilterStore((state) => state.filters[type]) || {};
  const setFilter = useFilterStore((state) => state.setFilter);

  // scrap_ 접두사 제거하여 동일한 config 사용
  const configType = type?.replace('scrap_', '') || type;
  const config = filterConfig[configType] || {};
  const options = config.sort || [];

  // 스토어의 sort 값 또는 기본값 사용
  const storeSort = filters.sort;
  const defaultValue = getDefaultValue(options);
  const selectedValue = storeSort ?? defaultValue;

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

  const handleSelect = (newValue) => {
    // 스토어에 직접 저장
    setFilter(type, 'sort', newValue);
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
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
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
