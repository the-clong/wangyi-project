import * as types from './mutation-type';
import { playMode } from '@/common/js/config';
import { shuffle } from '@/common/js/util';
export const setUserInfo = ({ commit }, userInfo) => {
  commit(types.SET_USER_TOKEN, userInfo);
};
export const selectPlay = ({ commit, state }, playInfo) => {
  const { currentIndex, playList } = playInfo;
  if (state.playMode === playMode.shuffle) {
    // 查找随机列表的index
    const index = state.playList.findIndex((item) => {
      return playList[currentIndex].id === item.id;
    });
    commit(types.SET_CURRENT_INDEX, index);
  } else {
    commit(types.SET_PLAYLIST, playList);
    commit(types.SET_CURRENT_INDEX, currentIndex);
  }
  if (state.sequenceList.length === 0) {
    commit(types.SET_SEQUENCE_LIST, playList);
  }
  commit(types.SET_FULLSCREEN, true);
  commit(types.SET_PLAY_STATE, true);
};
export const setPlayMode = ({ commit }, info) => {
  const { mode, playList, id } = info;
  const shuffleArray = mode === playMode.shuffle ? shuffle(playList) : [];
  const resData = mode === playMode.shuffle ? shuffleArray : playList;
  commit(types.SET_PLAY_MODE, mode);
  if (mode === playMode.shuffle) {
    commit(types.SET_PLAYLIST, shuffleArray);
  } else if (mode === playMode.sequence) {
    commit(types.SET_PLAYLIST, playList);
  }
  const currentIndex = resData.findIndex((item) => {
    return id === item.id;
  });
  commit(types.SET_CURRENT_INDEX, currentIndex);
};
// 设置歌单列表的数据
export const setSheetCatList = ({ commit }, cateList) => {
  const { sub, categories } = cateList;
  if (sub.length > 0) {
    sub.unshift(Object.assign(_.clone(sub[2]), { name: '官方', isNoEdit: true, hot: false, category: '' }));
    sub.unshift(Object.assign(_.clone(sub[1]), { name: '精品', isNoEdit: true, hot: false, category: '' }));
    sub.unshift(Object.assign(_.clone(sub[0]), { name: '推荐', isNoEdit: true, hot: false, category: '' }));
    _.each(sub, (item, index) => { item.catIndex = index; });
    commit(types.SET_CAT_LIST, sub);
    commit(types.SET_USER_CAT_LIST, sub.slice(0, 7));
    commit(types.SET_CATEGORIES, categories);
  }
};
export const changeSheetList = ({ commit }, info) => {
  commit(types.CHANGE_CAT_LIST, info);
};
