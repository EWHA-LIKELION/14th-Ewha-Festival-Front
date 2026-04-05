/**
 * 부스/공연 공지 페이지
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAlertStore from '@/store/useAlertStore';
import useLoadingStore from '@/store/useLoadingStore';

import { BoothAPI, ShowAPI } from '@/apis';

import Header from '@/components/Header';
import { Accordion } from '@/components/Accordion';

const NoticePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const openAlert = useAlertStore((s) => s.openAlert);
  const closeAlert = useAlertStore((s) => s.closeAlert);
  const showLoading = useLoadingStore((s) => s.showLoading);
  const hideLoading = useLoadingStore((s) => s.hideLoading);
  const isLoading = useLoadingStore((s) => s.isLoading);

  // ID로 부스/공연 구분
  const isBooth = id?.startsWith('BOOTH_');
  const isShow = id?.startsWith('SHOW_');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        showLoading();
        let data;

        if (isBooth) {
          data = await BoothAPI.getBoothNotices(id);
        } else if (isShow) {
          data = await ShowAPI.getShowNotices(id);
        } else {
          throw new Error('잘못된 ID 형식입니다.');
        }

        setNotices(data);
      } catch (error) {
        console.error('공지 정보를 불러오는데 실패했습니다:', error);
        openAlert({
          variant: 'error',
          title: '오류',
          text: '공지 정보를 불러올 수 없습니다.',
          onConfirm: () => {
            closeAlert();
            navigate(-1);
          },
        });
      } finally {
        hideLoading();
      }
    };

    if (id) {
      fetchNotices();
    }
  }, [id]);

  return (
    <>
      <Header left="back" center="title" centerTitle="공지" />
      <div className="mt-18 flex flex-col gap-4 p-5">
        {notices.length > 0
          ? notices.map((notice) => (
              <Accordion
                key={notice.id}
                title={notice.title}
                time={notice.time_ago}
                isUpdate={notice.is_updated}
                content={notice.content}
              />
            ))
          : !isLoading && (
              <div className="flex justify-center pt-36 text-center text-base font-normal text-zinc-300">
                등록된 공지가 없어요.
              </div>
            )}
      </div>
    </>
  );
};

export default NoticePage;
