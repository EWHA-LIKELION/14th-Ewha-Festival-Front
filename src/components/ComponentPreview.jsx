/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import React, { useState } from 'react';
import Footer from '@/components/Footer';
import { ThumbnailImageUploader, DetailImageUploader } from './FileUploader';
import Alert from '@/components/Alert';

const ComponentPreview = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [onConfirmAction, setOnConfirmAction] = useState(null);

  const handleClickRemove = (removeFn) => {
    setOnConfirmAction(() => removeFn); // clearImage 저장
    setIsAlertOpen(true);
  };

  const handleConfirmRemove = () => {
    onConfirmAction?.(); // ⭐ 여기서 clearImage 실행
    setIsAlertOpen(false);
    setOnConfirmAction(null);
  };

  return (
    <>
      <div>ComponentPreview</div>

      <ThumbnailImageUploader onRemove={(clearImage) => handleClickRemove(clearImage)} />

      <DetailImageUploader onRemove={(clearImage) => handleClickRemove(clearImage)} />

      <Footer />

      {isAlertOpen && (
        <Alert
          title="사진"
          text="삭제한 사진은 복구할 수 없어요."
          onConfirm={handleConfirmRemove}
          onCancel={() => setIsAlertOpen(false)}
        />
      )}
    </>
  );
};

export default ComponentPreview;
