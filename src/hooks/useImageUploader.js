import { useState, useEffect } from 'react';
import useImageCompression from './useImageCompression.js';
import useToastStore from '@/store/useToastStore';

const isBlobUrl = (url) => url?.startsWith('blob:');

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const useImageUploader = (initialImage = null) => {
  const [image, setImage] = useState(initialImage);
  const [file, setFile] = useState(null); // 원본 파일 추가
  const [isDeleted, setIsDeleted] = useState(false);
  const { compress, isCompressing } = useImageCompression();
  const showToast = useToastStore((s) => s.showToast);

  useEffect(() => {
    if (file || isDeleted) return;

    setImage(initialImage);
  }, [initialImage, file, isDeleted]);

  const onSelectFile = async (selectedFile) => {
    if (!selectedFile) return;

    if (selectedFile.size > MAX_FILE_SIZE) {
      showToast('이미지는 최대 10MB까지 업로드할 수 있어요.', 'warn');
      return;
    }

    // 미리보기는 원본으로 즉시 표시
    const url = URL.createObjectURL(selectedFile);

    setImage((prev) => {
      if (isBlobUrl(prev)) URL.revokeObjectURL(prev);
      return url;
    });

    // 업로드용 파일은 압축본으로 저장
    // (isDeleted 해제는 압축 완료 후 file 과 함께 처리 — 비동기 도중 미리보기가 초기화되는 것 방지)
    const compressedFile = await compress(selectedFile);
    setFile(compressedFile);
    setIsDeleted(false);
  };

  const clearImage = () => {
    setImage((prev) => {
      if (isBlobUrl(prev)) URL.revokeObjectURL(prev);
      return null;
    });
    setFile(null);
    setIsDeleted(true);
  };

  useEffect(() => {
    return () => {
      if (isBlobUrl(image)) URL.revokeObjectURL(image);
    };
  }, [image]);

  return { image, file, isDeleted, isCompressing, onSelectFile, clearImage }; // file 추가
};

export default useImageUploader;
