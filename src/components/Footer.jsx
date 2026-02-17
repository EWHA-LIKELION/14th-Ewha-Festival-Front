/**
 * Footer 컴포넌트
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@/components/IconButton';
import Button from '@/components/Button';

const Footer = () => {
  const navigate = useNavigate();
  const goCreditPage = () => {
    navigate('/credit');
  };
  const goLikelionWebsite = () => {
    window.open('https://likelion.ewha.university/', '_blank');
  };
  const goLikelionInstagram = () => {
    window.open('https://www.instagram.com/likelion_ewha/', '_blank');
  };
  const goLikelionKakaotalk = () => {
    window.open('https://pf.kakao.com/_htxexfd', '_blank');
  };
  const goLikelionGithub = () => {
    window.open('https://github.com/EWHA-LIKELION', '_blank');
  };
  return (
    <div className="flex w-full flex-col items-center gap-4 bg-linear-to-t from-emerald-50 to-white py-5 text-center text-emerald-500">
      <Button size="sm" variant="underline-green" onClick={goCreditPage}>
        만든이들
      </Button>
      <p className="text-xs font-normal">멋쟁이사자처럼 14기 | LIKELION EWHA 14th</p>
      <div className="flex justify-center gap-4">
        <button onClick={goLikelionWebsite}>
          <img src="/icons/logo-likelion.svg" alt="likelion-website" />
        </button>
        <button onClick={goLikelionInstagram}>
          <img src="/icons/logo-instagram.svg" alt="likelion-instagram" />
        </button>
        <button onClick={goLikelionKakaotalk}>
          <img src="/icons/logo-kakaotalk.svg" alt="likelion-kakaotalk" />
        </button>
        <button onClick={goLikelionGithub}>
          <img src="/icons/logo-github.svg" alt="likelion-github" />
        </button>
      </div>
      <p className="text-xs font-normal whitespace-nowrap text-black/25">
        Copyright ⓒ LIKELION EWHA 14th. All Rights Reserved.
      </p>
    </div>
  );
};
export default Footer;
