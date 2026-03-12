/**
 * ShowCard 컴포넌트
 */

import React from 'react';
import Badge from '@/components/Badge';
import ScrapButton from '@/components/ScrapButton';

const ShowCard = ({
  thumbnail,
  name,
  category,
  time,
  location,
  description,
  status = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex w-full items-start gap-4 border-b border-zinc-200 bg-white py-5"
    >
      {/* 공연 이미지 */}
      <img
        src={thumbnail || '/images/showcard-default.png'}
        className="flex aspect-square h-20 w-20 items-center justify-center rounded-md border border-zinc-100"
      />

      {/* 공연명 및 정보 */}
      <div className="flex w-full flex-col items-start gap-1">
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-1">
              <h2 className="text-lg leading-6 font-semibold tracking-normal text-zinc-800">
                {name}
              </h2>

              {status && <Badge variant={status} />}
            </div>
            <h3 className="text-xs leading-4 font-medium tracking-normal text-emerald-800">
              {category} | {time} | {location}
            </h3>
          </div>
          <ScrapButton />
        </div>
        <p className="line-clamp-2 overflow-hidden text-xs leading-4 font-normal tracking-normal text-ellipsis text-zinc-500">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ShowCard;
