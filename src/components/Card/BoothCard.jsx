/**
 * BoothCard 컴포넌트
 */

import Badge from '@/components/Badge';
import ScrapButton from '@/components/ScrapButton';

const BoothCard = ({ booth, onClick }) => {
  if (!booth) return null;

  // API 응답 데이터 (이미 변환된 데이터)
  const {
    id,
    name,
    description,
    thumbnail,
    product_images = [],
    is_scrapped = false,
    scraps_count = 0,
    // useBooths에서 변환된 필드들
    categoryText,
    daysText,
    locationText,
    badgeState,
  } = booth;

  // 이미지 리스트 (최대 3개)
  const images = product_images.filter((img) => img).slice(0, 3);

  return (
    <div
      onClick={onClick}
      className="g-0 flex w-full flex-col items-start border-b border-zinc-200 bg-white py-5"
    >
      {/* 부스명 및 위치 */}
      <div className="flex w-full items-start justify-between p-0">
        <div className="flex flex-col items-start gap-1 p-0">
          <div className="flex items-center gap-1.5">
            <h2 className="text-lg leading-6 font-semibold tracking-normal text-zinc-800">
              {name || '부스명'}
            </h2>

            <Badge state={badgeState} />
          </div>

          <h3 className="text-sm leading-5 font-medium tracking-normal text-emerald-800">
            {categoryText || '카테고리'} | {daysText || '요일'} | {locationText || '위치'}
          </h3>
        </div>
        <ScrapButton id={id} type="booth" initialScrapped={is_scrapped} count={scraps_count} />
      </div>

      {/* 부스 소개글 */}
      <p className="mt-1.5 line-clamp-1 overflow-hidden text-sm leading-5 font-normal tracking-normal text-ellipsis text-zinc-500">
        {description}
      </p>

      {/* 이미지 미리보기 */}
      <div className="mt-2.5 flex items-center gap-2 p-0">
        {/* 썸네일 */}
        <img
          src={thumbnail || '/icons/default-image.svg'}
          alt={name}
          className="h-20 w-20 rounded-md border border-zinc-100 object-cover"
        />

        {/* 상품 이미지 (최대 3개) */}
        {images.length > 0 &&
          images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${name} 상품 ${idx + 1}`}
              className="h-20 w-20 rounded-md border border-zinc-100 object-cover"
            />
          ))}
      </div>
    </div>
  );
};

export default BoothCard;
