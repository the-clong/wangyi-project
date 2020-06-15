import api from '@/utils/fetch';
export function searchTopListAction () {
  return api.fetch('/toplist/detail', {}, 'get');
}
export function searchTopListByIdAction (idx) {
  return api.fetch('/top/list', { idx }, 'get');
}
