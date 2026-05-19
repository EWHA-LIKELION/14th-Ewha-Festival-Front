import { useEffect } from 'react';
import useHomeModalStore from '@/store/useHomeModalStore';

const useHomeModal = () => {
  const { showHomeModal, initializeHomeModal, closeHomeModal } = useHomeModalStore();

  useEffect(() => {
    initializeHomeModal();
  }, []);

  return {
    showHomeModal,
    closeHomeModal,
  };
};

export default useHomeModal;
