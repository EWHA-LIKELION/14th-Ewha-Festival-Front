/**
 * 내 프로필 조회 hook
 */

import { useQuery } from '@tanstack/react-query';
import { MeAPI } from '@/apis';
import useAuthStore from '@/store/useAuthStore';

export const useMyProfile = () => {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  return useQuery({
    queryKey: ['myProfile'],
    queryFn: MeAPI.getMyProfile,
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 5, // 5분
  });
};
