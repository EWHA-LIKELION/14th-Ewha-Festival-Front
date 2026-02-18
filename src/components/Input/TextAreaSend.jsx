/**
 * TextAreaSend 컴포넌트
 */

import React, { useState, useRef, useEffect } from 'react';

const TextAreaSend = ({ placeholder, onSend }) => {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  const lineHeight = 24;
  const maxRows = 3;
  const maxHeight = lineHeight * maxRows;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    const scrollHeight = textarea.scrollHeight;

    if (scrollHeight <= lineHeight + 2) {
      textarea.style.height = `${lineHeight}px`;
      return;
    }

    textarea.style.height = scrollHeight > maxHeight ? `${maxHeight}px` : `${scrollHeight}px`;
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed) return;

    onSend?.(trimmed);
    setValue('');
  };

  const hasValue = value.trim().length > 0;

  return (
    <div className="relative w-88 rounded-3xl bg-gray-100 px-4 py-3">
      <textarea
        ref={textareaRef}
        value={value}
        rows={1}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        className="scrollbar-hide w-full resize-none overflow-y-auto bg-transparent pr-10 text-base leading-6 text-gray-900 placeholder-gray-400 outline-none"
        style={{
          height: `${lineHeight}px`,
          maxHeight: `${maxHeight}px`,
        }}
      />

      {hasValue && (
        <img
          src="/icons/icon-send.svg"
          onClick={handleSend}
          className="absolute right-3 bottom-3 cursor-pointer"
        />
      )}
    </div>
  );
};

export default TextAreaSend;
