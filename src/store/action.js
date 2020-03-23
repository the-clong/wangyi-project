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
