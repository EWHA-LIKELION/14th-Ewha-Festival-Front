/**
 * SetlistCard 컴포넌트
 */

import React from 'react';

const SetlistCard = ({ setlist }) => {
  return (
    <div className="flex w-full items-center justify-start rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-center gap-2.5">
        <img src="/icons/icon-setlist.svg" />
        <h2 className="line-clamp-1 overflow-hidden text-sm leading-5 font-medium tracking-normal text-ellipsis text-gray-900">
          {setlist}
        </h2>
      </div>
    </div>
  );
};

export default SetlistCard;
