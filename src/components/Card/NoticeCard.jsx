/**
 * NoticeCard 컴포넌트 (variant -notice, instagram)
 */

import React from 'react';

const ICON = {
  notice: '/icons/icon-notice.svg',
  instagram: '/icons/icon-instagram-gray.svg',
};

const NoticeCard = ({ title, variant = 'notice', onClick, style }) => {
  return (
    <div
      className="flex w-full items-start justify-start rounded-lg border border-zinc-200 bg-zinc-100 px-4 py-3"
      onClick={onClick}
      style={style}
    >
      <div className="flex items-center gap-2.5">
        <img src={ICON[variant]} />
        <h2 className="line-clamp-1 overflow-hidden text-sm leading-5 font-medium tracking-normal text-ellipsis text-zinc-800">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default NoticeCard;
