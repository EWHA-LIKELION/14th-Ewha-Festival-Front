/**
 * 관리자 인증
 */

import api from '@/apis/api';

export const verifyAdminCode = async (code) => {
  const { data } = await api.post('/accounts/admin/verify', { code });
  return data;
};

const AdminAPI = {
  verifyAdminCode,
};

export default AdminAPI;
