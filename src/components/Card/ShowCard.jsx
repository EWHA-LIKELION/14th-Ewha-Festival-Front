/**
 * ShowCard 컴포넌트
 */

import React from 'react';
import Badge from '@/components/Badge';

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
      className="flex w-88 items-start gap-3 rounded-xl border border-gray-200 bg-white p-4"
    >
      {/* 공연 이미지 */}
      <img
        src={thumbnail || '/images/showcard-default.png'}
        className="flex aspect-square w-22 items-center justify-center rounded-md border border-gray-100"
      />

      {/* 공연명 및 정보 */}
      <div className="flex flex-col items-start gap-1">
        <div className="flex items-start justify-between">
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-start gap-1.5">
              <h2 className="text-lg leading-6 font-semibold tracking-normal text-gray-900">
                {name}
              </h2>

              {status && <Badge variant={status} />}
            </div>
            <h3 className="text-xs leading-4 font-medium tracking-normal text-emerald-700">
              {category} | {time} | {location}
            </h3>
          </div>
          {/* 스크랩 위치 */}
        </div>
        <p className="line-clamp-2 overflow-hidden text-xs leading-5 font-normal tracking-normal text-ellipsis text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ShowCard;
