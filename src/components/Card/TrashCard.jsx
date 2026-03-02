/**
 * TrashCard 컴포넌트 (selected)
 */

import react from 'react';

const TrashCard = ({ title, description, selected = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex w-full flex-col items-start justify-center rounded-xl border p-5 ${selected ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 bg-white'}`}
    >
      <div className="flex h-11.5 w-78 flex-col items-start gap-1.5">
        <h2 className="self-stretch text-base leading-6 font-semibold tracking-normal text-gray-900">
          {title}
        </h2>
        <p
          className={`self-stretch text-xs leading-4 font-normal tracking-normal ${selected ? 'text-gray-900' : 'text-gray-500'}`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default TrashCard;
