/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import React, { useState } from 'react';
import Header from '@/components/Header';
import BottomsheetDrag from '@/components/BottomsheetDrag';
import useBottomsheetStore from '@/store/useBottomsheetStore';
import Tab from '@/components/Tab';
import { DetailImageUploader, ThumbnailImageUploader } from '@/components/FileUploader';
import ImageModal from '@/components/ImageModal';
import ReviewCard from '@/components/Card/ReviewCard';
import Divider from '@/components/Divider';
import SearchBar from '@/components/SearchBar';
import Carousel from '@/components/Carousel';
import TextAreaSend from '@/components/Input/TextAreaSend';
import TrashCard from '@/components/Card/TrashCard';
import BoothCard from '@/components/Card/BoothCard';
import MenuCard from '@/components/Card/MenuCard';
import NoticeCard from '@/components/Card/NoticeCard';
import SetlistCard from '@/components/Card/SetlistCard';
import ShowCard from '@/components/Card/ShowCard';

const ComponentPreview = () => {
  const sheetSize = useBottomsheetStore((s) => s.sheetSize);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [textTabIndex, setTextTabIndex] = useState(0);
  const [underlineTabIndex, setUnderlineTabIndex] = useState(0);

  const handleImageClick = (imageSrc) => {
    setModalImage(imageSrc);
    setShowImageModal(true);
  };

  return (
    <>
      <BottomsheetDrag>
        {sheetSize === 'full' && (
          <>
            <Header left="back" background="gradient" />
            <img
              src="/images/boothcard-test.jpg"
              alt=""
              className="w-full"
              style={{ height: '240px', objectFit: 'cover', marginTop: '-4.5rem' }}
            />
          </>
        )}
        <div className="p-6">
          <h2 className="mb-4 text-xl font-bold">바텀시트 콘텐츠</h2>
          <p className="mb-4">바텀시트를 full 높이로 드래그하면 헤더가 나타납니다.</p>
          <p className="mb-4">현재 크기: {sheetSize}</p>

          {/* Tab 프리뷰 */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold">Tab (text)</h3>
            <Tab
              variant="text"
              tabs={['부스', '공연']}
              activeIndex={textTabIndex}
              onChange={setTextTabIndex}
            />
          </div>

          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold">Tab (underline)</h3>
            <Tab
              variant="underline"
              tabs={['리스트', '후기']}
              activeIndex={underlineTabIndex}
              onChange={setUnderlineTabIndex}
            />
          </div>

          {/* FileUploader 프리뷰 */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold">DetailImageUploader</h3>
            <div className="flex gap-4">
              <DetailImageUploader onRemove={(clearFn) => clearFn()} />
              <DetailImageUploader onRemove={(clearFn) => clearFn()} />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold">ThumbnailImageUploader</h3>
            <ThumbnailImageUploader onRemove={(clearFn) => clearFn()} />
          </div>

          {/* ReviewCard 프리뷰 */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold">ReviewCard</h3>
            <div className="flex flex-col gap-3">
              <ReviewCard
                name="홍길동"
                review="정말 맛있었어요! 다음에 또 올게요.정말 맛있었어요! 다음에 또 올게요.정말 맛있었어요! 다음에 또 올게요.정말 맛있었어요! 다음에 또 올게요.정말 맛있었어요! 다음에 또 올게요.정말 맛있었어요! 다음에 또 올게요.정말 맛있었어요! 다음에 또 올게요.정말 맛있었어요! 다음에 또 올게요."
                ago="2시간 전"
                showDelete={false}
              />
              <ReviewCard
                name="김철수"
                review="분위기도 좋고 음식도 맛있었습니다.분위기도 좋고 음식도 맛있었습니다.분위기도 좋고 음식도 맛있었습니다.분위기도 좋고 음식도 맛있었습니다.분위기도 좋고 음식도 맛있었습니다.분위기도 좋고 음식도 맛있었습니다.분위기도 좋고 음식도 맛있었습니다.분위기도 좋고 음식도 맛있었습니다.분위기도 좋고 음식도 맛있었습니다.분위기도 좋고 음식도 맛있었습니다.분위기도 좋고 음식도 맛있었습니다."
                ago="5시간 전"
                showDelete={true}
                onClick={() => alert('삭제 버튼 클릭')}
              />
            </div>
          </div>

          {/* Divider 프리뷰 */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold">Divider</h3>
            <Divider />
            <br />
            <Divider isAdmin />
          </div>

          {/* SearchBar 프리뷰 */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold">SearchBar</h3>
            <SearchBar value="" onChange={() => {}} />
          </div>

          {/* Carousel 프리뷰 */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold">Carousel</h3>
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
          </div>

          {/* TextAreaSend 프리뷰 */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold">TextAreaSend</h3>
            <TextAreaSend value="" onChange={() => {}} onSend={() => {}} />
          </div>

          {/* TrashCard 프리뷰 */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold">TrashCard</h3>
            <TrashCard title="쓰레기통" description="booth" />
          </div>

          {/* BoothCard 프리뷰 */}
          <div className="mb-8">
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

          {/* MenuCard 프리뷰 */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold">MenuCard</h3>
            <MenuCard
              name="떡볶이"
              price={3000}
              description="매콤달콤한 떡볶이"
              image="/images/boothcard-test.jpg"
              onImageClick={handleImageClick}
            />
          </div>

          {/* NoticeCard 프리뷰 */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold">NoticeCard</h3>
            <NoticeCard title="공지 제목" description="공지 내용입니다." date="2026-03-01" />
          </div>

          {/* SetlistCard 프리뷰 */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold">SetlistCard</h3>
            <SetlistCard setlist="세트리스트 제목" items={['노래1', '노래2', '노래3']} />
          </div>

          {/* ShowCard 프리뷰 */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">ShowCard</h3>
            <ShowCard
              thumbnail="/images/boothcard-test.jpg"
              name="라이크라이언 밴드 공연"
              category="밴드"
              time="3/2 18:00"
              location="학생회관 앞 특설무대"
              description="신나는 밴드 공연과 다양한 이벤트가 준비되어 있습니다."
              status="open"
              onClick={() => {}}
            />
          </div>
        </div>
      </BottomsheetDrag>

      {/* ImageModal */}
      {showImageModal && <ImageModal image={modalImage} onClose={() => setShowImageModal(false)} />}
    </>
  );
};

export default ComponentPreview;
