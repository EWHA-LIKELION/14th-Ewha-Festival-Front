/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import React from 'react';
import Carousel from '@/components/Carousel';

const ComponentPreview = () => {
  return (
    <>
      <div className="flex h-100 items-center justify-center">
        <Carousel
          items={[
            {
              image: 'images/boothcard-test.jpg',
              title: '첫 번째 제목',
              description: '첫 번째 설명',
              link: '/',
            },
            {
              image: 'images/carousel-test1.png',
              title: '두 번째 제목',
              description: '두 번째 설명',
              link: 'https://likelion.ewha.university/',
            },
            {
              image: 'images/carousel-test2.png',
              title: '세 번째 제목',
              description: '세 번째 설명',
            },
            {
              image: 'images/carousel-test1.png',
              title: '네 번째 제목',
              description: '네 번째 설명',
            },
          ]}
        />
      </div>
    </>
  );
};

export default ComponentPreview;
