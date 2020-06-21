import api from '@/utils/fetch';
export function searchSingerList (data) {
  return api.fetch('/top/artists', data, 'get');
}
export function searchSingerDetail (data) {
  return api.fetch('/artists', data, 'GET');
}
