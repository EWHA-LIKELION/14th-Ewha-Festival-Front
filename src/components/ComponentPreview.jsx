/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import React from 'react';
import Footer from '@/components/Footer';
import Chip from '@/components/Chip';
import FilterBar from '@/components/FilterBar';

const ComponentPreview = () => {
  const handleClick = () => console.log('chip clicked');
  const handleDelete = () => console.log('chip deleted');
  const handleFilterClick = (key) => console.log('filter click:', key);
  const handleFilterDelete = (key) => console.log('filter delete:', key);
  const handleSettingClick = () => console.log('setting clicked');

  return (
    <>
      <div className="flex flex-col gap-3 p-4">
        <div className="mb-2 font-bold">bottomsheet Chip (크기 medium)</div>
        <Chip text="밴드" isSelected={true} onClick={handleClick} />
        <Chip text="밴드" isSelected={false} onClick={handleClick} />
        <Chip variant="state" isSelected={true} />
        <Chip variant="state" isSelected={false} />
        <Chip variant="recent" text="최근검색어" onDelete={handleDelete} />

        <hr />
        <div className="mb-2 font-bold">filter Chip (크기 sm)</div>
        <Chip variant="filter" text="카테고리" onClick={handleClick} />
        <Chip
          variant="filter"
          text="카테고리"
          selectedValue="밴드"
          isSelected={true}
          onDelete={handleDelete}
        />
        <Chip
          variant="filter"
          text="주관"
          selectedValue="학생"
          isSelected={true}
          onDelete={handleDelete}
        />
        <Chip
          variant="filter"
          text="위치"
          selectedValue="생활환경관"
          isSelected={true}
          onDelete={handleDelete}
        />
        <Chip
          variant="filter"
          text="요일"
          selectedValue="수"
          isSelected={true}
          onDelete={handleDelete}
        />

        <div className="mb-2 font-bold">Chip - 토글형 (쓰레기통)</div>
        <Chip variant="toggle" text="쓰레기통" isSelected={true} onClick={handleClick} />
        <Chip variant="toggle" text="쓰레기통" isSelected={false} onClick={handleClick} />

        <div className="mb-2 font-bold">FilterBar - 부스</div>
        <FilterBar
          type="booth"
          filters={{}}
          onFilterClick={handleFilterClick}
          onFilterDelete={handleFilterDelete}
          onSettingClick={handleSettingClick}
        />

        <FilterBar
          type="booth"
          filters={{
            subject: { value: '학생' },
            category: { value: '밴드' },
            day: { value: '수' },
            location: { value: '생활환경관' },
          }}
          onFilterClick={handleFilterClick}
          onFilterDelete={handleFilterDelete}
          onSettingClick={handleSettingClick}
        />

        <div className="mb-2 font-bold">FilterBar - 공연</div>
        <FilterBar
          type="performance"
          filters={{}}
          onFilterClick={handleFilterClick}
          onFilterDelete={handleFilterDelete}
          onSettingClick={handleSettingClick}
        />
      </div>
    </>
  );
};

export default ComponentPreview;
