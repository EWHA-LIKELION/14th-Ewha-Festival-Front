/**
 * 내 프로필 조회 hook
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { MeAPI } from '@/apis';
import useAuthStore from '@/store/useAuthStore';

export const useMyProfile = () => {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isLoggedIn) {
      queryClient.removeQueries({ queryKey: ['myProfile'] });
    }
  }, [isLoggedIn]);

  return useQuery({
    queryKey: ['myProfile'],
    queryFn: MeAPI.getMyProfile,
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 5, // 5분
  });
};
