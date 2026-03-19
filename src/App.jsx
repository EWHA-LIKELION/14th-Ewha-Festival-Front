import { Routes, Route } from 'react-router-dom';

// 레이아웃
import NavigationBarLayout from '@/layouts/NavigationBarLayout';

// 전역 상태 관리
import LoginSheet from '@/features/LoginSheet';
import useAuthStore from '@/store/useAuthStore';
import { ToastManager } from '@/components/Toast';
import useToastStore from '@/store/useToastStore';

// 홈 & 기타 페이지
import SearchPage from '@/pages/SearchPage';
import NoticePage from '@/pages/NoticePage';

// 마이
import MyPage from '@/pages/my/MyPage';

// 지도
import MapPage from '@/pages/MapPage';
import BoothListSheet from '@/features/booth/BoothListSheet';
import TrashSheet from '@/features/TrashSheet';
import BarrierFreeSheet from '@/features/BarrierFreeSheet';

// 컴포넌트 프리뷰
import ComponentPreview from '@/components/ComponentPreview';

// 관리자
import AdminConfirmPage from '@/pages/admin/AdminConfirmPage';
import MyBoothPage from '@/pages/admin/MyBoothPage';
import MyShowPage from '@/pages/admin/MyShowPage';

function App() {
  const showLoginSheet = useAuthStore((s) => s.showLoginSheet);
  const { text, isOpen, closeToast } = useToastStore();

  return (
    <main className="app">
      <Routes>
        <Route element={<NavigationBarLayout />}>
          {/* 홈 */}
          <Route path="/" element={<div className="h-300 bg-zinc-500">Home</div>} />
          <Route path="credit" element={<div>Credit</div>} />
          <Route path="notice" element={<div>Notice</div>} />
          <Route path="search" element={<SearchPage />} />

          {/* 마이 */}
          <Route path="my" element={<MyPage />} />
          <Route path="my/scrap" element={<div>Scrap</div>} />

          {/* 지도 */}
          <Route path="map" element={<MapPage />}>
            <Route path="booths" element={<BoothListSheet />} />
            <Route path="booths/:id" element={<div>BoothDetailSheet</div>} />
            <Route path="booths/:id/notice" element={<NoticePage />} />
            <Route path="shows" element={<div>ShowListSheet</div>} />
            <Route path="shows/:id" element={<div>ShowDetailSheet</div>} />
            <Route path="shows/:id/notice" element={<NoticePage />} />
            <Route path="trash" element={<TrashSheet />} />
            <Route path="barrierfree" element={<BarrierFreeSheet />} />
          </Route>

          {/* 🔥 추후 공통컴포넌트 라우트는 삭제 */}
          <Route path="component-preview" element={<ComponentPreview />} />
        </Route>

        <Route path="admin">
          <Route path="confirm" element={<AdminConfirmPage />} />
          <Route path="booth/:id" element={<MyBoothPage />} />
          <Route path="booth/:id/edit" element={<div>Booth Edit</div>} />
          <Route path="booth/:id/notice" element={<NoticePage />} />
          <Route path="show/:id" element={<MyShowPage />} />
          <Route path="show/:id/edit" element={<div>Show Edit</div>} />
          <Route path="show/:id/notice" element={<NoticePage />} />
        </Route>
      </Routes>

      {/* ⚙️ 전역 상태 관리 */}
      {/* 로그인 바텀시트 */}
      {showLoginSheet && <LoginSheet />}
      {/* 토스트 */}
      <ToastManager text={text} isOpen={isOpen} onClose={closeToast} />
    </main>
  );
}

export default App;
