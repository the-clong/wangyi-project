import api from '@/utils/fetch';
export function login (data) {
  return api.fetch('/ap-system/UserLogin.do', data, 'post');
}
// 首页banner图
export function getBannerList () {
  return api.fetch('/banner', { type: 2 });
}
// 推荐歌单
export function searchRecommandSongsAction (data) {
  return api.fetch('/personalized', data);
}
// 风格推荐
export function searchChineseSongs () {
  return api.fetch('/user/subcount');
}
// 获取所有歌单分类
export function getCategoryList () {
  return api.fetch('/playlist/catlist', 'GET');
  // return api.fetch('/top/playlist');
}
// 获取风格推荐的歌曲
export function searchSongSheetsList (data) {
  return api.fetch('/top/playlist', data, 'GET');
  // return api.fetch('/top/playlist');
}
// export function searchSongSheetsList (data) {
//   return api.fetch('/top/playlist/highquality', data, 'GET');
//   // return api.fetch('/top/playlist');
// }
export function searchRecoResourceAction () {
  return api.fetch('/recommend/resource', 'GET');
  // return api.fetch('/top/playlist');
}
// 获取所有热门歌单分类
export function getHotCategoryList () {
  return api.fetch('/playlist/hot');
  // return api.fetch('/top/playlist');
}
// 获取最新专辑
export function getNewestAlbum () {
  return api.fetch('/album/newest');
  // return api.fetch('/top/playlist');
}
// 获取最新专辑
export function getNewestSongs () {
  return api.fetch('/top/song', { type: 0 }, 'GET');
  // return api.fetch('/top/playlist');
}
export function searchRecommandSongsList () {
  return api.fetch('/recommend/songs');
  // return api.fetch('/top/playlist');
}

// 获取歌单详情
export function getCategoryDetail (id) {
  return api.fetch('/playlist/detail', { id: id, limit: 12 }, 'GET');
}
// 获取歌单详情
export function getSongsDetail (ids) {
  return api.fetch('/song/detail', { ids: ids, limit: 10 }, 'GET');
}
// 获取排行榜数据
export function searchRankTop (idx) {
  return api.fetch('/top/list', { idx }, 'GET');
}
// 获取推荐电台
export function searchDJProgram () {
  return api.fetch('/personalized/djprogram', {}, 'GET');
}
