/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import React from 'react';
import BoothCard from '@/components/Card/BoothCard';

const mockBooth = {
  name: '떡볶이 연구소',
  category: '푸드트럭',
  days: '9/20 - 9/22',
  location: '정문 광장',
  description: '매운맛 단계 선택 가능! 치즈폭탄 떡볶이와 쿨피스까지 완벽 조합 🍽️',
  thumbnail: '/images/boothcard-default.png',
  images: ['/images/boothcard-default.png', '/images/boothcard-default.png'],
};

const ComponentPreview = () => {
  return (
    <>
      <div className="flex h-100 items-center justify-center">
        <BoothCard
          name={mockBooth.name}
          category={mockBooth.category}
          days={mockBooth.days}
          location={mockBooth.location}
          description={mockBooth.description}
          thumbnail={mockBooth.thumbnail}
          images={mockBooth.images}
          status={mockBooth.status}
          onClick={() => alert('카드 클릭!')}
        />
      </div>
    </>
  );
};

export default ComponentPreview;
