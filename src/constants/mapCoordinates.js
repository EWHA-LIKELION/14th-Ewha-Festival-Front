// SVG 원본 크기
export const SVG_WIDTH = 9843;
export const SVG_HEIGHT = 12300;

// 클릭 시 해당 좌표로 지도 중앙 이동 및 줌 확대

export const BUILDING_CENTERS = {
  STUDENT_UNION: { x: 3684, y: 6483 }, //학문관
  SPORT_TRACK: { x: 2796, y: 9057 }, //스포츠트랙
  HYUUT_GIL: { x: 3675, y: 7956 }, //휴웃길
  HUMAN_ECOLOGY_BUILDING: { x: 2850, y: 7002 }, //생활환경관
  HAK_GWAN: { x: 3525, y: 5487 }, //학관
  GRASS_GROUND: { x: 4263, y: 8958 }, //잔디광장
  EWHA_SHINSEGAE_BUILDING: { x: 1188, y: 7395 }, //신세계관
  EWHA_POSCO_BUILDING: { x: 4644, y: 5619 }, //포스코관
  EDUCATION_BUILDING: { x: 4410, y: 4206 }, //교육관
  WELCH_RYANG_AUDITORIUM: { x: 3231, y: 7602 }, //대강당
  SENTENNIAL_MUSEUM: { x: 3159, y: 8637 }, //박물관
};

// 줌 레벨 (1 = 100%)
export const MAP_ZOOM_LEVELS = {
  ZL1: 1.0,
  ZL2: 1.0,
  ZL3: 8.0,
  ZL4: 1.0,
};

// 건물/부스 클릭 시 사용할 줌 레벨
export const MAP_CLICK_ZOOM_SCALE = MAP_ZOOM_LEVELS.ZL3;
