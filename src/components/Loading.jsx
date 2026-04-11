/**
 * 전역 로딩 컴포넌트
 */

import useLoadingStore from '@/store/useLoadingStore';
import LoadingSpinner from '@/components/LoadingSpinner';

const GlobalLoading = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="reactive-width mx-auto flex h-full items-center justify-center overflow-hidden">
        <LoadingSpinner />
      </div>
    </div>
  );
};

export default GlobalLoading;
