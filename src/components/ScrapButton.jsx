/**
 * ScrapButton 컴포넌트 (TanStack Query useMutation 사용)
 * Booth와 Show 모두 지원
 */

import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthStore from '@/store/useAuthStore';
import { BoothAPI, ShowAPI } from '@/apis';

const ScrapButton = ({
  id,
  type = 'booth', // 'booth' | 'show'
  initialScrapped = false,
  count = 0,
  onToggle,
}) => {
  const [isScrapped, setIsScrapped] = useState(initialScrapped);
  const [scrapCount, setScrapCount] = useState(count);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const openLoginSheet = useAuthStore((s) => s.openLoginSheet);
  const queryClient = useQueryClient();

  // props 변경 시 state 동기화 (새로고침 시 최신 데이터 반영)
  useEffect(() => {
    setIsScrapped(initialScrapped);
  }, [initialScrapped]);

  useEffect(() => {
    setScrapCount(count);
  }, [count]);

  const formatCount = (num) => {
    if (!num) return '00';
    return String(num).padStart(2, '0');
  };

  // type에 따라 적절한 API 호출
  const getToggleFunction = () => {
    switch (type) {
      case 'show':
        return () => ShowAPI.toggleShowScrap(id);
      case 'booth':
      default:
        return () => BoothAPI.toggleBoothScrap(id);
    }
  };

  const scrapQueryKey = type === 'show' ? ['myScrapShows'] : ['myScrapBooths'];
  const listQueryKey = type === 'show' ? ['shows'] : ['booths'];

  // TanStack Query useMutation으로 스크랩 토글
  const mutation = useMutation({
    mutationFn: getToggleFunction(),

    // 낙관적 업데이트: API 호출 전 즉시 UI 변경
    onMutate: async () => {
      const previousScrapped = isScrapped;
      const previousCount = scrapCount;

      // UI 즉시 업데이트
      setIsScrapped(!isScrapped);
      setScrapCount((prev) => (!isScrapped ? prev + 1 : Math.max(0, prev - 1)));

      // 스크랩 취소 시: 스크랩 목록 캐시에서 즉시 제거
      if (isScrapped) {
        await queryClient.cancelQueries({ queryKey: scrapQueryKey });
        const previousScrapData = queryClient.getQueryData(scrapQueryKey);

        queryClient.setQueryData(scrapQueryKey, (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              result: page.result.filter((item) => item.id !== id),
            })),
          };
        });

        return { previousScrapped, previousCount, previousScrapData };
      }

      return { previousScrapped, previousCount };
    },

    // 성공 시: 서버와 동기화
    onSuccess: (_data, _variables, context) => {
      queryClient.invalidateQueries({ queryKey: listQueryKey });
      queryClient.invalidateQueries({ queryKey: scrapQueryKey });
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });

      if (onToggle) onToggle(!context.previousScrapped);
    },

    // 실패 시 롤백
    onError: (error, _variables, context) => {
      console.error('❌ [ScrapButton] Toggle failed:', error);

      if (context) {
        setIsScrapped(context.previousScrapped);
        setScrapCount(context.previousCount);

        // 스크랩 목록 캐시도 복원
        if (context.previousScrapData) {
          queryClient.setQueryData(scrapQueryKey, context.previousScrapData);
        }
      }
    },
  });

  const handleClick = (e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      openLoginSheet();
      return;
    }

    if (mutation.isPending) return; // 로딩 중 중복 클릭 방지

    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      disabled={mutation.isPending}
      className="flex cursor-pointer flex-col items-center"
    >
      {/* 상태에 따라 아이콘 변경 */}
      <img
        src={isScrapped ? '/icons/icon-scrap-active.svg' : '/icons/icon-scrap.svg'}
        alt="scrap"
        className={mutation.isPending ? 'opacity-50' : ''}
      />

      {/* 숫자도 상태 반영 */}
      <p
        className={`text-xs leading-4 ${isScrapped ? 'text-emerald-600' : 'text-zinc-300'} ${mutation.isPending ? 'opacity-50' : ''}`}
      >
        {formatCount(scrapCount)}
      </p>
    </button>
  );
};

export default ScrapButton;
