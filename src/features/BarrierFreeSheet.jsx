/**
 * 베리어프리 바텀시트
 */

import { useEffect } from 'react';
import BottomsheetDrag from '@/components/BottomsheetDrag';
import useBottomsheetStore from '@/store/useBottomsheetStore';
import Header from '@/components/Header';

const BarrierFreeSheet = () => {
  const isFull = useBottomsheetStore((s) => s.isFull());
  const setSheetSize = useBottomsheetStore((s) => s.setSheetSize);

  useEffect(() => {
    setSheetSize('medium');
  }, [setSheetSize]);

  return (
    <>
      <div className={isFull ? 'relative z-10' : 'relative z-20'}>
        <Header left="back" background="transparent" />
      </div>
      <BottomsheetDrag>
        {isFull && <Header left="back" center="title" centerTitle="배리어프리" isSheet />}
        <div className="flex flex-col gap-10 p-5">
          <div className="flex flex-col gap-1">
            <h1 className="text-base font-semibold">이용 대상</h1>
            <p className="py-1 text-sm font-normal">
              기존 관객석에 앉기 어렵거나 지원 서비스가 필요한 이화여자대학교 학부
              재적생(재학생/휴학생)
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-base font-semibold">사전 신청 안내</h1>
            <p className="py-1 text-sm font-normal">
              ･ 동반 1인까지 신청 가능
              <br />･ 동반인 포함 선착순 20명
              <br />
              <br />･ 사전 신청 기간: 5월 7일(수) 12:00 - 5월 8일(금) 18:00
              <br />
              <br />･ 사전 신청 과정에서 배리어프리존 악용 사례를 방지하고 원활한 운영을 위해, 실물
              장애복지카드 촬영본, 병원 진단서(원본 혹은 스캔본) 등의 자료 수합
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-base font-semibold">제공 서비스</h1>
            <p className="py-1 text-sm font-normal">
              ･ 속기 2명(구글 독스 형식으로 실시간 속기 제공)
              <br />･ 테이블 및 의자
              <br />･ 배리어프리존 전담 스태프
            </p>
          </div>
        </div>
      </BottomsheetDrag>
    </>
  );
};

export default BarrierFreeSheet;
