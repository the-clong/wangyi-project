import api from '@/utils/fetch';
export function searchDefaultAction () {
  return api.fetch('/search/default', {}, 'get');
}
export function searchUserRecordAction (data) {
  return api.fetch('/user/record', data, 'get');
}
