/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import React, { useState } from 'react';
import useBottomsheetStore from '@/store/useBottomsheetStore';
import BoothCard from '@/components/Card/BoothCard';
import ShowCard from '@/components/Card/ShowCard';
import MenuCard from '@/components/Card/MenuCard';
import ImageModal from '@/components/ImageModal';
import ReviewCard from '@/components/Card/ReviewCard';

const ComponentPreview = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <BoothCard
        name="라이크라이언 떡볶이"
        category="분식"
        days="3/1~3/3"
        location="학생회관 앞"
        description="매콤달콤 떡볶이!"
        thumbnail="/images/boothcard-test.jpg"
        menuList={[
          { name: '떡볶이', description: '...', image: '/images/boothcard-test.jpg' },
          { name: '순대', description: '...' },
          { name: '튀김', description: '...', image: '/images/boothcard-test.jpg' },
          { name: '튀김', description: '...', image: '/images/boothcard-test.jpg' },
        ]}
        status="open"
      />
      <BoothCard
        name=""
        category=""
        days=""
        location="학생회관 앞"
        description=""
        thumbnail=""
        status=""
        onClick={() => {}}
      />
      <ShowCard
        name="라이크라이언 떡볶이"
        category="밴드"
        days="3/1~3/3"
        location="학생회관 앞"
        description="매콤달콤한 떡볶이와 다양한 간식이 준비되어 있습니다.매콤달콤한 떡볶이와 다양한 간식이 준비되어 있습니다.매콤달콤한 떡볶이와 다양한 간식이 준비되어 있습니다.매콤달콤한 떡볶이와 다양한 간식이 준비되어 있습니다.매콤달콤한 떡볶이와 다양한 간식이 준비되어 있습니다."
        thumbnail="/images/boothcard-test.jpg"
        status="operating"
        onClick={() => {}}
      />
      <MenuCard
        name="메뉴명"
        description="매콤달콤한 떡볶이와 다양한 간식이 준비되어 있습니다.매콤달콤한 떡볶이와 다양한 간식이 준비되어 있습니다.매콤달콤한 떡볶이와 다양한 간식이 준비되어 있습니다.매콤달콤한 떡볶이와 다양한 간식이 준비되어 있습니다.매콤달콤한 떡볶이와 다양한 간식이 준비되어 있습니다."
        image="/images/boothcard-test.jpg"
        price={10000}
        onImageClick={(img) => {
          setSelectedImage(img);
          setShowModal(true);
        }}
      />
      <ReviewCard
        name="익명 n"
        review="Content text Content text Content text Content text Content text Content text Content text Content text Content text Content text "
        ago="2시간 전"
        showDelete="false"
      />

      {showModal && <ImageModal image={selectedImage} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ComponentPreview;
