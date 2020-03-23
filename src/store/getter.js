export const singer = state => state.singer;

export const fullScreen = state => state.fullScreen;

export const playState = state => state.playState;

export const playList = state => state.playList;

export const sequenceList = state => state.sequenceList;

export const playMode = state => state.playMode;

export const currentIndex = state => state.currentIndex;

export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {};
}
  ;
