import { useCallback, useState } from 'react';
import imageCompression from 'browser-image-compression';

const DEFAULT_OPTIONS = {
  maxSizeMB: 1, // 최대 1MB로 압축
  maxWidthOrHeight: 1920, // 긴 변 최대 1920px
  useWebWorker: true, // 메인 스레드 블로킹 방지
};

/**
 * 이미지 파일을 업로드 전 클라이언트에서 압축하는 훅
 * - 이미지가 아니거나 압축 실패 시 원본 파일을 그대로 반환
 */
const useImageCompression = () => {
  const [isCompressing, setIsCompressing] = useState(false);

  const compress = useCallback(async (file, options) => {
    if (!file || !file.type?.startsWith('image/')) return file;

    setIsCompressing(true);
    try {
      const compressed = await imageCompression(file, { ...DEFAULT_OPTIONS, ...options });

      // browser-image-compression 은 .name 만 붙인 Blob 을 반환한다.
      // FormData 전송 시 확장자가 보존되도록 원본 파일명을 가진 실제 File 로 다시 감싼다.
      return new File([compressed], file.name, {
        type: compressed.type || file.type,
        lastModified: Date.now(),
      });
    } catch (error) {
      console.error('이미지 압축 실패:', error);
      return file; // 실패 시 원본 사용
    } finally {
      setIsCompressing(false);
    }
  }, []);

  return { compress, isCompressing };
};

export default useImageCompression;
