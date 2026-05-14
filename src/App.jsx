import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// 레이아웃
import NavigationBarLayout from '@/layouts/NavigationBarLayout';

// 전역 상태 관리
import useAuthStore from '@/store/useAuthStore';
import LoginSheet from '@/features/LoginSheet';
import useToastStore from '@/store/useToastStore';
import { ToastManager } from '@/components/Toast';
import useAlertStore from '@/store/useAlertStore';
import Alert from '@/components/Alert';
import Scrim from '@/components/Scrim';
import useImageModalStore from '@/store/useImageModalStore';
import ImageModal from '@/components/ImageModal';
import useFilterSheetStore from '@/store/useFilterSheetStore';
import FilterSheet from '@/features/FilterSheet';
import Loading from '@/components/Loading';

// 홈 & 기타 페이지
import HomePage from '@/pages/home/HomePage';
import KakaoRedirect from '@/pages/home/KakaoRedirect';
import CreditPage from '@/pages/home/CreditPage';
import SearchPage from '@/pages/SearchPage';
import NoticePage from '@/pages/NoticePage';

// 마이
import MyPage from '@/pages/my/MyPage';
import ScrapPage from '@/pages/my/ScrapPage';

// 지도
import BoothListSheet from '@/features/booth/BoothListSheet';
import BoothDetailSheet from '@/features/booth/BoothDetailSheet';
import ShowListSheet from '@/features/show/ShowListSheet';
import ShowDetailSheet from '@/features/show/ShowDetailSheet';
import EtcSheet from '@/features/EtcSheet';
import BarrierFreeSheet from '@/features/BarrierFreeSheet';

// 무거운 라우트: 코드 스플리팅 (지도 - react-zoom-pan-pinch / 관리자 페이지)
const MapPage = lazy(() => import('@/pages/map/MapPage'));
const AdminConfirmPage = lazy(() => import('@/pages/admin/AdminConfirmPage'));
const MyBoothPage = lazy(() => import('@/pages/admin/MyBoothPage'));
const MyShowPage = lazy(() => import('@/pages/admin/MyShowPage'));
const BoothEditPage = lazy(() => import('@/pages/admin/BoothEditPage'));
const ShowEditPage = lazy(() => import('@/pages/admin/ShowEditPage'));

function App() {
  const showLoginSheet = useAuthStore((s) => s.showLoginSheet);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const showFilterSheet = useFilterSheetStore((s) => s.isOpen);
  const { type, text, isOpen, closeToast } = useToastStore();
  const { alert, closeAlert } = useAlertStore();
  const { image: modalImage, closeImageModal } = useImageModalStore();

  return (
    <main className="app">
      <Suspense fallback={null}>
        <Routes>
          {/* 네비게이션바 X */}
          <Route path="search" element={<SearchPage />} />

          {/* 네비게이션바 O */}
          <Route element={<NavigationBarLayout />}>
            {/* 홈 */}
            <Route path="/" element={<HomePage />} />
            <Route path="/kakao-redirect" element={<KakaoRedirect />} />
            <Route path="credit" element={<CreditPage />} />

            {/* 마이 */}
            <Route path="my" element={<MyPage />} />
            <Route
              path="my/scrap"
              element={isLoggedIn ? <ScrapPage /> : <Navigate to="/my" replace />}
            />

            {/* 지도 */}
            <Route path="map" element={<MapPage />}>
              <Route path="booths" element={<BoothListSheet />} />
              <Route path="booths/:id" element={<BoothDetailSheet />} />
              <Route path="shows" element={<ShowListSheet />} />
              <Route path="shows/:id" element={<ShowDetailSheet />} />
              <Route path="etc" element={<EtcSheet />} />
              <Route path="barrierfree" element={<BarrierFreeSheet />} />
            </Route>

            <Route path="map/booths/:id/notice" element={<NoticePage />} />
            <Route path="map/shows/:id/notice" element={<NoticePage />} />
          </Route>

          <Route path="admin" element={isLoggedIn ? <Outlet /> : <Navigate to="/my" replace />}>
            <Route path="confirm" element={<AdminConfirmPage />} />
            <Route path="booth/:id" element={<MyBoothPage />} />
            <Route path="booth/:id/edit" element={<BoothEditPage />} />
            <Route path="booth/:id/notice" element={<NoticePage />} />
            <Route path="show/:id" element={<MyShowPage />} />
            <Route path="show/:id/edit" element={<ShowEditPage />} />
            <Route path="show/:id/notice" element={<NoticePage />} />
          </Route>
        </Routes>
      </Suspense>

      {/* ⚙️ 전역 상태 관리 */}
      {/* 로딩 */}
      <Loading />

      {/* 로그인 바텀시트 */}
      {showLoginSheet && <LoginSheet />}

      {/* 필터 바텀시트 */}
      {showFilterSheet && <FilterSheet />}

      {/* 토스트 */}
      <ToastManager type={type} text={text} isOpen={isOpen} onClose={closeToast} />

      {/* 이미지 모달 */}
      {modalImage && <ImageModal image={modalImage} onClose={closeImageModal} />}

      {/* Alert */}
      {alert && (
        <>
          <div className="fixed inset-0 z-40">
            <Scrim />
          </div>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <Alert
              variant={alert.variant}
              title={alert.title}
              text={alert.text}
              onCancel={alert.onCancel || closeAlert}
              onConfirm={alert.onConfirm}
            />
          </div>
        </>
      )}
    </main>
  );
}

export default App;
