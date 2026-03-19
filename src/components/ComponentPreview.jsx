/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import Carousel from '@/components/Carousel';
import Footer from '@/components/Footer';

const ComponentPreview = () => {
  return (
    <>
      <div className="flex h-100 items-center justify-center">
        <Carousel
          items={[
            {
              image: 'images/boothcard-test.jpg',
              link: '/',
            },
            {
              image: 'images/carousel-test1.png',
              link: 'https://likelion.ewha.university/',
            },
            {
              image: 'images/carousel-test2.png',
            },
            {
              image: 'images/carousel-test1.png',
            },
          ]}
        />
      </div>
      <Footer />
    </>
  );
};

export default ComponentPreview;
