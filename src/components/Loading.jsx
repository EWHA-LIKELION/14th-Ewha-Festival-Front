/**
 * 전역 로딩 컴포넌트
 */

import { useState, useEffect } from 'react';
import useLoadingStore from '@/store/useLoadingStore';

const GlobalLoading = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const [dots, setDots] = useState(1);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 1000);

    const rotationInterval = setInterval(() => {
      setRotation((prev) => prev + 120);
    }, 1000);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(rotationInterval);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="reactive-width mx-auto flex h-full items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center gap-4">
          {/* 로딩 스피너 */}
          <div className="relative inline-block">
            <img
              src="/icons/loading-spinner.svg"
              alt="loading-spinner"
              className="transition-transform duration-1000 ease-linear"
              style={{ transform: `rotate(${rotation}deg)` }}
            />
            <img
              src="/icons/loading-tail.svg"
              alt="loading-tail"
              className="absolute top-13 right-10 w-[376.928px] max-w-none"
            />
          </div>

          {/* 로딩 텍스트 */}
          <p className="text-sm font-medium text-emerald-600">
            잠시만 기다려주세요{'.'.repeat(dots)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoading;
