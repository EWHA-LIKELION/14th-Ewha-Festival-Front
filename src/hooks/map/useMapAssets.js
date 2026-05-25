import { useEffect, useState } from 'react';

import mapBuilding from '@/assets/map/map-building.svg';
import mapLabel from '@/assets/map/map-label.svg';
import mapArtistLabel from '@/assets/map/map-artist-label.svg';
import mapPois from '@/assets/map/map-pois.svg';
import mapArtistPois from '@/assets/map/map-artist-pois.svg';

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
    fetch(mapBuilding)
      .then((res) => res.text())
      .then(setBuildingSvg);
  }, []);

  useEffect(() => {
    const labelUrl = useArtistAssets ? mapArtistLabel : mapLabel;
    const poisUrl = useArtistAssets ? mapArtistPois : mapPois;
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
