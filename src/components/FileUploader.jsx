/**
 * FileUploader 컴포넌트 ( variant: thumbnail, detail)
 */

import { useRef } from 'react';
import IconButton from '@/components/IconButton';
import { useImageUploader } from '@/hooks';

/* 상세 이미지 */
export const DetailImageUploader = ({ initialImage, onRemove }) => {
  const { image, onSelectFile, clearImage } = useImageUploader(initialImage);
  const inputRef = useRef(null);

  return (
    <div className="relative w-15">
      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => {
          onSelectFile(e.target.files[0]);
          e.target.value = '';
        }}
      />

      {/* 고정 영역 */}
      <div
        className="aspect-square w-15 overflow-hidden rounded-lg border border-gray-100 bg-white"
        onClick={() => {
          if (!image) {
            inputRef.current?.click();
          }
        }}
      >
        {image ? (
          <img src={image} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <img src="/icons/icon-addimage.svg" />
          </div>
        )}
      </div>

      {/* 삭제 버튼 */}
      {image && (
        <div
          className="absolute top-0.5 right-1"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.(clearImage);
          }}
        >
          <IconButton name="xmarkgrey" size={16} />
        </div>
      )}
    </div>
  );
};

/* 썸네일 이미지 */
export const ThumbnailImageUploader = ({ initialImage, onRemove }) => {
  const { image, onSelectFile, clearImage } = useImageUploader(initialImage);
  const inputRef = useRef(null);

  return (
    <div className="relative h-62.5 w-89.5">
      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => {
          onSelectFile(e.target.files[0]);
          e.target.value = '';
        }}
      />

      <img
        src={image || '/images/default-image-large.png'}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* 버튼 영역 (아래 텍스트 버튼) */}
      <div className="absolute bottom-0 flex h-12 w-full cursor-pointer items-center justify-center bg-black/50">
        {!image ? (
          <button
            onClick={() => inputRef.current?.click()}
            className="text-center text-base leading-5 font-semibold tracking-normal text-white"
          >
            사진 업로드
          </button>
        ) : (
          <button
            onClick={() => onRemove?.(clearImage)}
            className="text-center text-base leading-6 font-semibold tracking-normal text-white"
          >
            사진 삭제
          </button>
        )}
      </div>
    </div>
  );
};
