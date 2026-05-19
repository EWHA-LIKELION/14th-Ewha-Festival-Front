/**
 * 지도 두 손가락 회전 제스처 + 라벨 카운터 회전
 * - 두 손가락 중간점을 회전 축으로 설정 (Google Maps 식)
 * - origin 변경 시 라이브러리(react-zoom-pan-pinch) translate 보정으로 시각적 점프 방지
 * - SVG mask 기준으로 라벨 path들을 <g>로 그룹화하여 카운터 회전 적용
 */

import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

const SVG_NS = 'http://www.w3.org/2000/svg';

const useMapRotation = ({
  mapRef,
  transformRef,
  labelSvg,
  savedTransform,
  rotationRef,
  rotationOriginRef,
}) => {
  const svgContentRef = useRef(null);
  const labelLayerRef = useRef(null);
  const lastAngleRef = useRef(null);
  // 라벨 카운터 회전을 위한 그룹 캐시 — [{ element, cx, cy }]
  const labelGroupsRef = useRef([]);

  // SVG label DOM에서 라벨 그룹을 만들고 캐시 (멱등 — 이미 만들어졌으면 재사용)
  const ensureLabelGroups = useCallback(() => {
    // 캐시된 element가 여전히 DOM에 연결돼 있으면 재사용
    if (labelGroupsRef.current.length > 0 && labelGroupsRef.current[0].element.isConnected) {
      return labelGroupsRef.current;
    }
    // SVG가 교체된 경우 캐시 무효화 (배리어프리 ↔ 일반 라벨 전환 등)
    labelGroupsRef.current = [];

    const layer = labelLayerRef.current;
    if (!layer) return [];
    const svg = layer.querySelector('svg');
    if (!svg) return [];

    // 이미 그룹화된 <g data-label>이 있으면 재사용 (StrictMode/리렌더 대비)
    const existing = Array.from(svg.querySelectorAll('g[data-label]'));
    if (existing.length > 0) {
      const groups = existing
        .map((g) => {
          const m = g
            .getAttribute('transform')
            ?.match(/rotate\([^)]*?\s+([\d.-]+)\s+([\d.-]+)\)/);
          if (!m) return null;
          return { element: g, cx: parseFloat(m[1]), cy: parseFloat(m[2]) };
        })
        .filter(Boolean);
      labelGroupsRef.current = groups;
      return groups;
    }

    // 새로 그룹화 — mask 기준으로 인접 path들을 묶음
    const masks = Array.from(svg.querySelectorAll('mask'));
    const groups = [];
    masks.forEach((mask) => {
      const x = parseFloat(mask.getAttribute('x'));
      const y = parseFloat(mask.getAttribute('y'));
      const w = parseFloat(mask.getAttribute('width'));
      const h = parseFloat(mask.getAttribute('height'));
      if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h)) return;
      const cx = x + w / 2;
      const cy = y + h / 2;

      const paths = [];
      let next = mask.nextElementSibling;
      while (next && next.tagName.toLowerCase() !== 'mask') {
        if (next.tagName.toLowerCase() === 'path') paths.push(next);
        next = next.nextElementSibling;
      }
      if (paths.length === 0) return;

      const g = document.createElementNS(SVG_NS, 'g');
      g.setAttribute('data-label', 'true');
      g.setAttribute('transform', `rotate(0 ${cx} ${cy})`);
      paths[0].parentNode.insertBefore(g, paths[0]);
      paths.forEach((p) => g.appendChild(p));
      groups.push({ element: g, cx, cy });
    });

    labelGroupsRef.current = groups;
    return groups;
  }, []);

  const applyTransform = useCallback(() => {
    const el = svgContentRef.current;
    if (!el) return;
    const origin = rotationOriginRef.current;
    if (origin) {
      el.style.transformOrigin = `${origin.x}px ${origin.y}px`;
    }
    const angle = rotationRef.current;
    el.style.transform = `rotate(${angle}deg)`;

    // 항상 ensureLabelGroups로 검증 — labelSvg 교체로 캐시가 분리(detached) 됐을 때 즉시 재생성
    const groups = ensureLabelGroups();

    // 지도 회전을 상쇄해 라벨은 항상 정방향
    const counter = -angle;
    groups.forEach(({ element, cx, cy }) => {
      element.setAttribute('transform', `rotate(${counter} ${cx} ${cy})`);
    });
  }, [rotationRef, rotationOriginRef, ensureLabelGroups]);

  // 두 손가락 회전 제스처
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;

    const getAngle = (touches) => {
      const dx = touches[1].clientX - touches[0].clientX;
      const dy = touches[1].clientY - touches[0].clientY;
      return (Math.atan2(dy, dx) * 180) / Math.PI;
    };

    const handleTouchStart = (e) => {
      if (e.touches.length !== 2) return;
      lastAngleRef.current = getAngle(e.touches);

      // 두 손가락 중간점의 SVG 로컬 좌표를 회전 축으로 설정
      const rect = mapRef.current?.getBoundingClientRect();
      if (!rect) return;
      const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      const localScreenX = midX - rect.left;
      const localScreenY = midY - rect.top;
      const { positionX, positionY, scale } = savedTransform;

      // 라이브러리 translate 역변환 (회전 적용 전 좌표 공간)
      const rotatedLocalX = (localScreenX - positionX) / scale;
      const rotatedLocalY = (localScreenY - positionY) / scale;

      // 회전 역변환 (실제 SVG 로컬 좌표를 얻기 위함)
      const oldOrigin = rotationOriginRef.current;
      const R = rotationRef.current;
      let newOriginX, newOriginY;
      if (oldOrigin && R !== 0) {
        const Rrad = (R * Math.PI) / 180;
        const cosR = Math.cos(Rrad);
        const sinR = Math.sin(Rrad);
        const dx = rotatedLocalX - oldOrigin.x;
        const dy = rotatedLocalY - oldOrigin.y;
        // Rot(-R) * (dx, dy) = (dx*cos + dy*sin, -dx*sin + dy*cos)
        newOriginX = oldOrigin.x + dx * cosR + dy * sinR;
        newOriginY = oldOrigin.y - dx * sinR + dy * cosR;
      } else {
        newOriginX = rotatedLocalX;
        newOriginY = rotatedLocalY;
      }

      // origin 변경 시 라이브러리 translate 보정 → 시각적 점프 방지
      // 수식: p' = p + scale * (I - Rot(R)) * (O1 - O2)
      if (oldOrigin && R !== 0) {
        const Rrad = (R * Math.PI) / 180;
        const cosR = Math.cos(Rrad);
        const sinR = Math.sin(Rrad);
        const dx = oldOrigin.x - newOriginX;
        const dy = oldOrigin.y - newOriginY;
        const compX = dx - (dx * cosR - dy * sinR);
        const compY = dy - (dx * sinR + dy * cosR);
        const newPosX = positionX + scale * compX;
        const newPosY = positionY + scale * compY;
        transformRef.current?.setTransform(newPosX, newPosY, scale, 0);
        savedTransform.positionX = newPosX;
        savedTransform.positionY = newPosY;
      }

      rotationOriginRef.current = { x: newOriginX, y: newOriginY };
      applyTransform();
    };

    const handleTouchMove = (e) => {
      if (e.touches.length !== 2 || lastAngleRef.current === null) return;
      const currentAngle = getAngle(e.touches);
      let delta = currentAngle - lastAngleRef.current;
      // 각도 wrap 처리 (예: 179 → -179)
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      rotationRef.current += delta;
      applyTransform();
      lastAngleRef.current = currentAngle;
    };

    const handleTouchEnd = (e) => {
      if (e.touches.length < 2) lastAngleRef.current = null;
    };

    // capture: true → 라이브러리가 stopPropagation 해도 먼저 잡음
    // passive: true → preventDefault 불가, 라이브러리의 pinch zoom은 그대로 작동
    const opts = { passive: true, capture: true };
    el.addEventListener('touchstart', handleTouchStart, opts);
    el.addEventListener('touchmove', handleTouchMove, opts);
    el.addEventListener('touchend', handleTouchEnd, opts);
    el.addEventListener('touchcancel', handleTouchEnd, opts);

    return () => {
      const removeOpts = { capture: true };
      el.removeEventListener('touchstart', handleTouchStart, removeOpts);
      el.removeEventListener('touchmove', handleTouchMove, removeOpts);
      el.removeEventListener('touchend', handleTouchEnd, removeOpts);
      el.removeEventListener('touchcancel', handleTouchEnd, removeOpts);
    };
  }, [mapRef, transformRef, savedTransform, rotationRef, rotationOriginRef, applyTransform]);

  // labelSvg 로드 후: 그룹화 수행 + 카운터 회전 적용
  // useLayoutEffect — commit 직후 paint 이전에 동기 실행되어
  // dangerouslySetInnerHTML 교체 후 풀려보이는 중간 paint를 막음
  // (useEffect는 paint 이후 실행이라 한 프레임 라벨이 회전 풀린 채로 깜빡임)
  useLayoutEffect(() => {
    if (!labelSvg) return;
    ensureLabelGroups();
    applyTransform();
  }, [labelSvg, ensureLabelGroups, applyTransform]);

  // 회전값을 0으로 초기화 — 배리어프리 진입처럼 라벨 SVG가 교체되는 경로에서
  // 회전 상태가 라벨/포커스 계산을 복잡하게 만들기 때문에 진입 시 리셋
  const resetRotation = useCallback(() => {
    rotationRef.current = 0;
    rotationOriginRef.current = null;
    applyTransform();
  }, [rotationRef, rotationOriginRef, applyTransform]);

  return { svgContentRef, labelLayerRef, resetRotation };
};

export default useMapRotation;
