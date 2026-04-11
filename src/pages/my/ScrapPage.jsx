/**
 * 스크랩 페이지
 */

import { useState } from 'react';

import Header from '@/components/Header';
import Tab from '@/components/Tab';
import ScrapBooth from '@/pages/my/ScrapBooth';
import ScrapShow from '@/pages/my/ScrapShow';

const totalCount = 0;

const ScrapPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Header left="back" center="title" centerTitle="스크랩북" right="search" />
      <div className="mt-18 flex flex-col gap-4 px-5 pt-5">
        <Tab tabs={['부스', '공연']} activeIndex={activeIndex} onChange={setActiveIndex} />
        {activeIndex === 0 ? <ScrapBooth /> : <ScrapShow />}
      </div>
    </>
  );
};

export default ScrapPage;
