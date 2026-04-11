/**
 * ImageCard 컴포넌트
 */

import React from 'react';

const ImageCard = ({ image, name, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex w-21 shrink-0 cursor-pointer flex-col items-start gap-1.5"
    >
      <img
        src={image || '/images/default-image-xsmall.png'}
        alt={name}
        className="flex h-21 flex-col items-start rounded-lg border border-zinc-100"
      />

      <h2 className="line-clamp-1 self-stretch overflow-hidden text-xs leading-4 font-medium tracking-normal text-ellipsis text-zinc-500">
        {name}
      </h2>
    </div>
  );
};

export default ImageCard;
