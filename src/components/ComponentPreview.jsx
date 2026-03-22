/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import BottomsheetDrag from '@/components/BottomsheetDrag';
import useBottomsheetStore from '@/store/useBottomsheetStore';
import Header from '@/components/Header';
import BoothCard from '@/components/Card/BoothCard';

const ComponentPreview = () => {
  const isFull = useBottomsheetStore((s) => s.isFull());

  return (
    <BottomsheetDrag>
      {isFull && (
        <>
          <Header left="back" />
          <img
            src="/images/boothcard-test.jpg"
            alt=""
            className="w-full"
            style={{ height: '240px', objectFit: 'cover' }}
          />
        </>
      )}
      {/* BoothCard 프리뷰 */}
      <div className="mb-8 p-5">
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
    </BottomsheetDrag>
  );
};

export default ComponentPreview;
