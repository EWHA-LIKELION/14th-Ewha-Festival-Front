/**
 * 관리자 인증
 */

import api from '@/apis/api';

export const verifyAdminCode = async (programname, password) => {
  const { data } = await api.post('/accounts/permission/', { programname, password });
  return data;
};

const AdminAPI = {
  verifyAdminCode,
};

export default AdminAPI;
