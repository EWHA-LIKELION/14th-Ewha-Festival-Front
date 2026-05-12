/**
 * 공연 상세 바텀시트
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAlertStore from '@/store/useAlertStore';
import useBottomsheetStore from '@/store/useBottomsheetStore';
import useImageModalStore from '@/store/useImageModalStore';

import { useShowDetail } from '@/hooks';
import LoadingSpinner from '@/components/LoadingSpinner';
import { SHOW_CATEGORY } from '@/constants/category';
import { SHOW_LOCATION } from '@/constants/building';
import { getLabel } from '@/utils/labelHelper';
import { formatScheduleDate } from '@/utils/dateHelper';
import { mapSnsUrls } from '@/utils/snsHelper';

import BottomsheetDrag from '@/components/BottomsheetDrag';
import Header from '@/components/Header';
import ScrapButton from '@/components/ScrapButton';
import Badge from '@/components/Badge';
import Divider from '@/components/Divider';
import NoticeCard from '@/components/Card/NoticeCard';
import Tab from '@/components/Tab';
import SetlistCard from '@/components/Card/SetlistCard';

const ShowDetailSheet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const openAlert = useAlertStore((s) => s.openAlert);
  const closeAlert = useAlertStore((s) => s.closeAlert);
  const isFull = useBottomsheetStore((s) => s.isFull());
  const setSheetSize = useBottomsheetStore((s) => s.setSheetSize);

  const { data: show, error, isLoading } = useShowDetail(id);
  const openImageModal = useImageModalStore((s) => s.openImageModal);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!error) return;
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
  }, [error]);

  if (!isLoading && !show) {
    return null;
  }

  const goNoticePage = () => {
    navigate(`/map/shows/${id}/notice`);
  };

  const getShowState = (status) => {
    if (!status) return 'upcoming';

    switch (status.toUpperCase()) {
      case 'BEFORE':
        return 'upcoming';
      case 'DURING':
        return 'performing';
      case 'AFTER':
        return 'closed';
      default:
        return 'upcoming';
    }
  };

  const categoryText = show?.category ? getLabel(show.category, SHOW_CATEGORY) : '';
  const scheduleText =
    show?.schedule?.map((s) => {
      const formattedDate = formatScheduleDate(s.date);
      return `${formattedDate} ${s.time}`;
    }) || [];
  const locationName = show?.location ? `${getLabel(show.location.building, SHOW_LOCATION)}` : '';
  const snsLinks = mapSnsUrls(show?.sns);

  return (
    <>
      <div className={isFull ? 'relative z-10' : 'relative z-20'}>
        <Header left="back" background="transparent" />
      </div>
      <BottomsheetDrag>
        {isLoading && (
          <div className="flex h-full items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && isFull && (
          <>
            <Header left="back" />
            <img
              src={show.thumbnail || '/images/default-image-large.png'}
              className={`${show.thumbnail ? 'cursor-pointer' : 'cursor-default'} flex aspect-49/30 w-full items-center justify-center object-cover`}
              onClick={() => {
                if (show.thumbnail) openImageModal(show.thumbnail);
              }}
            />
          </>
        )}

        {!isLoading && (
          <div className="flex w-full flex-col items-center gap-9 pt-5">
            {/* 부스 설명 */}
            <div className="flex w-full flex-col gap-6 self-stretch px-5">
              <div className="flex w-full flex-col items-start gap-2 self-stretch">
                <div className="flex w-full items-center justify-between self-stretch">
                  <h2 className="text-2xl leading-8 font-semibold tracking-normal text-zinc-800">
                    {show.name || '공연명'}
                  </h2>
                  <ScrapButton
                    id={id}
                    type="show"
                    initialScrapped={show.is_scrapped}
                    count={show.scraps_count}
                  />
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
                  <p className="self-stretch text-sm leading-5 font-normal tracking-normal whitespace-pre-line text-zinc-500">
                    {show.description}
                  </p>
                )}
              </div>

              <Divider />

              <div className="flex-start flex flex-col gap-4 self-stretch">
                {/* 시간 */}
                <div className="flex items-start gap-4">
                  <h3 className="w-7 shrink-0 text-center text-sm leading-5 font-semibold tracking-normal whitespace-nowrap text-zinc-500">
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
                      <h3 className="text-sm leading-5 font-normal tracking-normal text-zinc-800">
                        -
                      </h3>
                    )}
                  </div>
                </div>

                {/* 위치 */}
                <div className="flex items-start gap-4">
                  <h3 className="w-7 shrink-0 text-center text-sm leading-5 font-semibold tracking-normal whitespace-nowrap text-zinc-500">
                    위치
                  </h3>
                  <div className="flex flex-col items-start gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSheetSize('medium')}
                        className={`text-sm leading-5 font-medium tracking-normal text-zinc-800 ${
                          locationName
                            ? 'underline decoration-solid underline-offset-2'
                            : 'cursor-default'
                        }`}
                      >
                        {locationName || '-'}
                      </button>

                      {show.roadview && (
                        <>
                          <img src="/icons/icon-eclipse-gray.svg" />
                          <button
                            className="text-sm leading-5 font-medium tracking-normal text-zinc-800 underline decoration-solid underline-offset-2"
                            onClick={() => openImageModal(show.roadview)}
                          >
                            로드뷰
                          </button>
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
                  <h3 className="w-7 shrink-0 text-center text-sm leading-5 font-semibold tracking-normal whitespace-nowrap text-zinc-500">
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
                  onClick={goNoticePage}
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                <NoticeCard title="등록된 공지가 없어요." />
              )}
            </div>

            {/* 리스트 */}
            <div className="flex w-full flex-col items-center gap-2 self-stretch px-5">
              <Tab
                variant="underline"
                tabs={['세트리스트']}
                activeIndex={activeTab}
                onChange={(index) => setActiveTab(index)}
              />
              <div className="flex w-full flex-col items-stretch self-stretch">
                {activeTab === 0 && (
                  <div className="flex w-full flex-col gap-2 pb-36">
                    {show.setlist && show.setlist.length > 0 ? (
                      show.setlist.map((item) => <SetlistCard key={item.id} setlist={item.name} />)
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
        )}
      </BottomsheetDrag>
    </>
  );
};

export default ShowDetailSheet;
