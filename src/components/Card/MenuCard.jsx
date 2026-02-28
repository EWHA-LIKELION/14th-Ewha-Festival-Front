/**
 * MenuCard 컴포넌트
 *
 * @param {string} name - 메뉴명
 * @param {string} description - 메뉴 설명
 * @param {number} price - 가격
 * @param {string} image - 이미지 경로
 * @param {function} onImageClick - 이미지 클릭 시 호출되는 함수 (image 인자 전달)
 */
import React from 'react';

const MenuCard = ({ name, description, price, image, onImageClick }) => {
  const isDefaultImage = !image;

  return (
    <div
      onClick={() => {
        if (!isDefaultImage && onImageClick) onImageClick(image);
      }}
      className="flex w-full flex-col items-center justify-center bg-white"
    >
      <div className="flex w-full justify-between gap-4 py-5">
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
  );
};

export default MenuCard;
