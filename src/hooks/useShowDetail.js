/**
 * 공연 상세 조회 hook
 */

import { useQuery } from '@tanstack/react-query';
import { ShowAPI } from '@/apis';

export const useShowDetail = (id) => {
  return useQuery({
    queryKey: ['show', id],
    queryFn: () => ShowAPI.getShowById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5분
  });
};

export const useShowNotices = (id) => {
  return useQuery({
    queryKey: ['notices', id],
    queryFn: () => ShowAPI.getShowNotices(id),
    enabled: !!id,
  });
};
