import { useEffect, useState } from 'react';
import { asset } from '@/utils/assetPath';

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
    fetch(asset('/map/map-building.svg'))
      .then((res) => res.text())
      .then(setBuildingSvg);
  }, []);

  useEffect(() => {
    const labelUrl = useArtistAssets
      ? asset('/map/map-artist-label.svg')
      : asset('/map/map-label.svg');
    const poisUrl = useArtistAssets
      ? asset('/map/map-artist-pois.svg')
      : asset('/map/map-pois.svg');
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
