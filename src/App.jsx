import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationBarLayout from '@/layouts/NavigationBarLayout';
import { ToastManager } from '@/components/Toast';
import useToastStore from '@/store/useToastStore';
import ComponentPreview from '@/components/ComponentPreview';
import LoginSheet from '@/features/LoginSheet';
import useAuthStore from '@/store/useAuthStore';
import MyPage from '@/pages/my/MyPage';
import MyBoothPage from '@/pages/admin/MyBoothPage';
import AdminConfirmPage from '@/pages/admin/AdminConfirmPage';
import SearchPage from '@/pages/SearchPage';
import AdminConfirmPage from '@/pages/admin/AdminConfirmPage';

function App() {
  const showLoginSheet = useAuthStore((s) => s.showLoginSheet);
  const { text, isOpen, closeToast } = useToastStore();

  return (
    <main className="app">
      <Routes>
        <Route element={<NavigationBarLayout />}>
          <Route index element={<div className="h-300 bg-zinc-500">Home</div>} />
          <Route path="my" element={<MyPage />} />
          <Route path="my/scrap" element={<div>Scrap</div>} />
        </Route>
        <Route element={<NavigationBarLayout noPadding />}>
          <Route path="map" element={<div className="h-300 bg-zinc-500">Map</div>} />
          {/* query string: /map?type=부스공연&slot=건물&booth=부스 */}
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
          <Route path="booth/:id/edit" element={<div>Booth Edit</div>} />
          <Route path="show/:id" element={<div>My Show</div>} />
          <Route path="show/:id/edit" element={<div>Show Edit</div>} />
        </Route>
      </Routes>

      {/* 로그인 바텀시트 — 전역에서 openLoginSheet()으로 호출 */}
      {showLoginSheet && <LoginSheet />}

      <ToastManager text={text} isOpen={isOpen} onClose={closeToast} />
    </main>
  );
}

export default App;
