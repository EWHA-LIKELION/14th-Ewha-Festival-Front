import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ComponentPreview from '@/components/ComponentPreview';

function App() {
  return (
    <main className="app">
      <Routes>
        <Route index element={<div>Home</div>} />
        <Route path="credit" element={<div>Credit</div>} />
        <Route path="introduction" element={<div>Introduction</div>} />
        <Route path="notice" element={<div>Notice</div>} />
        <Route path="map" element={<div>Map</div>} />
        {/* query string: /map?type=부스공연&slot=건물&booth=부스 */}
        <Route path="search" element={<div>Search</div>} />
        <Route path="admin">
          <Route path="confirm" element={<div>Confirm</div>} />
          <Route path="booth/:id" element={<div>My Booth</div>} />
          <Route path="booth/:id/edit" element={<div>Booth Edit</div>} />
          <Route path="performance/:id" element={<div>My Performance</div>} />
          <Route path="performance/:id/edit" element={<div>Performance Edit</div>} />
        </Route>
        {/* 공통 컴포넌트 퍼블리싱 기간이 끝나면 아래 라우트는 삭제 */}
        <Route path="component-preview" element={<ComponentPreview />} />
      </Routes>
    </main>
  );
}

export default App;
