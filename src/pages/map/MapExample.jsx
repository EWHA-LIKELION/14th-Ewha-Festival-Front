import { useEffect, useRef, useState } from 'react';
import './map-example.css';

export default function MapPage() {
  const svgWrapperRef = useRef(null);
  const [svgContent, setSvgContent] = useState('');

  // SVG 불러오기
  useEffect(() => {
    fetch('/icons/map.svg')
      .then((res) => res.text())
      .then((data) => setSvgContent(data));
  }, []);

  // 클릭 이벤트
  useEffect(() => {
    if (!svgWrapperRef.current) return;

    const handleClick = (e) => {
      const target = e.target;
      e.stopPropagation();

      if (!(target instanceof SVGElement)) return;
      if (!target.id) return;

      // active 초기화
      svgWrapperRef.current
        .querySelectorAll('.is-active')
        .forEach((el) => el.classList.remove('is-active'));

      target.classList.add('is-active');

      if (target.id.startsWith('building-')) {
        console.log(`🏢 건물 클릭: ${target.id}`);
      }

      if (target.id.startsWith('booth-')) {
        console.log(`🎪 부스 클릭: ${target.id}`);
      }
    };

    svgWrapperRef.current.addEventListener('click', handleClick);
    return () => svgWrapperRef.current?.removeEventListener('click', handleClick);
  }, [svgContent]);

  return (
    <div className="map-page">
      <h1 className="text-black">지도 클릭 테스트</h1>

      <div
        ref={svgWrapperRef}
        className="map-wrapper"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
}
