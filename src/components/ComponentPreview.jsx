/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import React, { useState } from 'react';
import BottomsheetDrag from '@/components/BottomsheetDrag';
import BottomsheetScrim from '@/components/BottomsheetScrim';

const ComponentPreview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState('medium');
  const [hasScrim, setHasScrim] = useState(false);
  const [currentSize, setCurrentSize] = useState(size);

  const handleOpen = (s, scrim) => {
    setSize(s);
    setCurrentSize(s);
    setHasScrim(scrim);
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <h2 className="text-lg font-semibold">Bottomsheet</h2>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Scrim 없음</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleOpen('small', false)}
              className="spacing-2 rounded-lg bg-gray-200 px-4 text-sm"
            >
              Small
            </button>
            <button
              type="button"
              onClick={() => handleOpen('medium', false)}
              className="rounded-lg bg-gray-200 px-4 py-2 text-sm"
            >
              Medium
            </button>
            <button
              type="button"
              onClick={() => handleOpen('large', false)}
              className="rounded-lg bg-gray-200 px-4 py-2 text-sm"
            >
              Large
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-medium0 text-sm">Scrim 있음</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleOpen('small', true)}
              className="rounded-lg bg-gray-200 px-4 py-2 text-sm"
            >
              Small
            </button>
            <button
              type="button"
              onClick={() => handleOpen('medium', true)}
              className="rounded-lg bg-gray-200 px-4 py-2 text-sm"
            >
              Medium
            </button>
            <button
              type="button"
              onClick={() => handleOpen('large', true)}
              className="rounded-lg bg-gray-200 px-4 py-2 text-sm"
            >
              Large
            </button>
          </div>
        </div>
      </div>

      {isOpen &&
        (hasScrim ? (
          <BottomsheetScrim size={size} onClose={() => setIsOpen(false)}>
            <div className="flex h-full items-center justify-center p-4">
              <p className="text-sm text-gray-500">
                size: {currentSize} / hasScrim: {hasScrim.toString()}
              </p>
            </div>
          </BottomsheetScrim>
        ) : (
          <BottomsheetDrag size={size} onSizeChange={(newSize) => setCurrentSize(newSize)}>
            <div className="flex h-full items-center justify-center p-4">
              <p className="text-sm text-gray-500">
                size: {currentSize} / hasScrim: {hasScrim.toString()}
              </p>
            </div>
          </BottomsheetDrag>
        ))}
    </>
  );
};

export default ComponentPreview;
