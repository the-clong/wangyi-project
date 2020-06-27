import * as types from './mutation-type';
import Singer from '@/common/js/singer';
import * as discover from '@/api/discover';
import Cookie from 'js-cookie';
const mutations = {
  [types.SET_USER_TOKEN] (state, userInfo) {
    const { token, account } = userInfo;
    state.Token = token;
    state.accountInfo = account; // 账号基本信息
    // state.profileInfo = profile; // 账号概述
    // state.bindingsInfo = bindings; // 账号绑定信息
    localStorage.setItem('userToken', token);
    localStorage.setItem('accountInfo', JSON.stringify(account));
    Cookie.set('Token', token); // 存cookie
  },
  // 登出，清空store和sessionStorage
  [types.USER_LOGOUT] (state) {
    state.Token = '';
    state.accountInfo = {};
    sessionStorage.clear();
  },
  [types.SET_SINGER] (state, item) {
    const { id, name, avater } = item;
    state.singer = new Singer({
      id,
      name,
      avater
    });
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index;
  },
  [types.SET_PLAY_MODE] (state, mode) {
    state.playMode = mode;
  },
  [types.SET_PLAYLIST] (state, playList) {
    state.playList = playList;
  },
  [types.SET_SEQUENCE_LIST] (state, playList) {
    state.sequenceList = playList;
  },
  [types.SET_FULLSCREEN] (state, fullScreen) {
    state.fullScreen = fullScreen;
  },
  [types.SET_PLAY_STATE] (state, playState) {
    state.playState = playState;
  },
  [types.SET_CAT_LIST] (state, catState) {
    state.catList = catState;
  },
  [types.SET_USER_CAT_LIST] (state, userCatState) {
    state.userCatList = userCatState;
  },
  [types.SET_USER_CAT_INDEX] (state, userCatIndex) {
    state.userCatIndex = userCatIndex;
  },
  [types.SET_CATEGORIES] (state, categories) {
    state.categories = categories;
  },
  [types.CHANGE_CAT_LIST] (state, info) {
    if (info.tag === 'sheet') {
      state.catList.splice(info.index, 1, info.item);
    }
    // else {
    //   state.catList.splice(info.index, 1, info.item);
    // }
  },
  [types.CHANGE_USER_CAT_LIST] (state, info) {
    if (info.tag === 'sheet') {
      state.userCatList.push(info.item);
    } else {
      state.userCatList.splice(info.index, 1);
    }
  }
};
export default mutations;
