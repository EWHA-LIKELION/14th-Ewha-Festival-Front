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
  const [visible, setVisible] = React.useState(false);

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
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        className={`transition-all duration-200 ease-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'} `}
      >
        <Toast text={text} />
      </div>
    </div>
  );
};

export default Toast;
