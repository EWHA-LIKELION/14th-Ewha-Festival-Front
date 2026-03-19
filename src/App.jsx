import { Routes, Route } from 'react-router-dom';
import NavigationBarLayout from '@/layouts/NavigationBarLayout';
import { ToastManager } from '@/components/Toast';
import useToastStore from '@/store/useToastStore';
import ComponentPreview from '@/components/ComponentPreview';
import LoginSheet from '@/features/LoginSheet';
import useAuthStore from '@/store/useAuthStore';
import MyPage from '@/pages/my/MyPage';
import BoothEditPage from '@/pages/admin/BoothEditPage';
import MyBoothPage from '@/pages/admin/MyBoothPage';
import AdminConfirmPage from '@/pages/admin/AdminConfirmPage';
import MyShowPage from '@/pages/admin/MyShowPage';
import SearchPage from '@/pages/SearchPage';
import BarrierFreeSheet from '@/features/BarrierFreeSheet';
import TrashSheet from '@/features/TrashSheet';
import MapPage from '@/pages/MapPage';

function App() {
  const showLoginSheet = useAuthStore((s) => s.showLoginSheet);
  const { text, isOpen, closeToast } = useToastStore();

  return (
    <main className="app">
      <Routes>
        <Route element={<NavigationBarLayout />}>
          {/* 홈 */}
          <Route path="/" element={<div className="h-300 bg-zinc-500">Home</div>} />

          {/* 마이 */}
          <Route path="my" element={<MyPage />} />
          <Route path="my/scrap" element={<div>Scrap</div>} />

          {/* 지도 */}
          <Route path="map" element={<MapPage />}>
            <Route path="booths" element={<div>BoothListSheet</div>} />
            <Route path="booths/:id" element={<div>BoothDetailSheet</div>} />
            <Route path="shows" element={<div>ShowListSheet</div>} />
            <Route path="shows/:id" element={<div>ShowDetailSheet</div>} />
            <Route path="trash" element={<TrashSheet />} />
            <Route path="barrierfree" element={<BarrierFreeSheet />} />
          </Route>

          {/* 공통 컴포넌트 퍼블리싱 기간이 끝나면 아래 라우트는 삭제 */}
          <Route path="component-preview" element={<ComponentPreview />} />
        </Route>

        <Route path="credit" element={<div>Credit</div>} />
        <Route path="introduction" element={<div>Introduction</div>} />
        <Route path="notice" element={<div>Notice</div>} />

        <Route path="search" element={<SearchPage />} />
        <Route path="admin">
          <Route path="confirm" element={<div>Confirm</div>} />
          <Route path="booth/:id" element={<MyBoothPage />} />
          <Route path="confirm" element={<AdminConfirmPage />} />
          <Route path="booth/:id" element={<div>My Booth</div>} />
          <Route path="booth/:id/edit" element={<BoothEditPage />} />
          <Route path="show/:id" element={<MyShowPage />} />
          <Route path="show/:id/edit" element={<div>Show Edit</div>} />
        </Route>
      </Routes>

      {/* 로그인 바텀시트 — 전역에서 openLoginSheet()으로 호출 */}
      {showLoginSheet && <LoginSheet />}
      {/* 토스트 */}
      <ToastManager text={text} isOpen={isOpen} onClose={closeToast} />
    </main>
  );
}

export default App;
