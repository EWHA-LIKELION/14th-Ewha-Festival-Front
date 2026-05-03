/**
 * 로딩 스피너 컴포넌트 (인라인용)
 */

import { useState, useEffect } from 'react';

const LoadingSpinner = () => {
  const [dots, setDots] = useState(1);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
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
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative inline-block h-15 w-15">
        <img
          src="/icons/loading-spinner.svg"
          alt="loading-spinner"
          width={60}
          height={60}
          className="block h-15 w-15 transition-transform duration-1000 ease-linear"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
        <img
          src="/icons/loading-tail.svg"
          alt="loading-tail"
          width={377}
          height={6}
          className="absolute top-13 right-10 h-1.5 w-94.25 max-w-none"
        />
      </div>
      <p className="text-sm font-medium text-zinc-300">잠시만 기다려주세요{'.'.repeat(dots)}</p>
    </div>
  );
};

export default LoadingSpinner;
