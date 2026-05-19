/**
 * HomeModal 컴포넌트
 */

import { useState } from 'react';
import Checkbox from '@/components/Checkbox';
import Scrim from '@/components/Scrim';

const HomeModal = ({ onClose }) => {
  const [hide, setHide] = useState(false);

  const handleClose = () => {
    if (hide) {
      const today = new Date().toDateString();
      localStorage.setItem('hide', today);
    }

    onClose();
  };

  const deadline = new Date('2026-05-21T23:59:59');
  const now = new Date();

  const isOldBanner = now <= deadline;

  const imageSrc = isOldBanner ? '/icons/home-modal-1.svg' : '/icons/home-modal-2.svg';

  const link = isOldBanner
    ? null
    : 'https://docs.google.com/forms/d/e/1FAIpQLSfN_gvAScpUIOqa0BmUI-ttAI_3BSDeNd4RGc9p4HAnKNuCUA/viewform';

  return (
    <div className="flex items-center justify-center">
      <Scrim />

      <div className="z-50 flex h-114 w-80 flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl bg-white pb-4">
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer" className="block">
            <img src={imageSrc} alt="홈 화면 추가 안내" />
          </a>
        ) : (
          <img src={imageSrc} alt="만족도 조사" />
        )}
        <div className="flex items-center justify-between self-stretch px-6">
          <Checkbox label="오늘 하루 보지 않기" isSelected={hide} onChange={() => setHide(!hide)} />
          <button
            onClick={handleClose}
            className="flex items-center justify-center gap-1 text-center text-base leading-6 font-medium tracking-normal text-zinc-500"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeModal;
