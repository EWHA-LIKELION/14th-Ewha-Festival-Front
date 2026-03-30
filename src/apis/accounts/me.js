/**
 * 내 정보 조회
 */

import api from '@/apis/api';

export const getMyProfile = async () => {
  const { data } = await api.get('/accounts/my-data/');
  return data;
};

const MeAPI = {
  getMyProfile,
};

export default MeAPI;
