import React from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@/components/IconButton';

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
  const goLikelionGithub = () => {
    window.open('https://github.com/EWHA-LIKELION', '_blank');
  };
  return (
    <div className="flex w-full flex-col items-center gap-4 bg-white bg-gradient-to-t from-emerald-50 px-11 py-5 text-center text-emerald-500">
      <button
        onClick={goCreditPage}
        className="w-fit text-sm font-medium underline underline-offset-2"
      >
        만든이들
      </button>
      <p className="text-xs font-normal">멋쟁이사자처럼 14기 | LIKELION EWHA 14th</p>
      <div className="flex justify-center gap-4">
        <IconButton name="likelion" alt="likelion-website" onClick={goLikelionWebsite} />
        <IconButton name="instagram" alt="likelion-instagram" onClick={goLikelionInstagram} />
        <IconButton name="github" alt="likelion-github" onClick={goLikelionGithub} />
      </div>
      <p className="text-xs font-normal text-black/25">
        Copyright ⓒ LIKELION EWHA 14th. All Rights Reserved.
      </p>
    </div>
  );
};
export default Footer;
