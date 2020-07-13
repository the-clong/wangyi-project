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
    state.testArr = [{ isUser: false }];
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
    // 从sheet到cat是用户自己选的tag
    const catList = _.clone(state.catList);
    if (info.tag === 'sheet') {
      catList[info.index].isUser = true;
      state.testArr[0].isUser = true;
      state.userCatList.push(info.item);
    } else {
      // 从sheet到cat是用户自己选的tag
      catList[info.index].isUser = false;
      state.userCatList.splice(info.index, 1);
    }
    state.catList = catList;
  }
};
export default mutations;
