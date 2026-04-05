/**
 * Accordion 컴포넌트 (Accordion, AdminAccordion)
 */

import { useState, useRef, useEffect } from 'react';

export const Accordion = ({ title, time, isUpdate = false, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      className={`flex w-full flex-col gap-2 rounded-xl border border-zinc-200 p-4 text-left font-normal text-zinc-800 hover:brightness-100 focus:outline-none ${isOpen ? 'bg-gray-50' : 'bg-white'}`}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between text-base font-semibold"
      >
        {title}
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <img src="/icons/icon-chevrondown.svg" alt="chevron" width="20" height="20" />
        </div>
      </button>
      <div
        ref={contentRef}
        style={{ height: `${height}px` }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <p className="text-sm">{content}</p>
      </div>
      <div className="text-xs text-zinc-300">
        <p>
          {time} {isUpdate && '(수정됨)'}
        </p>
      </div>
    </div>
  );
};

export const AdminAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <>
      <div className="flex w-full flex-col items-stretch justify-center px-5 py-7 text-sm font-normal text-zinc-800 focus:outline-none">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-stretch justify-between text-base font-semibold"
        >
          {title}
          <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <img src="/icons/icon-chevrondown.svg" alt="chevron" width="20" height="20" />
          </div>
        </button>
      </div>
      <div
        ref={contentRef}
        style={{ height: `${height}px` }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div>{children}</div>
      </div>
    </>
  );
};
