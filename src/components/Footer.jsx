/**
 * Footer 컴포넌트
 */
import { useNavigate } from 'react-router-dom';

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
    <div
      className="relative inset-0 w-full overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: 'url(/icons/footer-background.svg)' }}
    >
      {/* 컨텐츠 */}
      <div className="relative z-10 flex w-full flex-col items-center gap-4 py-5 text-center text-lime-700">
        <button
          className="gap-1.5 px-4 py-1.5 text-sm font-medium text-lime-700 underline underline-offset-2"
          onClick={goCreditPage}
        >
          만든이들
        </button>
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
    </div>
  );
};
export default Footer;
