import api from '@/utils/fetch';
export function searchTopListAction () {
  return api.fetch('/toplist/detail', {}, 'get');
}
