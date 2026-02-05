/**
 * ReviewCard 컴포넌트
 */

import React from 'react';
import IconButton from '@/components/IconButton';

const ReviewCard = ({ name, review, ago, showDelete = false, onClick }) => {
  return (
    <div className="flex w-72 flex-col items-start justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3">
      <div className="flex w-64 flex-col items-start gap-0.5">
        <div className="flex items-center justify-between self-stretch">
          <h2 className="line-clamp-1 overflow-hidden py-2.5 text-sm leading-5 font-semibold tracking-normal text-ellipsis text-gray-900">
            {name}
          </h2>

          {showDelete && <IconButton name="trash" size={20} className="mr-2.5" onClick={onClick} />}
        </div>

        <h3 className="self-stretch text-sm leading-5 font-normal tracking-normal text-gray-900">
          {review}
        </h3>
      </div>

      <p className="text-xs leading-4 font-normal tracking-normal text-gray-300">{ago}</p>
    </div>
  );
};

export default ReviewCard;
