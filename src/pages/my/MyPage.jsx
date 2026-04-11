/**
 * 마이페이지
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthAPI } from '@/apis';
import useAuthStore from '@/store/useAuthStore';
import useAlertStore from '@/store/useAlertStore';
import { useMyProfile } from '@/hooks/useMyProfile';
import Header from '@/components/Header';
import Button from '@/components/Button';
import ImageCard from '@/components/Card/ImageCard';

const MyPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const logout = useAuthStore((s) => s.logout);
  const openLoginSheet = useAuthStore((s) => s.openLoginSheet);
  const openAlert = useAlertStore((s) => s.openAlert);
  const closeAlert = useAlertStore((s) => s.closeAlert);
  const { data: myData, error } = useMyProfile();

  const goScrap = () => {
    if (!isLoggedIn) {
      openLoginSheet();
      return;
    }
    navigate('scrap');
  };

  const goAdminConfirm = () => {
    if (!isLoggedIn) {
      openLoginSheet();
      return;
    }
    navigate('/admin/confirm');
  };

  const goFestivalKakaotalk = () => {
    window.open('https://pf.kakao.com/_Rjvxon', '_blank');
  };

  const goBoothManage = (boothId) => {
    navigate(`/admin/booth/${boothId}`);
  };

  const goShowManage = (showId) => {
    navigate(`/admin/show/${showId}`);
  };

  const goScrapDetail = (scrapId) => {
    if (scrapId?.includes('BOOTH')) {
      navigate(`/map/booths/${scrapId}`);
    } else if (scrapId?.includes('SHOW')) {
      navigate(`/map/shows/${scrapId}`);
    }
  };

  const handleLogoutClick = () => {
    openAlert({
      variant: 'logout',
      onConfirm: async () => {
        try {
          await AuthAPI.logout();
          logout(); // zustand 상태도 초기화
        } catch (error) {
          console.error('로그아웃 실패:', error);
        } finally {
          closeAlert();
        }
      },
      onCancel: closeAlert,
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      openLoginSheet();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!error) return;
    console.error('마이페이지 데이터 로드 실패:', error);
    if (error?.response?.status === 401) {
      openAlert({
        variant: 'error',
        title: '세션 만료',
        text: '로그인 세션이 만료되었습니다. 다시 로그인해주세요.',
        onConfirm: () => {
          logout();
          closeAlert();
          openLoginSheet();
        },
      });
    }
  }, [error]);

  return (
    <>
      <Header left="logo" right="search" />
      <div className="flex flex-col pt-23 text-lg font-semibold text-zinc-800">
        {/* 닉네임, 로그인&로그아웃 */}
        <div className="flex justify-between px-5 py-4">
          <div className="flex gap-1">
            {isLoggedIn ? (
              <>
                <p className="text-emerald-600">{myData?.nickname}</p>
                <p>님</p>
              </>
            ) : (
              <p>로그인해주세요.</p>
            )}
          </div>
          <Button
            size="md"
            variant="bg-gray"
            circle
            onClick={isLoggedIn ? handleLogoutClick : openLoginSheet}
          >
            {isLoggedIn ? '로그아웃' : '로그인'}
          </Button>
        </div>
        {/* 스크랩북 */}
        <div className="flex flex-col gap-3 pt-4 pb-6">
          <div className="flex justify-between px-5" onClick={goScrap}>
            <h1>스크랩북({myData?.scrap_count ?? 0})</h1>
            <button className="p-2">
              <img src="/icons/icon-chevronright.svg" alt="chevron-right" />
            </button>
          </div>
          {(myData?.recent_scraps?.length ?? 0) > 0 ? (
            <div className="scrollbar-hide flex gap-1.5 overflow-x-auto px-5 whitespace-nowrap">
              {myData.recent_scraps.map((scrap) => (
                <ImageCard
                  key={scrap.id}
                  name={scrap.name}
                  thumbnail={scrap.thumbnail}
                  onClick={() => goScrapDetail(scrap.target_id)}
                />
              ))}
            </div>
          ) : (
            <div className="w-ful flex justify-center px-5 py-10 text-base font-normal text-zinc-300">
              아직 스크랩한 내용이 없어요.
            </div>
          )}
        </div>
        {/* 내 부스/공연 관리 */}
        {myData?.managed_booths?.length > 0 || myData?.managed_shows?.length > 0 ? (
          <div className="flex flex-col gap-3 px-5 py-4">
            <h1>내 부스/공연 관리</h1>
            {/* 부스 관리 리스트 */}
            {myData.managed_booths?.map((booth) => (
              <button
                onClick={() => goBoothManage(booth.id)}
                key={booth.id}
                className="flex flex-col items-start gap-1 rounded-lg bg-zinc-100 p-5"
              >
                <h2 className="font-semibold">{booth.name}</h2>
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-normal text-zinc-500">스크랩 수</p>
                  <p className="text-base">{booth.scrap_count}회</p>
                </div>
              </button>
            ))}
            {/* 공연 관리 리스트 */}
            {myData.managed_shows?.map((show) => (
              <button
                onClick={() => goShowManage(show.id)}
                key={show.id}
                className="flex flex-col items-start gap-1 rounded-lg bg-zinc-100 p-5"
              >
                <h2 className="font-semibold">{show.name}</h2>
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-normal text-zinc-500">스크랩 수</p>
                  <p className="text-base">{show.scrap_count}회</p>
                </div>
              </button>
            ))}
          </div>
        ) : null}
        {/* 관리자 인증 */}
        <div className="flex items-center justify-between px-5 py-6">
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-normal text-zinc-500">부스/공연 관리자이신가요?</p>
            <h1>관리자 인증하기</h1>
          </div>
          <button className="p-2" onClick={goAdminConfirm}>
            <img src="/icons/icon-chevronright.svg" alt="chevron-right" />
          </button>
        </div>
        {/* 축준위 문의 버튼 */}
        <div className="mt-28 mb-14.5 flex justify-center">
          <Button
            variant="bg-white"
            circle
            shadow
            leftIcon="/icons/logo-kakaotalk.svg"
            iconAlt="kakaotalk"
            onClick={goFestivalKakaotalk}
          >
            축제준비위원회에게 문의하기
          </Button>
        </div>
      </div>
    </>
  );
};

export default MyPage;
