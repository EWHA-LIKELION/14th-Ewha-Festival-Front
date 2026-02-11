/**
 * MenuCard 컴포넌트
 */

import react from 'react';
import IconButton from '@/components/IconButton';

const ImageModal = ({ image, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative" onClick={onClose}>
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          {/* x 버튼 */}
          <IconButton
            name="xmarkwhite"
            size={20}
            onClick={onClose}
            className="absolute -top-[20vh] right-5 z-60"
          />

          {/* 이미지 */}
          <div className="w-full max-w-98">
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
