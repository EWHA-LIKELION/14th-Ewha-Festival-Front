/**
 * 부스 관리 페이지 6-2-1
 */

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import ScrapButton from '@/components/ScrapButton';
import Badge from '@/components/Badge';
import ImageModal from '@/components/ImageModal';
import Divider from '@/components/Divider';
import NoticeCard from '@/components/Card/NoticeCard';
import Tab from '@/components/Tab';

import BoothCard from '@/components/Card/BoothCard';

const MyBoothPage = () => {
  //추후 삭제 예정
  const boothData = [
    { id: 1, name: '멋사 부스', thumbnail: '/images/boothcard-test.jpg', state: 'operating' },
    { id: 2, name: '컴공 부스' },
  ];

  const { id } = useParams();
  const booth = boothData.find((item) => item.id === Number(id));

  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="relative">
      <Header className="absolute top-0" left="back" right="edit" background="gradient" />
      <img
        src={booth?.thumbnail || '/images/default-image-large.png'}
        className="-mt-18 flex aspect-49/30 w-full items-center justify-center object-cover"
        onClick={() => setShowModal(true)}
      />

      <div className="flex w-full flex-col items-center gap-9 pt-5 pb-36">
        {/* 부스 설명 */}
        <div className="flex w-full flex-col gap-6 self-stretch px-5">
          <div className="flex w-full flex-col items-start gap-2 self-stretch">
            <div className="flex w-full items-center justify-between self-stretch">
              <h2 className="text-2xl leading-8 font-semibold tracking-normal text-zinc-800">
                학생 부스명
              </h2>
              <ScrapButton />
            </div>

            <div className="flex items-center gap-1">
              <p className="text-sm leading-5 font-normal tracking-normal text-zinc-500">음식</p>
              <img src="/icons/icon-eclipse-gray.svg" />
              <Badge state={booth?.state} size="md" />
            </div>

            <p className="line-clamp-2 max-h-10 self-stretch text-sm leading-5 font-normal tracking-normal text-zinc-500">
              학생 부스 소개글 학생 부스 소개글 학생 부스 소개글 학생 부스 소개글 학생 부스 소개글
              학생 부스 소개글 학생 부스 소개글 학생 부스 소개글
            </p>
          </div>

          <Divider />

          <div className="flex-start flex flex-col gap-4 self-stretch">
            {/* 시간 */}
            <div className="flex items-start gap-4">
              <h3 className="w-7 text-center text-sm leading-5 font-semibold tracking-normal text-zinc-500">
                시간
              </h3>
              <div className="flex flex-col items-start gap-0.5">
                <h3 className="text-sm leading-5 font-normal tracking-normal text-zinc-800">
                  00일 (수) 10:00~12:30
                </h3>
                <h3 className="text-sm leading-5 font-normal tracking-normal text-zinc-800">
                  00일 (수) 10:00~12:30
                </h3>
              </div>
            </div>

            {/* 위치 */}
            <div className="flex items-start gap-4">
              <h3 className="w-7 text-center text-sm leading-5 font-semibold tracking-normal text-zinc-500">
                위치
              </h3>
              <div className="flex flex-col items-start gap-1.5">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm leading-5 font-medium tracking-normal text-zinc-800 underline decoration-solid underline-offset-2">
                    스포츠트랙 02
                  </h3>
                  <img src="/icons/icon-eclipse-gray.svg" />
                  <h3 className="text-sm leading-5 font-medium tracking-normal text-zinc-800 underline decoration-solid underline-offset-2">
                    로드뷰
                  </h3>
                </div>

                <p className="text-xs leading-4 font-normal tracking-normal text-zinc-500">
                  학문관 이화상점 오른쪽에 있습니다.
                </p>
              </div>
            </div>

            {/* sns */}
            <div className="flex items-start gap-4">
              <h3 className="w-7 text-center text-sm leading-5 font-semibold tracking-normal text-zinc-500">
                SNS
              </h3>
              <div className="flex items-center gap-2.5">
                <img src="/icons/logo-instagramcolor.svg" className="h-7 w-7 rounded-md" />
                <img src="/icons/logo-kakaotalkcolor.svg" className="h-7 w-7 rounded-md" />
              </div>
            </div>
          </div>
        </div>

        {/* 공지 */}
        <div className="w-full px-5">
          <NoticeCard title="공지 제목" />
        </div>

        {/* 리스트 & 후기 */}
        <div className="flex flex-col items-center gap-2 self-stretch px-5">
          <Tab
            variant="underline"
            tabs={['리스트', '후기']}
            activeIndex={activeTab}
            onChange={(index) => setActiveTab(index)}
          />

          <BoothCard />
        </div>
      </div>

      {showModal && <ImageModal image={booth?.thumbnail} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default MyBoothPage;
