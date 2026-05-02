// SVG 원본 크기
export const SVG_WIDTH = 9843;
export const SVG_HEIGHT = 12300;

// 클릭 시 해당 좌표로 지도 중앙 이동 및 줌 확대
export const INITIAL_CENTER = { x: 3403, y: 7177 };
export const BUILDING_CENTERS = {
  STUDENT_UNION: { x: 3778, y: 6600 }, //학문관
  SPORT_TRACK: { x: 2796, y: 9057 }, //스포츠트랙
  HYUUT_GIL: { x: 4229, y: 7280 }, //휴웃길
  HUMAN_ECOLOGY_BUILDING: { x: 3038, y: 6854 }, //생활환경관
  HAK_GWAN: { x: 3525, y: 5487 }, //학관
  GRASS_GROUND: { x: 4263, y: 8958 }, //잔디광장
  EWHA_SHINSEGAE_BUILDING: { x: 1188, y: 7395 }, //신세계관
  EWHA_POSCO_BUILDING: { x: 5040, y: 5770 }, //포스코관
  EDUCATION_BUILDING: { x: 4410, y: 4206 }, //교육관
  WELCH_RYANG_AUDITORIUM: { x: 3231, y: 7602 }, //대강당
  SENTENNIAL_MUSEUM: { x: 3159, y: 8637 }, //박물관
};

// 아티스트 모드(5/22 또는 배리어프리)에서 building 포커스 좌표 override
export const ARTIST_BUILDING_CENTERS = {
  GRASS_GROUND: { x: 1500, y: 2962 },
};

// 줌 레벨 (1 = 100%)
export const MAP_ZOOM_LEVELS = {
  ZL1: 1.5,
  ZL2: 4.0,
  ZL3: 6.0,
  ZL4: 15.0,
};

// 건물/부스 클릭 시 사용할 줌 레벨
export const MAP_CLICK_ZOOM_SCALE = MAP_ZOOM_LEVELS.ZL3;
