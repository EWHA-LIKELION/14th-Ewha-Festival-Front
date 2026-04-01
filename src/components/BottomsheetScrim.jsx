/**
 * Scrim 있는 Bottomsheet
 */

import { useState, useEffect, useCallback } from 'react';

const TRANSITION_DURATION = 300;

const BottomsheetScrim = ({ onClose, children }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(() => onClose?.(), TRANSITION_DURATION);
  }, [onClose]);

  return (
    <>
      <div
        onClick={handleClose}
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        className={`reactive-width shadow-up-md fixed bottom-0 left-1/2 z-35 flex h-auto w-full -translate-x-1/2 flex-col overflow-clip rounded-t-3xl bg-white transition-transform duration-300 ease-out ${visible ? 'translate-y-0' : 'translate-y-full'}`}
        style={{
          maxHeight: 'calc(90vh + env(safe-area-inset-bottom)',
        }}
      >
        <div className="flex h-8 shrink-0 flex-col items-center justify-end px-4 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="flex size-6 items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3 7.5L12 16.5L21 7.5"
                stroke="#D4D4D8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="w-full flex-initial p-5">{children}</div>
      </div>
    </>
  );
};

export default BottomsheetScrim;
