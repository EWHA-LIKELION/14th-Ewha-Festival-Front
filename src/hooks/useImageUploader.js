/**
 * FileUploader hooks
 */

import { useState, useEffect } from 'react';

const isBlobUrl = (url) => url?.startsWith('blob:');

/* 공통 hook */
const useImageUploader = (initialImage = null) => {
  const [image, setImage] = useState(initialImage);

  useEffect(() => {
    setImage(initialImage);
  }, [initialImage]);

  const onSelectFile = (file) => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImage((prev) => {
      if (isBlobUrl(prev)) {
        URL.revokeObjectURL(prev);
      }
      return url;
    });
  };

  const clearImage = () => {
    setImage((prev) => {
      if (isBlobUrl(prev)) {
        URL.revokeObjectURL(prev);
      }
      return null;
    });
  };

  useEffect(() => {
    return () => {
      if (isBlobUrl(image)) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  return { image, onSelectFile, clearImage };
};

export default useImageUploader;
