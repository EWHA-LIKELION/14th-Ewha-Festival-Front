/**
 * Toast 컴포넌트
 */

import { useState, useEffect } from 'react';

const Toast = ({ type = 'check', text = '' }) => {
  return (
    <div className="backdrop-blur-token-lg flex w-full items-center gap-2 rounded-lg bg-black/50 px-5 py-3">
      {type === 'check' ? (
        <img src="/icons/icon-greencheck.svg" />
      ) : (
        <img src="/icons/icon-alert-red.svg" />
      )}
      <p className="text-sm leading-5 font-medium tracking-normal text-white">{text}</p>
    </div>
  );
};

/**
 * ToastManager 컴포넌트
 */

export const ToastManager = ({ type, text, isOpen, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose?.(), 200);
    }, duration);

    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`reactive-width fixed left-1/2 z-50 -translate-x-1/2 px-5 ${
        type === 'warn'
          ? 'bottom-[calc(env(safe-area-inset-bottom)+80px)]'
          : 'bottom-[calc(env(safe-area-inset-bottom)+20px)]'
      }`}
    >
      <div
        className={`transition-all duration-300 ease-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'} `}
      >
        <Toast type={type} text={text} />
      </div>
    </div>
  );
};

export default Toast;
