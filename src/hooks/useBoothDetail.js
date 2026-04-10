/**
 * 부스 상세 조회 hook
 */

import { useQuery } from '@tanstack/react-query';
import { BoothAPI } from '@/apis';

export const useBoothDetail = (id) => {
  return useQuery({
    queryKey: ['booth', id],
    queryFn: () => BoothAPI.getBoothById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5분
    select: (data) => ({ ...data, is_scrapped: data.is_scraped }),
  });
};

export const useBoothNotices = (id) => {
  return useQuery({
    queryKey: ['notices', id],
    queryFn: () => BoothAPI.getBoothNotices(id),
    enabled: !!id,
  });
};
