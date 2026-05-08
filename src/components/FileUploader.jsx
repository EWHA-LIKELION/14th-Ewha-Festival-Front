/**
 * FileUploader 컴포넌트 ( variant: thumbnail, detail)
 */

import { useEffect, useRef, useState } from 'react';
import { useImageUploader } from '@/hooks';

const useImagePreview = (image) => {
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (!image) {
      setPreviewUrl('');
      return;
    }
    if (typeof image === 'string') {
      setPreviewUrl(image);
      return;
    }
    const url = URL.createObjectURL(image);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  return previewUrl;
};

export const DetailImageUploader = ({ image, onChange, onRemove }) => {
  const inputRef = useRef(null);
  const previewUrl = useImagePreview(image);

  return (
    <div className="relative w-15">
      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => {
          onChange?.(e.target.files[0]);
          e.target.value = '';
        }}
      />
      <div
        className="aspect-square w-15 overflow-hidden rounded-lg border border-zinc-100 bg-white"
        onClick={() => {
          if (!image) inputRef.current?.click();
        }}
      >
        {image ? (
          <img src={previewUrl} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <img src="/icons/icon-addimage.svg" />
          </div>
        )}
      </div>
      {image && (
        <button
          className="absolute top-1 right-1 p-0.5"
          onClick={() => {
            onRemove?.();
            onChange?.(null);
          }}
        >
          <img src="/icons/icon-xmarkblack.svg" alt="삭제" width="16" height="16" />
        </button>
      )}
    </div>
  );
};

export const ThumbnailImageUploader = ({ image, onChange, onRemove }) => {
  const inputRef = useRef(null);
  const previewUrl = useImagePreview(image);

  return (
    <div className="relative h-62.5 w-full">
      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => {
          onChange?.(e.target.files[0]);
          e.target.value = '';
        }}
      />
      <img
        src={previewUrl || '/images/default-image-large.png'}
        className="absolute inset-0 h-full w-full object-cover"
      />
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
            onClick={() => {
              onRemove?.();
              onChange?.(null);
            }}
            className="text-center text-base leading-6 font-semibold tracking-normal text-white"
          >
            사진 삭제
          </button>
        )}
      </div>
    </div>
  );
};
