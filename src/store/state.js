import { userSongSquare } from './module';
import { playMode } from '@/common/js/config';
const state = {
  Token: localStorage.getItem('userToken') || '', // 用户登录之后的token
  accountInfo: JSON.parse(localStorage.getItem('accountInfo')) || '',
  singer: {},
  // 歌曲player
  fullScreen: false, // 是否展开
  playList: [], // 歌曲列表
  sequenceList: [], // 按顺序歌曲列表
  playMode: playMode.sequence, // 歌曲播放模式
  currentIndex: -1, // 当前歌曲的index
  playState: false, // 播放状态（0代表停止，1代表播放）
  categories: [], // 所有类别
  catList: [], // 歌单分类列表
  userCatList: [], // 用户歌单列表
  userCatIndex: 0 // 用户当前选择的歌单类别(上方tag)
};
const constState = Object.assign(state, { userSongSquare: userSongSquare });
export default constState;
