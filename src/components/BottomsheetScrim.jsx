/**
 * Scrim 있는 Bottomsheet
 */

import React, { useState, useEffect, useCallback } from 'react';

const SHEET_HEIGHT_CLASS = {
  small: 'h-73',
  medium: 'h-96',
  large: 'h-138',
};

const TRANSITION_DURATION = 300;

const BottomsheetScrim = ({ size = 'medium', onClose, children }) => {
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
        className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      />

      <div
        className={`shadow-up-md fixed bottom-0 left-1/2 z-50 flex w-full flex-col overflow-clip rounded-t-3xl bg-white transition-transform duration-300 ease-out ${SHEET_HEIGHT_CLASS[size]}`}
        style={{ transform: `translateX(-50%) translateY(${visible ? '0%' : '100%'})` }}
      >
        <div className="flex h-8 shrink-0 flex-col items-center justify-end px-4 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="flex size-6 items-center justify-center"
          >
            <img src="/icons/icon-chevrondown.svg" alt="닫기" />
          </button>
        </div>

        <div className="w-full flex-1 overflow-x-clip overflow-y-auto">{children}</div>
      </div>
    </>
  );
};

export default BottomsheetScrim;
