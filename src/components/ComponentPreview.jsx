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
import ImageCard from './Card/ImageCard';
import NoticeCard from './Card/NoticeCard';
import SetlistCard from './Card/SetlistCard';

const ComponentPreview = () => {
  const boothMockData = {
    name: '학생부스명',
    category: '음식',
    days: '수 · 목',
    location: '정문02',
    status: 'closed',
    description:
      '학생 부스 소개글 학생 부스 소개글 학생 부스 소개글 학생 부스 소개글 학생 부스 소개글 학생 부스 소개글',
    thumbnail: '',
    images: [],
  };

  const showMockData = {
    thumbnail: '',
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
    review:
      '기대됩니다~!! 멋사 파이팅 기대됩니다~!! 멋사 파이팅 기대됩니다~!! 멋사 파이팅 기대됩니다~!! 멋사 파이팅',
    ago: '2시간 전',
    showDelete: 'true',
  };

  const imageMockData = {
    name: '부스 공연 이름 부스 공연 이름',
    image: '/images/boothcard-test.jpg',
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 bg-gray-100 p-4">
        <BoothCard {...boothMockData} />
        <ShowCard {...showMockData} />
        <ReviewCard {...reviewMockData} />
        <NoticeCard variant="instagram" title="공지" />
        <SetlistCard setlist="Whiplash - aespa" />
        <Footer />
      </div>
    </>
  );
};

export default ComponentPreview;
