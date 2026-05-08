/**
 * 공연 상세 조회 hook
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useToastStore from '@/store/useToastStore';
import { ShowAPI } from '@/apis';

export const useShowDetail = (id) => {
  return useQuery({
    queryKey: ['show', id],
    queryFn: () => ShowAPI.getShowById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5분
    select: (data) => ({ ...data, is_scrapped: data.is_scraped }),
  });
};

export const useShowNotices = (id) => {
  return useQuery({
    queryKey: ['notices', id],
    queryFn: () => ShowAPI.getShowNotices(id),
    enabled: !!id,
  });
};

export const useUpdateShow = (id, resourceVersion) => {
  const navigate = useNavigate();
  const showToast = useToastStore((s) => s.showToast);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => ShowAPI.updateShow(id, formData, resourceVersion),
    onSuccess: async () => {
      // 다른 페이지들이 사용하는 react-query 캐시 무효화 → 진입 시 최신 데이터로 refetch
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['show', id] }),
        queryClient.invalidateQueries({ queryKey: ['notices', id] }),
        queryClient.invalidateQueries({ queryKey: ['myProfile'] }),
      ]);

      showToast('성공적으로 수정되었어요.');
      navigate(`/admin/show/${id}`, { replace: true });
    },
    onError: (err) => {
      console.error('저장 실패:', err);

      if (err.response?.status === 409) {
        showToast('데이터가 변경되었습니다. 새로고침 후 다시 시도해주세요.', 'warn');
      } else {
        showToast('수정 중 오류가 발생했습니다.', 'warn');
      }
    },
  });
};
