/**
 * Carousel 컴포넌트
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Carousel = ({ items = [] }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(1); // 1부터 시작 (복제본 때문)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  // 무한 슬라이드를 위한 복제 배열 생성
  const extendedItems = items.length > 0 ? [items[items.length - 1], ...items, items[0]] : [];

  // 5초 무클릭 시 자동으로 다음 슬라이드로
  useEffect(() => {
    if (items.length <= 1 || isTransitioning) return; // 콘텐츠 1개 or 트랜지션 중이면 이동x

    const timer = setTimeout(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 5000);

    return () => clearTimeout(timer);
  }, [lastInteraction, items.length, isTransitioning]); // 클릭하면 타이머 초기화, 데이터 변경 대응, 이동 중이면 타이머 막기

  // 트랜지션 끝난 후 위치 조정
  useEffect(() => {
    if (!isTransitioning) return; // 애니메이션 중일 때만 실행

    const timeout = setTimeout(() => {
      setIsTransitioning(false);
      if (currentIndex === 0) {
        // 맨 앞 복제 슬라이드면 → 진짜 마지막으로 순간 이동
        setCurrentIndex(items.length);
      } else if (currentIndex === items.length + 1) {
        // 맨 뒤 복제 슬라이드면 → 진짜 첫 슬라이드로 이동
        setCurrentIndex(1);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [currentIndex, isTransitioning, items.length]);

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
    setLastInteraction(Date.now()); // 인터랙션 시간 갱신
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
    if (e) setLastInteraction(Date.now()); // 인터랙션 시간 갱신
  };

  const handleClick = () => {
    setLastInteraction(Date.now()); // 인터랙션 시간 갱신
    const actualIndex = currentIndex - 1; // 복제본 때문에 -1
    const link = items[actualIndex]?.link;
    if (!link) return;

    // 외부 링크인지 확인 (http:// 또는 https://로 시작)
    if (link.startsWith('http://') || link.startsWith('https://')) {
      window.open(link, '_blank');
    } else {
      // 내부 라우트
      navigate(link);
    }
  };

  if (items.length === 0) return null;

  // 실제 표시할 인덱스 계산 (복제본 제외)
  const displayIndex =
    currentIndex === 0 ? items.length : currentIndex === items.length + 1 ? 1 : currentIndex;

  return (
    <div className="relative h-88 w-88 overflow-hidden rounded-2xl">
      {/* 슬라이드 컨테이너 */}
      <div
        className={`flex h-full ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {extendedItems.map((item, index) => (
          <div
            key={index}
            onClick={handleClick}
            className={`relative h-full w-full shrink-0 ${item.link ? 'cursor-pointer' : ''}`}
          >
            {/* 배경 이미지 */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image})` }}
            />

            {/* 그라데이션 오버레이 */}
            <div className="absolute right-0 bottom-0 left-0 h-full bg-linear-to-t from-emerald-500 opacity-70" />

            {/* 텍스트 콘텐츠 */}
            <div className="relative z-10 flex h-full flex-col justify-end p-5">
              <div className="flex flex-col gap-1.5">
                <p className="text-2xl font-semibold text-white">{item.title}</p>
                <p className="text-base font-medium text-white">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지 카운터 */}
      <div className="absolute top-3 right-3 z-10 flex h-6 w-8 items-center justify-center rounded-xl bg-gray-700/60">
        <p className="text-xs font-normal text-white">
          {displayIndex}/{items.length}
        </p>
      </div>

      {/* 버튼 레이어 */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-between px-3">
        <button onClick={handlePrev} className="pointer-events-auto">
          <img src="/icons/icon-back.svg" alt="back" />
        </button>
        <button onClick={handleNext} className="pointer-events-auto">
          <img src="/icons/icon-forward.svg" alt="forward" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
