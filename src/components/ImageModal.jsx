/**
 * MenuCard 컴포넌트
 */

import react from 'react';

const ImageModal = ({ image, onClose }) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
      <div className="relative" onClick={onClose}>
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          {/* x 버튼 */}
          <button onClick={onClose} className="absolute -top-[20vh] right-5 z-50 p-2">
            <img src="/icons/icon-xmarkwhite.svg" alt="닫기" width="20" height="20" />
          </button>

          {/* 이미지 */}
          <div className="reactive-width w-full">
            <img
              src={image || '/images/showcard-default.png'}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
