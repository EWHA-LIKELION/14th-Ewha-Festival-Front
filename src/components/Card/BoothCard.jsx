/**
 * BoothCard 컴포넌트
 */

import React from 'react';
import Badge from '@/components/Badge';
import ScrapButton from '@/components/ScrapButton';

const BoothCard = ({
  name,
  category,
  days,
  location,
  description,
  thumbnail,
  menuList = [],
  status = '',
  onClick,
}) => {
  // 메뉴리스트에서 이미지 추출
  const menuImages = menuList
    ?.slice(0, 3)
    .map((menu) => menu.image || '/images/boothcard-default.png');

  return (
    <div
      onClick={onClick}
      className="g-0 flex w-full flex-col items-start border-b border-zinc-200 bg-white py-5"
    >
      {/* 부스명 및 위치 */}
      <div className="flex w-full items-start justify-between p-0">
        <div className="flex flex-col items-start gap-1 p-0">
          <div className="flex items-center gap-1.5">
            <h2 className="text-lg leading-6 font-semibold tracking-normal text-zinc-800">
              {name || '부스명'}
            </h2>

            {status && <Badge variant={status} />}
          </div>

          <h3 className="text-sm leading-5 font-medium tracking-normal text-emerald-800">
            {category || '카테고리'} | {days || '요일'} | {location || '위치'}
          </h3>
        </div>
        {/* 스크랩 들어갈 자리 */}
        <ScrapButton />
      </div>

      {/* 부스 소개글 */}
      <p className="mt-1.5 line-clamp-1 overflow-hidden text-sm leading-5 font-normal tracking-normal text-ellipsis text-zinc-500">
        {description}
      </p>

      {/* 이미지 미리보기 */}
      <div className="mt-2.5 flex items-center gap-2 p-0">
        {/* 썸네일 */}
        <img
          src={thumbnail || '/images/boothcard-default.png'}
          className="h-20 w-20 rounded-md border border-zinc-100 object-cover"
        />

        {/* 상세리스트 있을 때만 */}
        {menuImages.length > 0 &&
          menuImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              className="h-20 w-20 rounded-md border border-zinc-100 object-cover"
            />
          ))}
      </div>
    </div>
  );
};

export default BoothCard;
