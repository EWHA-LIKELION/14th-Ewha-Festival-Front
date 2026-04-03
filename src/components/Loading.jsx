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
      <div className="flex flex-col items-center gap-4">
        {/* 스피너 (테일의 기준점) */}
        <div className="relative inline-block overflow-visible">
          <img
            src="/icons/loading-spinner.svg"
            alt="loading-spinner"
            className="transition-transform duration-1000 ease-linear"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
          {/* 테일 - 스피너 기준 absolute 위치, 원본 크기 유지 */}
          <img
            src="/icons/loading-tail.svg"
            alt="loading-tail"
            className="absolute top-13 right-10"
            style={{
              minWidth: '187px',
              maxWidth: '187px',
            }}
          />
        </div>

        {/* 로딩 텍스트 */}
        <p className="text-sm font-medium text-emerald-600">
          잠시만 기다려주세요{'.'.repeat(dots)}
        </p>
      </div>
    </div>
  );
};

export default GlobalLoading;
