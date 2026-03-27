/**
 * 홈 페이지
 */

import { useEffect } from 'react';
import Footer from '@/components/Footer';
import ImageCard from '@/components/Card/ImageCard';

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goFestivalInstagram = () => {
    window.open('https://www.instagram.com/ewha_festa/', '_blank');
  };

  return (
    <>
      {/* 축제 포스터 */}
      <img src="/images/home-poster.png" alt="home-poster" fetchpriority="high" />
      {/* 축준위 인스타 바로가기 */}
      <button
        onClick={goFestivalInstagram}
        className="font-noto-serif relative flex h-21 w-full flex-col items-start justify-center bg-linear-to-r from-[#F0F6E3] to-[#E7F0E1] px-7.5 text-green-900"
      >
        <p className="text-xs font-medium">축준위 인스타그램에서 빠른 소식 확인</p>
        <p className="text-base font-bold">축준위 공지 바로가기</p>
        <img
          className="absolute right-7 bottom-0"
          src="/icons/logo-festival-pic.svg"
          alt="logo-festival"
        />
      </button>
      {/* Booth */}
      <div className="flex flex-col gap-12 pt-20 pb-24">
        <div className="flex flex-col items-center">
          <img className="h-12.5 w-12.5" src="/icons/icon-star.svg" alt="star" />
          <img className="pt-4 pb-8" src="/icons/icon-booth.svg" alt="booth" />
          <p className="text-center text-xs font-normal text-zinc-500">
            다채로운 부스가 학교 곳곳에서 펼쳐집니다.
            <br />
            학생 부스, 축준위 부스, 푸드트럭, 플리마켓과 협찬 부스까지
            <br />
            가득한 즐길 거리 속으로 지금 바로 뛰어들어 보세요!
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <img className="h-45" src="/images/home-booth-1.png" alt="booth-image" loading="lazy" />
            <img className="h-45" src="/images/home-booth-2.png" alt="booth-image" loading="lazy" />
          </div>
          <div className="flex gap-3">
            <img className="h-45" src="/images/home-booth-3.png" alt="booth-image" loading="lazy" />
            <img className="h-45" src="/images/home-booth-4.png" alt="booth-image" loading="lazy" />
          </div>
        </div>
      </div>
      {/* Events */}
      <div
        className="items-centerinset-0 relative flex flex-col items-center gap-10 overflow-hidden bg-cover bg-center py-[4.44rem]"
        style={{ backgroundImage: 'url(/images/home-event-bg.png)' }}
      >
        <img className="h-12.5 w-39.5" src="/icons/icon-event.svg" alt="event" />
        <div className="flex flex-col gap-5 text-center text-sm font-normal text-white">
          <p>
            이화 비빔밥 한 숟갈 먹고,
            <br />
            벗들과 힘을 모아 즐기는 영산 줄다리기까지
            <br />
            개막을 알리는 특별한 이벤트와 함께하세요.
          </p>
          <p>
            초록빛 잔디광장에서 펼쳐지는 사생대회
            <br />
            주어진 주제를 나만의 색깔로 해석해,
            <br />
            하나뿐인 작품을 자유롭게 그려보세요!
          </p>
          <p>
            따뜻한 감동으로 마음을 채울 영화 한 편
            <br />
            시원한 저녁 바람과 함께 영화제를 즐겨보세요.
          </p>
        </div>
      </div>
      {/* Performance */}
      <div className="flex flex-col gap-10 py-24">
        <div className="flex flex-col items-center">
          <img src="/icons/icon-performance.svg" alt="performance" />
          <div className="flex gap-1 pt-4 pb-8">
            <img className="h-7.5 w-7.5" src="/icons/icon-star.svg" alt="star" />
            <img className="h-7.5 w-7.5" src="/icons/icon-star.svg" alt="star" />
            <img className="h-7.5 w-7.5" src="/icons/icon-star.svg" alt="star" />
          </div>
          <p className="text-center text-xs font-normal text-zinc-500">
            이화의 무대를 빛낼 벗들과 아티스트의 공연이 진행됩니다.
            <br />
            밴드의 생생한 사운드, 에너지 넘치는 댄스, 몰입감 있는 뮤지컬까지
            <br />
            축제의 순간을 함께 느껴보아요!
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <img
              className="h-43"
              src="/images/home-performance-1.png"
              alt="performance-image"
              loading="lazy"
            />
            <img
              className="h-43"
              src="/images/home-performance-2.png"
              alt="performance-image"
              loading="lazy"
            />
          </div>
          <div className="flex gap-3">
            <img
              className="h-39.5"
              src="/images/home-performance-3.png"
              alt="performance-image"
              loading="lazy"
            />
            <img
              className="h-39.5"
              src="/images/home-performance-4.png"
              alt="performance-image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      {/* 후원사 */}
      <div className="flex flex-col gap-4 px-5 pt-10 pb-20">
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-lg font-semibold text-zinc-800">후원사</h1>
          <p className="text-sm font-normal text-zinc-500">
            2026 대동제와 함께하는 공식 파트너예요!
          </p>
        </div>
        <div className="flex justify-center gap-1.5">
          <ImageCard name="이마트 24" />
          <ImageCard name="likelion univ." />
          <ImageCard name="the Venti" />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default HomePage;
