/**
 * 공연 페이지 6-3-1
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAlertStore from '@/store/useAlertStore';
import useLoadingStore from '@/store/useLoadingStore';

import { ShowAPI } from '@/apis';
import { SHOW_CATEGORY } from '@/constants/category';
import { SHOW_LOCATION } from '@/constants/building';
import { getLabel, padNumber } from '@/utils/labelHelper';
import { formatScheduleDate } from '@/utils/dateHelper';

import Header from '@/components/Header';
import ScrapButton from '@/components/ScrapButton';
import Badge from '@/components/Badge';
import ImageModal from '@/components/ImageModal';
import Divider from '@/components/Divider';
import NoticeCard from '@/components/Card/NoticeCard';
import Tab from '@/components/Tab';
import SetlistCard from '@/components/Card/SetlistCard';

const MyShowPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const openAlert = useAlertStore((s) => s.openAlert);
  const closeAlert = useAlertStore((s) => s.closeAlert);
  const showLoading = useLoadingStore((s) => s.showLoading);
  const hideLoading = useLoadingStore((s) => s.hideLoading);

  const [show, setShow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchShowDetail = async () => {
      try {
        showLoading();
        const data = await ShowAPI.getShowById(id);
        setShow(data);
      } catch (error) {
        console.error('공연 정보를 불러오는데 실패했습니다:', error);
        openAlert({
          variant: 'error',
          title: '오류',
          text: '공연 정보를 불러올 수 없습니다.',
          onConfirm: () => {
            closeAlert();
            navigate(-1);
          },
        });
      } finally {
        hideLoading();
      }
    };

    if (id) {
      fetchShowDetail();
    }
  }, [id]);

  if (!show) {
    return null;
  }

  const getShowState = (isOngoing) => {
    if (isOngoing === null) return 'upcoming'; // 공연 전
    if (isOngoing === true) return 'performing'; // 공연 중
    return 'closed'; // 공연 종료
  };

  const categoryText = show.category ? getLabel(show.category, SHOW_CATEGORY) : '';
  const scheduleText =
    show.schedule?.map((s) => {
      const formattedDate = formatScheduleDate(s.date);
      return `${formattedDate} ${s.time}`;
    }) || [];
  const locationName = show.location
    ? `${getLabel(show.location.building, SHOW_LOCATION)} ${padNumber(show.location.number)}`
    : '';
  const snsLinks = {
    instagram: show.sns?.find((url) => url.includes('instagram')),
    kakaotalk: show.sns?.find((url) => url.includes('kakao')),
  };

  return (
    <div className="relative">
      <Header className="absolute top-0" left="back" right="edit" background="white" />
      <img
        src={show.thumbnail || '/images/default-image-large.png'}
        className="mt-18 flex aspect-49/30 w-full items-center justify-center object-cover"
        onClick={() => {
          if (show.thumbnail) {
            setSelectedImage(show.thumbnail);
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
                {show.name || '공연명'}
              </h2>
              <ScrapButton count={show.scraps_count} />
            </div>

            {(categoryText || show.is_ongoing !== undefined) && (
              <div className="flex items-center gap-1">
                {categoryText && (
                  <p className="text-sm leading-5 font-normal tracking-normal text-zinc-500">
                    {categoryText}
                  </p>
                )}

                {show.is_ongoing !== undefined && (
                  <>
                    {categoryText && <img src="/icons/icon-eclipse-gray.svg" />}
                    <Badge state={getShowState(show.is_ongoing)} size="md" />
                  </>
                )}
              </div>
            )}

            {show.description && (
              <p className="line-clamp-2 max-h-10 self-stretch text-sm leading-5 font-normal tracking-normal text-zinc-500">
                {show.description}
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
                {scheduleText.length > 0 ? (
                  scheduleText.map((t, i) => (
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
                      locationName ? 'underline decoration-solid underline-offset-2' : ''
                    }`}
                    onClick={() => locationName && navigate('/장소')}
                    style={{ cursor: locationName ? 'pointer' : 'default' }}
                  >
                    {locationName || '-'}
                  </h3>

                  {show.roadview && (
                    <>
                      <img src="/icons/icon-eclipse-gray.svg" />
                      <h3
                        className="text-sm leading-5 font-medium tracking-normal text-zinc-800 underline decoration-solid underline-offset-2"
                        onClick={() => {
                          setSelectedImage(show.roadview);
                          setShowModal(true);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        로드뷰
                      </h3>
                    </>
                  )}
                </div>

                {show.location_description && (
                  <p className="text-xs leading-4 font-normal tracking-normal text-zinc-500">
                    {show.location_description}
                  </p>
                )}
              </div>
            </div>

            {/* SNS */}
            <div className="flex items-start gap-4">
              <h3 className="w-7 text-center text-sm leading-5 font-semibold tracking-normal text-zinc-500">
                SNS
              </h3>
              <div className="flex items-center gap-2.5">
                {snsLinks.instagram && (
                  <img
                    src="/icons/logo-instagramcolor.svg"
                    className="h-7 w-7 cursor-pointer rounded-md"
                    onClick={() => window.open(snsLinks.instagram, '_blank')}
                  />
                )}

                {snsLinks.kakaotalk && (
                  <img
                    src="/icons/logo-kakaotalkcolor.svg"
                    className="h-7 w-7 cursor-pointer rounded-md"
                    onClick={() => window.open(snsLinks.kakaotalk, '_blank')}
                  />
                )}

                {!snsLinks.instagram && !snsLinks.kakaotalk && (
                  <p className="text-sm leading-5 font-normal text-zinc-500">-</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 공지 */}
        <div className="w-full px-5">
          {show.latest_notice ? (
            <NoticeCard
              title={show.latest_notice.title}
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
            tabs={['세트리스트']}
            activeIndex={activeTab}
            onChange={(index) => setActiveTab(index)}
          />
          <div className="flex w-full flex-col items-start self-stretch">
            {activeTab === 0 && (
              <div className="flex w-full flex-col gap-2 pb-36">
                {show.setlist && show.setlist.length > 0 ? (
                  show.setlist.map((item) => <SetlistCard key={item.id} title={item.name} />)
                ) : (
                  <div className="flex w-full items-center justify-center self-stretch py-20 text-center text-base leading-6 font-normal tracking-normal text-zinc-300">
                    등록된 내용이 없어요.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && <ImageModal image={selectedImage} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default MyShowPage;
