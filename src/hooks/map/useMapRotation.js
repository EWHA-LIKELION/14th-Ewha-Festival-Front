/**
 * 지도 두 손가락 회전 제스처 + 라벨 카운터 회전
 * - 두 손가락 중간점을 회전 축으로 설정 (Google Maps 식)
 * - origin 변경 시 라이브러리(react-zoom-pan-pinch) translate 보정으로 시각적 점프 방지
 * - SVG mask 기준으로 라벨 path들을 <g>로 그룹화하여 카운터 회전 적용
 */

import { useCallback, useEffect, useRef } from 'react';

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

  const applyTransform = useCallback(() => {
    const el = svgContentRef.current;
    if (!el) return;
    const origin = rotationOriginRef.current;
    if (origin) {
      el.style.transformOrigin = `${origin.x}px ${origin.y}px`;
    }
    const angle = rotationRef.current;
    el.style.transform = `rotate(${angle}deg)`;
    // 지도 회전을 상쇄해 라벨은 항상 정방향
    const counter = -angle;
    labelGroupsRef.current.forEach(({ element, cx, cy }) => {
      element.setAttribute('transform', `rotate(${counter} ${cx} ${cy})`);
    });
  }, [rotationRef, rotationOriginRef]);

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
      // 회전이 적용된 상태에서 화면 미드포인트의 진짜 로컬 좌표는 Rot(-R)을 한번 더 적용해야 함
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

  // labelSvg 로드 후: mask 기준으로 라벨 path들을 <g>로 그룹화
  useEffect(() => {
    if (!labelSvg) return;
    const layer = labelLayerRef.current;
    if (!layer) return;
    const svg = layer.querySelector('svg');
    if (!svg) return;

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

      // mask의 다음 형제부터 다음 mask 전까지의 path들을 라벨로 묶음
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
    if (rotationRef.current !== 0) applyTransform();

    return () => {
      // 그룹화로 변경한 DOM을 원복 — 다음 effect 실행 시 path를 다시 찾을 수 있도록
      groups.forEach(({ element }) => {
        const parent = element.parentNode;
        if (!parent) return;
        while (element.firstChild) {
          parent.insertBefore(element.firstChild, element);
        }
        parent.removeChild(element);
      });
      labelGroupsRef.current = [];
    };
  }, [labelSvg, applyTransform, rotationRef]);

  return { svgContentRef, labelLayerRef };
};

export default useMapRotation;
