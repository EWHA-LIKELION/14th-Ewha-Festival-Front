/**
 * ShowCard 컴포넌트
 */

import Badge from '@/components/Badge';
import ScrapButton from '@/components/ScrapButton';

const ShowCard = ({ show, onClick }) => {
  if (!show) return null;

  // API 응답 데이터 (이미 변환된 데이터)
  const {
    id,
    name,
    description,
    thumbnail,
    is_scrapped = false,
    scraps_count = 0,
    // useShows에서 변환된 필드들
    categoryText,
    daysText,
    timesText,
    locationText,
    badgeState,
  } = show;

  return (
    <div
      onClick={onClick}
      className="flex w-full items-start gap-4 border-b border-zinc-200 bg-white py-5"
    >
      {/* 공연 이미지 */}
      <img
        src={thumbnail || '/icons/default-image.svg'}
        alt={name}
        className="flex aspect-square h-20 w-20 items-center justify-center rounded-md border border-zinc-100 object-cover"
      />

      {/* 공연명 및 정보 */}
      <div className="flex w-full flex-col items-start gap-1">
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-1">
              <h2 className="text-lg leading-6 font-semibold tracking-normal text-zinc-800">
                {name || '공연명'}
              </h2>

              <Badge state={badgeState} />
            </div>
            <h3 className="text-xs leading-4 font-medium tracking-normal text-emerald-800">
              {categoryText || '카테고리'} | {daysText || '요일'} {timesText && ` ${timesText}`} |{' '}
              {locationText}
            </h3>
          </div>
          <ScrapButton id={id} type="show" initialScrapped={is_scrapped} count={scraps_count} />
        </div>
        <p className="line-clamp-2 overflow-hidden text-xs leading-4 font-normal tracking-normal text-ellipsis text-zinc-500">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ShowCard;
