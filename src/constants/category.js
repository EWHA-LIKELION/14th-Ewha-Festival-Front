// 부스 카테고리
export const BOOTH_CATEGORY = [
  { value: 'FOOD', label: '음식' },
  { value: 'GOODS', label: '굿즈' },
  { value: 'EXPERIENCE', label: '체험' },
];

// 공연 카테고리
export const SHOW_CATEGORY = [
  { value: 'BAND', label: '밴드' },
  { value: 'VOCAL', label: '보컬' },
  { value: 'DANCE', label: '댄스' },
  { value: 'THEATER', label: '연극' },
  { value: 'ARTIST', label: '아티스트' },
];

// 기타시설 카테고리
export const ETC_CATEGORY = [
  { value: 'TRASH', label: '쓰레기통' },
  { value: 'DISH', label: '다회용기' },
  { value: 'GAS', label: '부탄가스' },
  { value: 'STUFF', label: '물품배부' },
  { value: 'FOOD', label: '취식공간' },
];

export const ETC_DESCRIPTION = {
  TRASH: '부스 운영 중 발생한 쓰레기를 처리하는 곳입니다.',
  DISH: '대동제에서 사용하는 다회용기를 반납하는 곳입니다.',
  GAS: '부스 운영 중 발생한 부탄가스 통을 분리배출 하는 곳입니다.',
  STUFF: '부스 운영에 필요한 비품(테이블, 의자 등)을 배부하는 곳입니다.',
  FOOD: '축제기간 동안 누구나 자유롭게 이용가능한 취식공간입니다.',
};
