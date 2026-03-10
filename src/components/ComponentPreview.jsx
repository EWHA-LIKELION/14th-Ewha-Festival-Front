/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import React, { useState } from 'react';
import Header from '@/components/Header';
import BottomsheetDrag from '@/components/BottomsheetDrag';
import useBottomsheetStore from '@/store/useBottomsheetStore';
import BoothCard from '@/components/Card/BoothCard';

const ComponentPreview = () => {
  const sheetSize = useBottomsheetStore((s) => s.sheetSize);

  return (
    <>
      <BottomsheetDrag>
        {sheetSize === 'full' && (
          <>
            <Header left="logo" right="search" />
            {/* <Header left="back" right="search" /> */}
            <img
              src="/images/boothcard-test.jpg"
              alt=""
              className="w-full"
              style={{ height: '240px', objectFit: 'cover', marginTop: '-4.5rem' }}
            />
          </>
        )}
        <div className="h-200 p-5">
          {/* BoothCard 프리뷰 */}
          <div className="my-8">
            <h3 className="mb-3 text-lg font-semibold">BoothCard</h3>
            <BoothCard
              name="라이크라이언 떡볶이"
              category="음식"
              days="3/1~3/3"
              location="학생회관 앞"
              description="매콤달콤한 떡볶이와 다양한 간식이 준비되어 있습니다."
              thumbnail="/images/boothcard-test.jpg"
              images={[
                '/images/boothcard-test.jpg',
                '/images/carousel-test1.png',
                '/images/carousel-test2.png',
              ]}
              status="open"
              onClick={() => {}}
            />
          </div>
        </div>
      </BottomsheetDrag>
    </>
  );
};

export default ComponentPreview;
