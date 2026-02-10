/**
 * BoothCard 컴포넌트
 */

import React from 'react';
import Badge from '@/components/Badge';

const BoothCard = ({
  name,
  category,
  days,
  location,
  description,
  thumbnail,
  images = [],
  status = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="g-0 flex w-88 flex-col items-start rounded-xl border border-gray-200 bg-white p-4"
    >
      {/* 부스명 및 위치 */}
      <div className="flex items-start justify-between p-0">
        <div className="flex flex-col items-start gap-1 p-0">
          <div className="flex items-start gap-1.5">
            <h2 className="text-lg leading-6 font-semibold tracking-normal text-gray-900">
              {name}
            </h2>

            {status && <Badge variant={status} />}
          </div>

          <h3 className="text-sm leading-5 font-medium tracking-normal text-emerald-700">
            {category} | {days} | {location}
          </h3>
        </div>
        {/* 스크랩 들어갈 자리 */}
      </div>

      {/* 부스 소개글 */}
      <p className="mt-1.5 line-clamp-2 overflow-hidden text-sm leading-5 font-normal tracking-normal text-ellipsis text-gray-500">
        {description}
      </p>

      {/* 이미지 미리보기 */}
      <div className="mt-2.5 flex items-center gap-1.5 p-0">
        {/* 썸네일 */}
        <img
          src={thumbnail || '/images/boothcard-default.png'}
          className="aspect-square h-19 w-19 items-center justify-center rounded-md border border-gray-100 object-cover"
        />

        {/* 메뉴 이미지 최대 3개, 없는 경우 디폴트 이미지 1개 */}
        {(images.length ? images : ['/images/boothcard-default.png'])
          .slice(0, 3)
          .map((img, idx) => (
            <img
              key={idx}
              src={img}
              className="aspect-square h-19 w-19 rounded-md border border-gray-100 object-cover"
            />
          ))}
      </div>
    </div>
  );
};

export default BoothCard;
