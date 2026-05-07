import { useEffect, useState } from 'react';

/**
 * 지도 SVG 에셋 fetch
 * - building SVG는 항상 동일 (1회만 fetch)
 * - label/POI SVG는 useArtistAssets 토글에 따라 일반/아티스트 버전 교체
 */
const useMapAssets = (useArtistAssets) => {
  const [buildingSvg, setBuildingSvg] = useState('');
  const [labelSvg, setLabelSvg] = useState('');
  const [poisSvg, setPoisSvg] = useState('');

  useEffect(() => {
    fetch('/map/map-building.svg')
      .then((res) => res.text())
      .then(setBuildingSvg);
  }, []);

  useEffect(() => {
    const labelUrl = useArtistAssets ? '/map/map-artist-label.svg' : '/map/map-label.svg';
    const poisUrl = useArtistAssets ? '/map/map-artist-pois.svg' : '/map/map-pois.svg';
    fetch(labelUrl)
      .then((res) => res.text())
      .then(setLabelSvg);
    fetch(poisUrl)
      .then((res) => res.text())
      .then(setPoisSvg);
  }, [useArtistAssets]);

  return { buildingSvg, labelSvg, poisSvg };
};

export default useMapAssets;
