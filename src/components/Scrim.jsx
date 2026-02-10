/**
 * Scrim 컴포넌트
 */

import React from 'react';

const Scrim = ({ onClick }) => {
  return <div onClick={onClick} className="fixed inset-0 z-40 bg-black/50"></div>;
};

export default Scrim;
