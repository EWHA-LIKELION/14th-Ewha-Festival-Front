/**
 * Alert 컴포넌트 ( variant: delete-삭제, logout-로그아웃)
 */

import React from 'react';

const ImageCard = ({ image, name }) => {
  return (
    <div className="flex w-21 flex-col items-start gap-1.5">
      <img
        src={image}
        className="flex h-21 flex-col items-start rounded-lg border border-gray-100"
      />

      <h2 className="line-clamp-1 self-stretch overflow-hidden text-xs leading-4 font-medium tracking-normal text-ellipsis">
        {name}
      </h2>
    </div>
  );
};

export default ImageCard;
