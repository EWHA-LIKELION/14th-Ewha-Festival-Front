/**
 * 부스 상세 조회 hook
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useToastStore from '@/store/useToastStore';
import { BoothAPI } from '@/apis';
import { getErrorMessage } from '@/utils/errorHelper';

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

export const useUpdateBooth = (id, resourceVersion) => {
  const navigate = useNavigate();
  const showToast = useToastStore((s) => s.showToast);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => BoothAPI.updateBooth(id, formData, resourceVersion),
    onSuccess: async () => {
      // 다른 페이지들이 사용하는 react-query 캐시 무효화 → 진입 시 최신 데이터로 refetch
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['booth', id] }),
        queryClient.invalidateQueries({ queryKey: ['notices', id] }),
        queryClient.invalidateQueries({ queryKey: ['myProfile'] }),
      ]);

      showToast('성공적으로 수정되었어요.');
      navigate(`/admin/booth/${id}`, { replace: true });
    },
    onError: (err) => {
      console.error('저장 실패:', err);
      showToast(getErrorMessage(err) || '수정 중 오류가 발생했습니다.', 'warn');
    },
  });
};
