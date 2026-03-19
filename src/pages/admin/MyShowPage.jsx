/**
 * 공연 페이지 6-3-1
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import ScrapButton from '@/components/ScrapButton';
import Badge from '@/components/Badge';
import ImageModal from '@/components/ImageModal';
import Divider from '@/components/Divider';
import NoticeCard from '@/components/Card/NoticeCard';
import Tab from '@/components/Tab';
import SetlistCard from '@/components/Card/SetlistCard';
import ReviewCard from '@/components/Card/ReviewCard';
import TextAreaSend from '@/components/Input/TextAreaSend';
import Scrim from '@/components/Scrim';
import Alert from '@/components/Alert';

const MyShowPage = () => {
  //추후 삭제 예정
  const ShowData = [
    {
      id: 1,
      name: '멋사 부스',
      thumbnail: '/images/boothcard-test.jpg',
      state: 'operating',
      category: '아티스트',
      description:
        '학생 공연 소개글 학생 부스 소개글 학생 부스 소개글 학생 부스 소개글 학생 부스 소개글',
      time: ['00일 (수) 10:00~12:30', '00일 (수) 13:00~15:30'],
      location: {
        name: '정문 02',
        extra: '학문관 이화상점 오른쪽에 있습니다.',
        roadView: false,
      },
      sns: {
        instagram: 'https://www.instagram.com/',
        kakaotalk: 'https://www.kakaocorp.com/page/service/service/KakaoTalk',
      },
      notices: [{ id: 1, title: '공지 제목', content: '공지 내용 더미' }],
      setlist: [
        {
          id: 1,
          title: 'Whiplash',
          artist: 'aespa',
        },
        {
          id: 2,
          title: 'Famous',
          artist: 'ALLDAY PROJECT',
        },
      ],
      reviews: [
        { id: 1, name: '익명 n', review: '좋아요!', ago: '2시간 전', showDelete: true },
        { id: 2, name: '익명 n', review: '맛있어요!', ago: '3시간 전', showDelete: false },
      ],
    },
    {
      id: 2,
      name: '',
      thumbnail: '',
      state: '',
      category: '',
      description: '',
      time: [],
      location: {},
      sns: [],
      notices: [],
      menu: [],
      reviews: [],
    },
  ];

  const { id } = useParams();
  const navigate = useNavigate();
  const Show = ShowData.find((item) => item.id === Number(id));

  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="relative">
      <Header className="absolute top-0" left="back" right="edit" background="white" />
      <img
        src={Show?.thumbnail || '/images/default-image-large.png'}
        className="flex aspect-49/30 w-full items-center justify-center object-cover"
        onClick={() => {
          if (Show?.thumbnail) {
            setSelectedImage(Show.thumbnail);
            setShowModal(true);
          }
        }}
      />

      <div className="flex w-full flex-col items-center gap-9 pt-5">
        {/* 부스 설명 */}
        <div className="flex w-full flex-col gap-6 self-stretch px-5">
          <div className="flex w-full flex-col items-start gap-2 self-stretch">
            <div className="flex w-full items-center justify-between self-stretch">
              <h2 className="text-2xl leading-8 font-semibold tracking-normal text-zinc-800">
                {Show?.name || '공연명'}
              </h2>
              <ScrapButton />
            </div>

            {(Show?.category || Show?.state) && (
              <div className="flex items-center gap-1">
                {Show?.category && (
                  <p className="text-sm leading-5 font-normal tracking-normal text-zinc-500">
                    {Show.category}
                  </p>
                )}

                {Show?.state && (
                  <>
                    {Show?.category && <img src="/icons/icon-eclipse-gray.svg" />}
                    <Badge state={Show.state} size="md" />
                  </>
                )}
              </div>
            )}

            {Show?.description && (
              <p className="line-clamp-2 max-h-10 self-stretch text-sm leading-5 font-normal tracking-normal text-zinc-500">
                {Show.description}
              </p>
            )}
          </div>

          <Divider />

          <div className="flex-start flex flex-col gap-4 self-stretch">
            {/* 시간 */}
            <div className="flex items-start gap-4">
              <h3 className="w-7 text-center text-sm leading-5 font-semibold tracking-normal text-zinc-500">
                시간
              </h3>
              <div className="flex flex-col items-start gap-0.5">
                {Show?.time && Show.time.length > 0 ? (
                  Show.time.map((t, i) => (
                    <h3
                      key={i}
                      className="text-sm leading-5 font-normal tracking-normal text-zinc-800"
                    >
                      {t}
                    </h3>
                  ))
                ) : (
                  <h3 className="text-sm leading-5 font-normal tracking-normal text-zinc-800">-</h3>
                )}
              </div>
            </div>

            {/* 위치 */}
            <div className="flex items-start gap-4">
              <h3 className="w-7 text-center text-sm leading-5 font-semibold tracking-normal text-zinc-500">
                위치
              </h3>
              <div className="flex flex-col items-start gap-1.5">
                <div className="flex items-center gap-1.5">
                  <h3
                    className={`text-sm leading-5 font-medium tracking-normal text-zinc-800 ${
                      Show?.location?.name ? 'underline decoration-solid underline-offset-2' : ''
                    }`}
                    onClick={() => Show?.location?.name && navigate('/장소')}
                    style={{ cursor: Show?.location?.name ? 'pointer' : 'default' }}
                  >
                    {Show?.location?.name || '-'}
                  </h3>

                  {/* 로드뷰 있을 때만 */}
                  {Show?.location?.roadView && (
                    <>
                      <img src="/icons/icon-eclipse-gray.svg" />
                      <h3
                        className="text-sm leading-5 font-medium tracking-normal text-zinc-800 underline decoration-solid underline-offset-2"
                        onClick={() => setShowModal(true)}
                        style={{ cursor: 'pointer' }}
                      >
                        로드뷰
                      </h3>
                    </>
                  )}
                </div>

                <p className="text-xs leading-4 font-normal tracking-normal text-zinc-500">
                  {Show?.location.extra}
                </p>
              </div>
            </div>

            {/* SNS */}
            <div className="flex items-start gap-4">
              <h3 className="w-7 text-center text-sm leading-5 font-semibold tracking-normal text-zinc-500">
                SNS
              </h3>
              <div className="flex items-center gap-2.5">
                {/* Instagram */}
                {Show?.sns?.instagram ? (
                  <img
                    src="/icons/logo-instagramcolor.svg"
                    className="h-7 w-7 cursor-pointer rounded-md"
                    onClick={() => {
                      if (Show.sns.instagram.startsWith('https')) {
                        window.open(Show.sns.instagram, '_blank');
                      }
                    }}
                  />
                ) : null}

                {/* KakaoTalk */}
                {Show?.sns?.kakaotalk ? (
                  <img
                    src="/icons/logo-kakaotalkcolor.svg"
                    className="h-7 w-7 cursor-pointer rounded-md"
                    onClick={() => {
                      if (Show.sns.kakaotalk.startsWith('https')) {
                        window.open(Show.sns.kakaotalk, '_blank');
                      }
                    }}
                  />
                ) : null}

                {/* 둘 다 없는 경우*/}
                {!Show?.sns?.instagram && !Show?.sns?.kakaotalk && (
                  <p className="text-sm leading-5 font-normal text-zinc-500">-</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 공지 */}
        <div className="w-full px-5">
          {Show?.notices && Show.notices.length > 0 ? (
            <NoticeCard
              title={Show.notices[0].title}
              onClick={() => navigate('/공지')}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <NoticeCard title="등록된 공지가 없어요." />
          )}
        </div>

        {/* 리스트 & 후기 */}
        <div className="flex w-full flex-col items-center gap-2 self-stretch px-5">
          <Tab
            variant="underline"
            tabs={['세트리스트', '후기']}
            activeIndex={activeTab}
            onChange={(index) => setActiveTab(index)}
          />
          <div className="flex w-full flex-col items-start self-stretch">
            {activeTab === 0 && (
              <div className="flex w-full flex-col gap-2 pb-36">
                {Show?.setlist && Show.setlist.length > 0 ? (
                  Show.setlist.map((item) => (
                    <SetlistCard key={item.id} title={item.title} artist={item.artist} />
                  ))
                ) : (
                  <div className="flex w-full items-center justify-center self-stretch py-20 text-center text-base leading-6 font-normal tracking-normal text-zinc-300">
                    등록된 내용이 없어요.
                  </div>
                )}
              </div>
            )}
            {activeTab === 1 && (
              <>
                <div className="mt-2 flex w-full flex-col items-center gap-4">
                  {Show?.reviews && Show.reviews.length > 0 ? (
                    Show.reviews.map((review) => (
                      <ReviewCard
                        key={review.id}
                        name={review.name}
                        review={review.review}
                        ago={review.ago}
                        showDelete={review.showDelete}
                        onClick={() => setShowDeleteModal(true)}
                      />
                    ))
                  ) : (
                    <div className="flex justify-center self-stretch py-20 text-center text-base leading-6 font-normal tracking-normal text-zinc-300">
                      등록된 내용이 없어요.
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {activeTab === 1 && (
          <div className="sticky bottom-0 w-full border-t border-zinc-100 bg-white py-4">
            <div className="px-5">
              <TextAreaSend placeholder="후기는 익명으로 남겨져요." />
            </div>
          </div>
        )}
      </div>

      {showModal && <ImageModal image={selectedImage} onClose={() => setShowModal(false)} />}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Scrim />
          <Alert
            variant="delete"
            title="후기"
            text={
              <>
                후기를 삭제할까요?
                <br />
                삭제한 후기는 복구되지 않아요.
              </>
            }
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={() => setShowDeleteModal(false)}
          />
        </div>
      )}
    </div>
  );
};

export default MyShowPage;
