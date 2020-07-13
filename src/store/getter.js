export const singer = state => state.singer;

export const fullScreen = state => state.fullScreen;

export const playState = state => state.playState;

export const playList = state => state.playList;

export const sequenceList = state => state.sequenceList;

export const playMode = state => state.playMode;

export const currentIndex = state => state.currentIndex;

export const categories = state => state.categories;

export const userCatList = state => state.userCatList.map(item => {
  item.offset = 0;
  return item;
});

export const userCatIndex = state => state.userCatIndex;

export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {};
};
export const sheetCatList = (state) => {
  console.log('sheetCatList------');
  return state.catList;
};

export const getAllSongsSheet = (state) => {
  const indexArr = state.userCatList.length > 0 ? _.map(state.userCatList, 'catIndex') : [];
  const categories = Array.prototype.slice.call({ ...state.categories, length: Object.keys(state.categories).length });
  return _.map(categories, (item, index) => {
    return {
      name: item,
      children: _.filter(state.catList, (cat, catIndex) => {
        // cat.catIndex = catIndex;
        cat.isUser = indexArr.indexOf(catIndex) > -1;
        return cat.category === index;
      })
    };
  });
}
