import api from '@/utils/fetch';
export function searchMusicSongByID (data) {
  return api.fetch('/song/url', data, 'get');
}
export function searchMusicLyricByID (data) {
  return api.fetch('/lyric', data, 'get');
}
