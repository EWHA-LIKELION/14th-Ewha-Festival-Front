/**
 * MenuCard 컴포넌트
 */

import { useState } from 'react';
import IconButton from '@/components/IconButton';

const MenuCard = ({ name, description, price, image, onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="flex w-98 flex-col items-center justify-center bg-white px-5"
      >
        <div className="flex w-98 justify-center gap-4 py-5">
          <div className="flex max-w-62 flex-col items-start justify-center gap-2">
            <div className="flex flex-col items-start gap-1">
              <h2 className="line-clamp-1 overflow-hidden text-base leading-6 font-medium tracking-normal text-ellipsis text-gray-900">
                {name}
              </h2>
              <p className="line-clamp-2 overflow-hidden text-xs leading-4 font-normal tracking-normal text-ellipsis text-gray-500">
                {description}
              </p>
            </div>
            <h3 className="line-clamp-1 overflow-hidden text-sm leading-5 font-semibold tracking-normal text-ellipsis text-gray-900">
              {price.toLocaleString()}원
            </h3>
          </div>
          <img
            src={image || '/images/boothcard-default.png'}
            className="flex aspect-square w-22 items-center justify-center rounded-md border border-gray-100"
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            {/* x 버튼 */}
            <IconButton
              name="xmarkwhite"
              size={20}
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-[20vh] right-5 z-60"
            />

            {/* 이미지 */}
            <div className="h-auto w-full max-w-98">
              <img src={image} className="w-full object-contain" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuCard;
