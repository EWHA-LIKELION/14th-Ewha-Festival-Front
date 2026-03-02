/**
 * ReviewCard 컴포넌트
 */

import React from 'react';

const ReviewCard = ({ name, review, ago, showDelete = false, onClick }) => {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-3 rounded-xl border border-gray-200 bg-white pt-2.5 pr-3 pb-4 pl-5">
      <div className="flex flex-col items-start">
        <div className="flex h-10 w-full items-center justify-between">
          <h2 className="line-clamp-1 overflow-hidden text-sm leading-5 font-semibold tracking-normal text-ellipsis text-gray-900">
            {name}
          </h2>
          <div className="items-center justify-center px-2 pt-2">
            {showDelete && (
              <button onClick={onClick}>
                <img src="/icons/icon-trash.svg" alt="삭제" width="20" height="20" />
              </button>
            )}
          </div>
        </div>
        <h3 className="self-stretch pr-2 text-sm leading-5 font-normal tracking-normal text-gray-900">
          {review}
        </h3>
      </div>

      <p className="text-xs leading-4 font-normal tracking-normal text-gray-300">{ago}</p>
    </div>
  );
};

export default ReviewCard;
