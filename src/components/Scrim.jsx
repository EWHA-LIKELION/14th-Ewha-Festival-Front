/**
 * Scrim 컴포넌트
 */

import { useEffect } from 'react';

const Scrim = ({ onClick }) => {
  useEffect(() => {
    const prevBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []);

  return <div onClick={onClick} className="fixed inset-0 z-40 bg-black/50"></div>;
};

export default Scrim;
