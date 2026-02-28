/**
 * ReviewCard 컴포넌트
 */

import React from 'react';

const ReviewCard = ({ name, review, ago, showDelete = false, onClick }) => {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-2.5 rounded-xl border border-gray-200 bg-white px-5 pt-2.5 pb-4">
      <div className="flex items-start justify-between gap-2 self-stretch">
        <div className="flex w-66 flex-col items-start gap-1.5 pt-2">
          <h2 className="line-clamp-1 overflow-hidden text-sm leading-5 font-semibold tracking-normal text-ellipsis text-gray-900">
            {name}
          </h2>

          <h3 className="self-stretch text-sm leading-5 font-normal tracking-normal text-gray-900">
            {review}
          </h3>
        </div>
        <div className="items-center justify-center pt-2">
          {showDelete && (
            <button onClick={onClick}>
              <img src="/icons/icon-trash.svg" alt="삭제" width="20" height="20" />
            </button>
          )}
        </div>
      </div>

      <p className="text-xs leading-4 font-normal tracking-normal text-gray-300">{ago}</p>
    </div>
  );
};

export default ReviewCard;
