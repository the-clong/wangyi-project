import api from '@/utils/fetch';
export const getLoginStatusAction = () => {
  return api.fetch('/login/status', {}, 'get');
};
