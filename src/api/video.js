import api from '@/utils/fetch';
export function searchVideoGroupList () {
  return api.fetch('/video/group/list', {}, 'get');
}
export function searchVideoItem (id) {
  return api.fetch('/video/group', { id }, 'get');
}
