/**
 * MenuCard 컴포넌트
 */

import { useState } from 'react';
import ImageModal from '../ImageModal';

const MenuCard = ({ name, description, price, image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDefaultImage = !image;

  return (
    <>
      <div
        onClick={() => {
          if (!isDefaultImage) setIsModalOpen(true);
        }}
        className="flex w-full flex-col items-center justify-between bg-white"
      >
        <div className="flex w-full justify-center gap-4 py-5">
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
            src={image || '/images/showcard-default.png'}
            className="flex aspect-square w-22 items-center justify-center rounded-md border border-gray-100"
          />
        </div>
      </div>

      {isModalOpen && !isDefaultImage && (
        <ImageModal image={image} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default MenuCard;
