/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import React from 'react';
import Alert from '@/components/Alert';

const ComponentPreview = () => {
  return (
    <>
      <div>
        <Alert
          variant="delete"
          title="세트리스트"
          text={
            <>
              세트리스트를 삭제할까요? <br />
              삭제한 세트리스트는 복구되지 않아요.
            </>
          }
        />
      </div>
    </>
  );
};

export default ComponentPreview;
