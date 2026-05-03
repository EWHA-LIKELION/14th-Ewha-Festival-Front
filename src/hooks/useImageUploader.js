import { useState, useEffect } from 'react';

const isBlobUrl = (url) => url?.startsWith('blob:');

const useImageUploader = (initialImage = null) => {
  const [image, setImage] = useState(initialImage);
  const [file, setFile] = useState(null); // 원본 파일 추가
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (file || isDeleted) return;

    setImage(initialImage);
  }, [initialImage, file, isDeleted]);

  const onSelectFile = (selectedFile) => {
    if (!selectedFile) return;

    const url = URL.createObjectURL(selectedFile);

    setImage((prev) => {
      if (isBlobUrl(prev)) URL.revokeObjectURL(prev);
      return url;
    });

    setFile(selectedFile); // 파일 저장
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

  return { image, file, isDeleted, onSelectFile, clearImage }; // file 추가
};

export default useImageUploader;
