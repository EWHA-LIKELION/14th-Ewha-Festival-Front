/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import { useState } from 'react';
import Footer from '@/components/Footer';
import { ToastManager } from '@/components/Toast';

const ComponentPreview = () => {
  const [isToastOpen, setIsToastOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 bg-gray-200 p-4">
        <button
          onClick={() => setIsToastOpen(true)}
          className="rounded bg-black px-4 py-2 text-white"
        >
          토스트 열기
        </button>

        <ToastManager
          text="리스트가 등록되었어요."
          isOpen={isToastOpen}
          onClose={() => setIsToastOpen(false)}
        />
      </div>

      <Footer />
    </>
  );
};

export default ComponentPreview;
