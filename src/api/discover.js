import api from '@/utils/fetch';
export function login (data) {
  return api.fetch('/ap-system/UserLogin.do', data, 'post', true);
}
