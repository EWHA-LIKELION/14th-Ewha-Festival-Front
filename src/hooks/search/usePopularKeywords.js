import { useQuery } from '@tanstack/react-query';
import { SearchAPI } from '@/apis';

export const usePopularKeywords = () => {
  return useQuery({
    queryKey: ['popularKeywords'],
    queryFn: SearchAPI.getPopularKeywords,
    staleTime: 1000 * 60 * 30, // 30분
  });
};
