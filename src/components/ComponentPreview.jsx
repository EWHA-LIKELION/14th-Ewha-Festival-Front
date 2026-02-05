/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import { useState } from 'react';
import Footer from '@/components/Footer';
import BoothCard from '@/components/Card/BoothCard';
import ShowCard from '@/components/Card/ShowCard';
import MenuCard from './Card/MenuCard';
import TrashCard from './Card/TrashCard';
import ReviewCard from './Card/ReviewCard';

const ComponentPreview = () => {
  const boothMockData = {
    name: '학생부스명',
    category: '음식',
    days: '수 · 목',
    location: '정문02',
    status: 'closed',
    description:
      '학생 부스 소개글 학생 부스 소개글 학생 부스 소개글 학생 부스 소개글 학생 부스 소개글 학생 부스 소개글',
    thumbnail: '/images/boothcard-test.jpg',
    images: ['/images/boothcard-test.jpg', '/images/boothcard-default.png'],
  };

  const showMockData = {
    thumbnail: '/images/boothcard-test.jpg',
    name: '공연명',
    category: '밴드',
    time: '수 10:00-10:30',
    location: '학생문화관',
    status: 'ongoing',
    description:
      '학생 부스 소개글 학생 부스 소개글 학생 부스 소개글 학생 부스 소개글 학생 부스 소개글 학생 부스 소개글',
  };

  const menuMockData = {
    name: '메뉴명 메뉴명 메뉴명 메뉴명 메뉴명',
    description:
      '메뉴 설명 메뉴 설명 메뉴 설명 메뉴 설명 메뉴 설명 메뉴 설명 메뉴 설명 메뉴 설명 메뉴 설명',
    price: '100,000',
    image: '/images/boothcard-test.jpg',
  };

  const [selected, setSelected] = useState(false);

  const trashMockData = {
    title: '쓰레기통1',
    description: '잔디광장 1번 부스 옆',
  };

  const reviewMockData = {
    name: '익명1',
    review: '기대됩니다~!! 멋사 파이팅',
    ago: '2시간 전',
    showDelete: 'true',
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 bg-gray-200 p-4">
        <BoothCard {...boothMockData} />
        <ShowCard {...showMockData} />
        <MenuCard {...menuMockData} />
        <TrashCard
          title={trashMockData.title}
          description={trashMockData.description}
          selected={selected}
          onClick={() => setSelected(!selected)}
        />
        <ReviewCard {...reviewMockData} />
        <Footer />
      </div>
    </>
  );
};

export default ComponentPreview;
