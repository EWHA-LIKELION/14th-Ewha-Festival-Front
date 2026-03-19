/**
 * 부스 수정 페이지
 */

import React, { useState } from 'react';
import Header from '@/components/Header';
import { ThumbnailImageUploader, DetailImageUploader } from '@/components/FileUploader';
import Input from '@/components/Input/Input';
import Checkbox from '@/components/Checkbox';
import Chip from '@/components/Chip';
import { AdminAccordion } from '@/components/Accordion';
import Divider from '@/components/Divider';
import TextArea from '@/components/Input/TextArea';
import Timepicker from '@/components/Timepicker';
import Button from '@/components/Button';
import Scrim from '@/components/Scrim';
import Alert from '@/components/Alert';

const BoothEditPage = () => {
  const [modal, setModal] = useState({ isOpen: false, variant: null, title: '', text: '' });

  return (
    <>
      <Header left="back" right="save" />
      <ThumbnailImageUploader onRemove={(clearImage) => handleClickRemove(clearImage)} />

      <div className="flex w-full flex-col items-center gap-6 px-5 pt-5 pb-6">
        {/* 부스명 */}
        <div className="flex w-full flex-col items-start gap-3">
          <div className="flex items-center gap-1">
            <h2 className="text-base leading-6 font-semibold tracking-normal text-zinc-800">
              부스명
            </h2>
            <p className="text-xs leading-4 font-normal tracking-normal text-emerald-600">*필수</p>
          </div>
          <Input variant="square" placeholder="부스명을 입력해주세요" maxLength="20" />
        </div>

        {/* 카테고리 */}
        <div className="flex w-full flex-col items-start gap-3">
          <div className="flex items-center gap-1">
            <h2 className="text-base leading-6 font-semibold tracking-normal text-zinc-800">
              카테고리
            </h2>
            <p className="text-xs leading-4 font-normal tracking-normal text-emerald-600">*필수</p>
          </div>
          <div className="flex items-center gap-4">
            <Checkbox label="음식" />
            <Checkbox label="굿즈" />
            <Checkbox label="체험" />
          </div>
        </div>

        {/* 운영 여부 */}
        <div className="flex w-full flex-col items-start gap-3">
          <div className="flex items-center gap-1">
            <h2 className="text-base leading-6 font-semibold tracking-normal text-zinc-800">
              운영 여부
            </h2>
            <p className="text-xs leading-4 font-normal tracking-normal text-emerald-600">*필수</p>
          </div>
          <div className="flex items-center gap-4">
            <Chip variant="state" isSelected />
            <Chip variant="state" />
          </div>
        </div>
      </div>

      {/* 정보 수정하기 */}
      <div className="flex w-full flex-col pb-36">
        <AdminAccordion title="정보 수정하기">
          <div>
            <Divider />
            {/* 소개글 */}
            <div className="flex w-full flex-col items-start gap-6 self-stretch bg-zinc-50 px-5 py-6">
              <div className="flex w-full flex-col items-stretch self-stretch">
                <TextArea
                  size="large"
                  label="소개글"
                  placeholder="소개글을 입력해주세요"
                  maxLength="100"
                />
              </div>

              {/* 운영 시간 */}
              <div className="flex w-full flex-col items-start gap-3">
                <div className="flex items-center gap-1">
                  <h2 className="text-base leading-6 font-semibold tracking-normal text-zinc-800">
                    운영 시간
                  </h2>
                  <p className="text-xs leading-4 font-normal tracking-normal text-emerald-600">
                    *필수
                  </p>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <div className="flex items-center gap-7">
                    <Checkbox label="수요일" />
                    <Timepicker />
                  </div>
                  <div className="flex items-center gap-7">
                    <Checkbox label="목요일" />
                    <Timepicker />
                  </div>
                  <div className="flex items-center gap-7">
                    <Checkbox label="금요일" />
                    <Timepicker />
                  </div>
                </div>
              </div>

              {/* 위치 로드뷰 */}
              <div className="flex w-full flex-col items-start gap-3 self-stretch">
                <h2 className="text-base leading-6 font-semibold tracking-normal text-zinc-800">
                  위치 로드뷰
                </h2>
                <DetailImageUploader />
              </div>

              {/* 위치 상세설명 */}
              <div className="flex w-full flex-col items-start gap-3 self-stretch">
                <h2 className="text-base leading-6 font-semibold tracking-normal text-zinc-800">
                  위치 상세설명
                </h2>
                <Input
                  variant="square_white"
                  placeholder="학문관 지하예요/이마트24 오른쪽에 있어요"
                  maxLength="50"
                />
              </div>

              {/* sns */}
              <div className="flex w-full flex-col items-start gap-3 self-stretch">
                <h2 className="text-base leading-6 font-semibold tracking-normal text-zinc-800">
                  SNS
                </h2>
                <div className="flex items-center gap-3 self-stretch">
                  <img src="/icons/logo-instagramcolor.svg" className="rounded-md" />
                  <Input variant="square_white" placeholder="https://인스타그램" />
                </div>
                <div className="flex items-center gap-3 self-stretch">
                  <img src="/icons/logo-kakaotalkcolor.svg" className="rounded-md" />
                  <Input variant="square_white" placeholder="https://카카오톡" />
                </div>
              </div>
            </div>
          </div>
        </AdminAccordion>
        <Divider />
        <AdminAccordion title="공지 수정하기">
          <div>
            <Divider />

            <div className="flex w-full flex-col gap-10 self-stretch bg-zinc-50 px-5 py-6">
              {/* 추가 버튼 */}
              <Button sizeType="large" className="text-sm">
                <img src="/icons/icon-addimage-white.svg" />
              </Button>

              {/* edit set */}
              <div className="flex w-full flex-col items-start gap-3">
                <div className="flex items-start gap-2 self-stretch">
                  <h2 className="w-7 text-sm leading-5 font-semibold tracking-normal text-zinc-800">
                    제목
                  </h2>
                  <Input variant="square_white" placeholder="제목을 입력해주세요" maxLength="40" />
                </div>
                <div className="flex w-full items-start gap-2 self-stretch">
                  <TextArea
                    labelPosition="left"
                    label="내용"
                    placeholder="내용을 입력해주세요"
                    maxLength="150"
                  />
                </div>
                <div className="flex items-end justify-between self-stretch">
                  <div className="flex items-start gap-2">
                    <h2 className="w-7 text-sm leading-5 font-semibold tracking-normal text-zinc-800">
                      사진
                    </h2>
                    <DetailImageUploader />
                  </div>
                  <Button variant="bg-pink" size="sm" circle="true">
                    삭제
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AdminAccordion>
        <Divider />
        <AdminAccordion title="리스트 수정하기">
          <div>
            <Divider />
            <div className="flex flex-col gap-10 self-stretch bg-zinc-50 px-5 py-6">
              {/* 추가 버튼 */}
              <Button sizeType="large" className="text-sm">
                <img src="/icons/icon-addimage-white.svg" />
              </Button>

              {/* edit set */}
              <div className="flex w-full flex-col items-start gap-3">
                {/* 상태 */}
                <div className="flex items-center gap-1 self-stretch pb-5.5">
                  <h3 className="flex items-start pr-2 text-sm leading-5 font-semibold tracking-normal text-zinc-800">
                    상태
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <Chip variant="state" isSelected />
                    <Chip variant="state" />
                  </div>
                </div>

                {/* 이름 */}
                <div className="flex w-full items-start self-stretch">
                  <h3 className="flex w-9 items-start pr-2 text-sm leading-5 font-semibold tracking-normal text-zinc-800">
                    이름
                  </h3>
                  <Input variant="square_white" placeholder="이름을 입력해주세요" maxLength="15" />
                </div>

                {/* 설명 */}
                <TextArea
                  label="설명"
                  labelPosition="left"
                  placeholder="설명을 입력해주세요"
                  maxLength="45"
                />

                {/* 가격 */}
                <div className="flex w-full items-start self-stretch pb-5.5">
                  <h3 className="flex w-9 items-start pr-2 text-sm leading-5 font-semibold tracking-normal text-zinc-800">
                    가격
                  </h3>
                  <Input variant="square_white" placeholder="가격을 입력해주세요" />
                </div>

                {/* 사진 */}
                <div className="flex w-full items-end justify-between self-stretch">
                  <div className="flex items-start">
                    <h2 className="flex w-9 pr-2 text-sm leading-5 font-semibold tracking-normal text-zinc-800">
                      사진
                    </h2>
                    <DetailImageUploader />
                  </div>
                  <Button variant="bg-pink" size="sm" circle="true">
                    삭제
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AdminAccordion>

        {showModal}
      </div>
    </>
  );
};

export default BoothEditPage;
