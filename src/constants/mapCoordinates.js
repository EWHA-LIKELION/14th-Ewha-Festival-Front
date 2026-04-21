// SVG 좌표 기준 (viewBox: 0 0 6562 8200)
// 클릭 시 해당 좌표로 지도 중앙 이동 및 줌 확대

export const BUILDING_CENTERS = {
  STUDENT_UNION: { x: 0, y: 0 }, //학문관
  SPORT_TRACK: { x: 0, y: 0 }, //스포츠트랙
  HYUUT_GIL: { x: 0, y: 0 }, //휴웃길
  HUMAN_ECOLOGY_BUILDING: { x: 0, y: 0 }, //생활환경관
  HAK_GWAN: { x: 0, y: 0 }, //학관
  GRASS_GROUND: { x: 0, y: 0 }, //잔디광장
  EWHA_SHINSEGAE_BUILDING: { x: 0, y: 0 }, //신세계관
  EWHA_POSCO_BUILDING: { x: 0, y: 0 }, //포스코관
  EDUCATION_BUILDING: { x: 0, y: 0 }, //교육관
  WELCH_RYANG_AUDITORIUM: { x: 0, y: 0 }, //대강당
  SENTENNIAL_MUSEUM: { x: 0, y: 0 }, //박물관
};

// 줌 레벨 (1 = 100%)
export const MAP_ZOOM_LEVELS = {
  ZL1: 1.0,
  ZL2: 1.0,
  ZL3: 1.0,
  ZL4: 1.0,
};

// 건물/부스 클릭 시 사용할 줌 레벨
export const MAP_CLICK_ZOOM_SCALE = MAP_ZOOM_LEVELS.ZL3;
