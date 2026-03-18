/**
 * ReviewCard 컴포넌트
 */

import React from 'react';

const ReviewCard = ({ name, review, ago, showDelete = false, onClick }) => {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-3 rounded-xl border border-zinc-200 bg-white pt-2 pr-3 pb-4 pl-5">
      <div className="flex w-full flex-col items-start">
        <div className="justify-text-center between flex h-10 w-full items-center self-stretch">
          <h2 className="line-clamp-1 w-full overflow-hidden text-sm leading-5 font-semibold tracking-normal text-ellipsis text-zinc-800">
            {name}
          </h2>
          <div className="flex w-full items-center justify-end px-2.5 pt-2.5">
            {showDelete && (
              <button onClick={onClick}>
                <img src="/icons/icon-trash.svg" alt="삭제" width="20" height="20" />
              </button>
            )}
          </div>
        </div>
        <h3 className="w-full self-stretch pr-2 text-sm leading-5 font-normal tracking-normal text-zinc-800">
          {review}
        </h3>
      </div>

      <p className="w-full text-xs leading-4 font-normal tracking-normal text-zinc-300">{ago}</p>
    </div>
  );
};

export default ReviewCard;
