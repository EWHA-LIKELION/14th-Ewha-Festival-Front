import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationBarLayout from '@/layouts/NavigationBarLayout';
import ComponentPreview from '@/components/ComponentPreview';

function App() {
  return (
    <main className="app">
      <Routes>
        <Route element={<NavigationBarLayout />}>
          <Route index element={<div className="h-300 bg-gray-500">Home</div>} />
          <Route path="my" element={<div>My</div>} />
          <Route path="my/scrap" element={<div>Scrap</div>} />
        </Route>
        <Route element={<NavigationBarLayout noPadding />}>
          <Route path="map" element={<div className="h-300 bg-gray-500">Map</div>} />
          {/* query string: /map?type=부스공연&slot=건물&booth=부스 */}
        </Route>
        <Route path="credit" element={<div>Credit</div>} />
        <Route path="introduction" element={<div>Introduction</div>} />
        <Route path="notice" element={<div>Notice</div>} />

        <Route path="search" element={<div>Search</div>} />
        <Route path="admin">
          <Route path="confirm" element={<div>Confirm</div>} />
          <Route path="booth/:id" element={<div>My Booth</div>} />
          <Route path="booth/:id/edit" element={<div>Booth Edit</div>} />
          <Route path="show/:id" element={<div>My Show</div>} />
          <Route path="show/:id/edit" element={<div>Show Edit</div>} />
        </Route>
        {/* 공통 컴포넌트 퍼블리싱 기간이 끝나면 아래 라우트는 삭제 */}
        <Route path="component-preview" element={<ComponentPreview />} />
      </Routes>
    </main>
  );
}

export default App;
