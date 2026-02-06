import React from 'react';
import { useEffect } from 'react';

/**
 * Toast 컴포넌트
 */

const Toast = ({ text = '' }) => {
  return (
    <div className="backdrop-blur-token-lg flex w-89.5 items-center gap-2 rounded-lg bg-black/50 px-5 py-3">
      <img src="/icons/icon-greencheck.svg" />
      <p className="text-sm leading-5 font-semibold tracking-normal text-white">{text}</p>
    </div>
  );
};

/**
 * ToastManager 컴포넌트
 */

export const ToastManager = ({ text, isOpen, duration = 3000, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [isOpen, duration, onclose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Toast text={text} />
    </div>
  );
};

export default Toast;
