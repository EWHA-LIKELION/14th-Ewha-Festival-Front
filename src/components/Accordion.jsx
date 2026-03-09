/**
 * Accordion 컴포넌트 (Accordion, AdminAccordion)
 */

import React, { useState } from 'react';

export const Accordion = ({ title, time, isUpdate = false, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex w-72 flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-4 text-left font-normal text-zinc-800 hover:brightness-100 focus:outline-none">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between text-base font-semibold"
      >
        {title}
        <div className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <img src="icons/icon-chevrondown.svg" alt="chevron" width="20" height="20" />
        </div>
      </button>
      {isOpen && <p className="text-sm">{content}</p>}
      <div className="text-xs text-zinc-300">
        <p>
          {time}전 {isUpdate && '(수정됨)'}
        </p>
      </div>
    </div>
  );
};

export const AdminAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex w-full flex-col items-center justify-center px-5 py-7 text-sm font-normal text-zinc-800 focus:outline-none">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between text-base font-semibold"
      >
        {title}
        <div className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <img src="icons/icon-chevrondown.svg" alt="chevron" width="20" height="20" />
        </div>
      </button>
      {isOpen && <div>{children}</div>}
    </div>
  );
};
