<template>
  <div id="common-player" v-show="playList.length > 0">
    <transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <div class="filter"></div>
          <img width="100%" height="100%" :src="currentSong.picUrl">
        </div>
        <div class="top">
          <div class="go-back" @click="back">
            <svg class="svg-icon" aria-hidden="true">
              <use xlink:href="#icon-fanhui"></use>
            </svg>
          </div>
          <div class="title">
            <h3>{{currentSong.name}}</h3>
            <h4>{{currentSong.artist}}</h4>
          </div>
          <div style="width:54px;"></div>
        </div>
        <div class="content" @touchstart.prevent="contentTouchStart" @touchmove.prevent="contentTouchMove" @touchend="contentTouchEnd">
          <div class="content-l">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img v-lazy="currentSong.picUrl" width="100%" height="100%" class="image" />
              </div>
            </div>
          </div>
          <div class="content-r">
            <scroll class="lyric-wrapper" :data="playList" ref="lyricWrapper" :isListInit="isListInit">
              <div class="lyric-list" v-if="currentLyric && currentLyric.lines.length > 0">
                <p v-for="(item,index) in currentLyric.lines" :key="index" class="text" :class="{'active': currentLyricNum === index}" ref="lyricList">
                  {{item.txt}}
                </p>
              </div>
            </scroll>
          </div>
          <div class="content-dot">
            <div class="dot-wrapper">
              <div class="dot" :class="{'active':lyricMode === 'cd'}"></div>
              <div class="dot" :class="{'active':lyricMode === 'lyric'}"></div>
            </div>
          </div>
        </div>
        <div class="progress-bar">
          <div class="time-l">{{formatTime(updateTime)}}</div>
          <div class="progress-wrapper">
            <progress-bar :percent="progressPercent" @percentChange="percentChange" @percentChangeEnd="percentChangeEnd"></progress-bar>
          </div>
          <div class="time-r">{{formatTime(duration)}}</div>
        </div>
        <div class="bottom">
          <div>
            <svg class="svg-icon" aria-hidden="true" @click="changeMode">
              <use :xlink:href="'#icon-'+iconMode"></use>
            </svg>
          </div>
          <div>
            <svg class="svg-icon" aria-hidden="true" @click="prev" :class="{'disable':!songReady}">
              <use xlink:href="#icon-houtui"></use>
            </svg>
          </div>
          <div class="play">
            <svg class="svg-icon" aria-hidden="true" @click="togglePlay">
              <use :xlink:href="iconPlay"></use>
            </svg>
          </div>
          <div>
            <svg class="svg-icon" aria-hidden="true" @click="next" :class="{'disable':!songReady}">
              <use xlink:href="#icon-qianjin-copy"></use>
            </svg>
          </div>
          <div>
            <svg class="svg-icon" aria-hidden="true">
              <use xlink:href="#icon-gedan"></use>
            </svg>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen && currentSong" @click="open">
        <play-circle :radius="circleRadius" :dashOffset="circleOffset">
          <img :src="currentSong && currentSong.picUrl" />
        </play-circle>
      </div>
    </transition>
    <!--必须加自动播放不然播不了-->
    <audio ref="audio" :src="audioUrl" autoplay @canplay="ready" @error="audioError" @timeupdate="timeUpdate" @ended="playEnd"></audio>
  </div>
</template>
<script>
import $ from 'jquery';
import Lyric from 'lyric-parser';
import { playMode } from '@/common/js/config';
import scroll from '@/base/scroll';
import ProgressBar from '@/base/progress-bar';
import PlayCircle from '@/base/play-circle';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import * as songApi from '@/api/song';
import animations from 'create-keyframe-animation';
export default {
  components: {
    scroll,
    ProgressBar,
    PlayCircle
  },
  data () {
    return {
      isListInit: true,
      audioUrl: '', // audio播放地址
      updateTime: 0, // audio的播放时间
      songReady: true, // audio是否准备好
      progressPercent: 0, // 百分比
      moveBar: false, // 是否移动bar
      mediaMode: 0, // 当前模式
      circleRadius: 35, // miniPlayer的宽高
      circleOffset: Math.PI * 100, // minPlayer的初始进度
      currentLyric: null, // 歌词对象
      currentLyricNum: 0, // 高亮行数
      lyricMode: 'cd', // 代表cd还是lyric
      isMove: true // 判断是否需要偏移(deltaY> deltaX不偏移)
    };
  },
  created () {
    this.duration = 0;
    this.touch = {};
  },
  computed: {
    ...mapGetters({
      playList: 'playList',
      sequenceList: 'sequenceList',
      currentSong: 'currentSong',
      fullScreen: 'fullScreen',
      playState: 'playState',
      currentIndex: 'currentIndex',
      playMode: 'playMode'
    }),
    iconPlay () {
      return '#icon-' + (this.playState ? 'pause' : 'bofang2');
    },
    cdCls () {
      return this.playState ? 'play' : 'play pause';
    },
    iconMode () {
      return this.playMode === playMode.sequence ? 'shunxubofang' : (this.playMode === playMode.shuffle ? 'suijibofang' : 'danquxunhuan');
    }
  },
  watch: {
    fullScreen: function (fullScreen) {
      this.isListInit = !fullScreen;
    },
    currentSong: function (newSong, oldSong) {
      // this.isListInit = false;
      if (newSong.id !== oldSong.id) {
        this.searchMusicSong({ id: newSong.id });
        this.searchMusicLyric({ id: newSong.id });
      }
    },
    updateTime: function (updateTime) {
      if (this.duration !== 0) {
        this.circleOffset = Math.PI * 100 * (1 - updateTime / this.duration);
      }
    }
  },
  methods: {
    async searchMusicSong (data) {
      const songRes = await songApi.searchMusicSongByID(data);
      if (songRes.code === 200) {
        if (!songRes.data[0].url) {
          this.$refs.audio.pause();
          this.audioUrl = '';
          this.togglePlay();
        } else {
          this.audioUrl = songRes.data[0].url;
        }
      }
    },
    async searchMusicLyric (data) {
      if (this.currentLyric) {
        this.currentLyric.stop();
        this.currentLyric = null;
      };
      this.currentLyricNum = 0;
      const lyricRes = await songApi.searchMusicLyricByID(data);
      if (lyricRes.code === 200) {
        this.currentLyric = new Lyric(lyricRes.lrc.lyric, this.handleLyric);
        if (this.playState) {
          this.currentLyric.play();
        }
        // if (this.fullScreen) {
        //   this.isListInit = true;
        // }
      }
    },
    handleLyric ({ lineNum, txt }) {
      this.currentLyricNum = lineNum;
      if (lineNum > 5) {
        this.$refs.lyricWrapper.scrollToElement(this.$refs.lyricList[lineNum - 5], 1000);
      } else {
        this.$refs.lyricWrapper.scrollTo(0, 0, 1000);
      }
    },
    contentTouchStart (e) {
      this.touch.isInit = true;
      this.touch.moved = false;
      this.touch.x = e.touches[0].pageX;
      this.touch.y = e.touches[0].pageY;
    },
    contentTouchMove (e) {
      if (!this.touch.isInit) {
        return;
      }
      const deltaY = e.touches[0].pageY - this.touch.y;
      const deltaX = e.touches[0].pageX - this.touch.x;
      // 排除下拉歌词的时候
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return;
      }
      if (!this.touch.moved) {
        this.touch.moved = true;
      }
      const delta = e.touches[0].pageX - this.touch.x;
      const left = this.lyricMode === 'cd' ? 0 : -window.innerWidth;
      // 这句可以看下一行的写法就明白了往左划算划了多少，往右划算还剩下多少
      const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + delta));
      // const offsetWidth = this.lyricMode === 'cd' ? Math.min(0,Math.max(-window.innerWidth,delta)) :
      // Math.min(0,Math.max(-window.innerWidth,-window.innerWidth + delta));
      this.touch.percent = Math.abs(offsetWidth) / window.innerWidth;
      $('.content-r').css({ transform: `translate3d(${offsetWidth}px,0,0)` });
      $('.content-l').css({ opacity: 1 - this.touch.percent });
    },
    contentTouchEnd (e) {
      if (!this.touch.moved) {
        return;
      }
      let offsetWidth = 0;
      let opacity = 0;
      if (this.lyricMode === 'cd') {
        if (this.touch.percent > 0.1) {
          offsetWidth = -window.innerWidth;
          opacity = 0;
          this.lyricMode = 'lyric';
        } else {
          offsetWidth = 0;
          opacity = 1;
        }
      } else if (this.lyricMode === 'lyric') {
        if (this.touch.percent < 0.9) {
          offsetWidth = 0;
          opacity = 1;
          this.lyricMode = 'cd';
        } else {
          offsetWidth = -window.innerWidth;
          opacity = 0;
        }
      }
      $('.content-l').css({ transition: 'all ease-out 0.3s' });
      $('.content-r').css({ transform: `translate3d(${offsetWidth}px,0,0)` });
      $('.content-l').css({ opacity: `${opacity}` });
      this.touch.isInit = false;
    },
    back () {
      this.setFullScreen(false);
    },
    open () {
      this.setFullScreen(true);
    },
    audioError () {
      this.songReady = false;
    },
    enter (el, done) {
      const { x, y, scale } = this._getAnimationPos();
      const animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: 'translate3d(0,0,0) scale(1.1)'
        },
        100: {
          transform: 'translate3d(0,0,0) scale(1)'
        }
      };
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400, // 动画时长
          easing: 'linear'// 动画曲线
        }
      });
      animations.runAnimation(this.$refs.cdWrapper, 'move', done);
    },
    afterEnter () {
      animations.unregisterAnimation('move');
      this.$refs.cdWrapper.style.animation = '';
    },
    leave (el, done) {
      this.$refs.cdWrapper.style.transition = 'all 0.4s';
      const { x, y, scale } = this._getAnimationPos();
      this.$refs.cdWrapper.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      this.$refs.cdWrapper.addEventListener('transitionend', done);
    },
    afterLeave (el) {
      this.$refs.cdWrapper.style.transform = '';
      this.$refs.cdWrapper.style.transition = '';
    },
    changeMode () {
      this.mediaMode = (this.mediaMode + 1) % 3;
      this.setPlayMode({
        id: this.currentSong.id,
        mode: this.mediaMode,
        playList: this.playList
      });
    },
    togglePlay () {
      if (!this.songReady) {
        return;
      }
      if (this.currentLyric) {
        this.currentLyric.togglePlay();
      }
      if (this.playState) {
        this.$refs.audio.pause();
        this.setPlayState(false);
      } else {
        this.$refs.audio.play();
        this.setPlayState(true);
      }
    },
    prev () {
      if (!this.songReady) {
        return;
      }
      let prevIndex = this.currentIndex - 1;
      if (prevIndex === -1) {
        prevIndex = this.playList.length - 1;
      }
      this.setCurrentIndex(prevIndex);
      this.setPlayState(true);
      this.songReady = false;
    },
    next () {
      if (!this.songReady) {
        return;
      }
      let nextIndex = this.currentIndex + 1;
      if (nextIndex === this.playList.length) {
        nextIndex = 0;
      }
      this.setCurrentIndex(nextIndex);
      this.setPlayState(true);
      this.songReady = false;
    },
    ready () {
      this.songReady = true;
      this.duration = this.$refs.audio.duration;
    },
    _getAnimationPos () {
      const paddingRight = 10;
      const paddingBottom = 10;
      const cdHeight = $('.content')[0].clientHeight;
      const minHeight = $('.mini-player')[0].clientHeight;
      const x = window.innerWidth / 2 - paddingRight;
      const y = -(minHeight + paddingBottom + cdHeight / 2);
      const scale = minHeight / cdHeight;
      return {
        x, y, scale
      };
    },
    timeUpdate (e) {
      if (!this.songReady) {
        return;
      }
      // 移动的时候不设置audio的updateTime
      if (!this.moveBar) {
        // 这里不知道为啥会多走一秒，限制一下
        this.updateTime = Math.min(e.target.currentTime, this.duration);
      }
      this.progressPercent = this.updateTime / this.duration;
    },
    playEnd () {
      // 区分单曲循环
      if (this.mediaMode === playMode.single) {
        this.$refs.audio.currentTime = 0;
        this.$refs.audio.play();
      } else {
        this.next();
      }
    },
    percentChange (percent) {
      this.moveBar = true;
      this.updateTime = percent * this.duration;
      // 歌词必须在百分比中判断
      if (this.currentLyric) {
        this.currentLyric.seek(this.updateTime * 1000);
      }
    },
    percentChangeEnd (percent) {
      this.updateTime = percent * this.duration;
      this.$refs.audio.currentTime = this.updateTime;
      if (!this.playState) {
        this.$refs.audio.play();
        this.setPlayState(true);
      }
      this.moveBar = false;
      if (this.currentLyric) {
        this.currentLyric.seek(this.updateTime * 1000);
      }
    },
    formatTime (num) {
      let minute = num / 60 | 0;
      let second = (num % 60) | 0;
      if (minute < 10) {
        minute = '0' + minute;
      }
      if (second < 10) {
        second = '0' + second;
      }
      return minute + ':' + second;
    },
    ...mapMutations({
      setFullScreen: 'SET_FULLSCREEN',
      setPlayState: 'SET_PLAY_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    }),
    ...mapActions(['setPlayMode'])
  }
};
</script>
<style lang="scss">
#common-player {
  .normal-player {
    position: absolute;
    z-index: 20;
    width: 100%;
    top: 0;
    bottom: 0;
    background: #f2f3f4;
    & > .background {
      position: absolute;
      left: -50%;
      top: -50%;
      width: 300%;
      height: 300%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(2rem);
      .filter {
        position: absolute;
        width: 100%;
        height: 100%;
        background: black;
        opacity: 0.6;
      }
    }
    & > .top {
      height: 60px;
      display: flex;
      align-items: center;
      > .go-back {
        color: #fff;
        font-size: 1.5rem;
        padding: 10px 15px;
      }
      > .title {
        flex: 1;
        text-align: center;
        > h3 {
          color: #fff;
          font-weight: 450;
        }
        > h4 {
          color: #eaeaea;
          margin-top: 9px;
        }
      }
    }
    & > .content {
      top: 30px;
      position: relative;
      width: 100vw;
      height: 100vw;
      .content-l {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        .cd-wrapper {
          width: calc(100% - 5rem);
          height: calc(100% - 5rem);
          margin: 0 auto;
          > .cd {
            width: 100%;
            height: 100%;
            border: 1rem solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            overflow: hidden;
            &.play {
              animation: rotate 20s linear infinite;
            }
            &.pause {
              animation-play-state: paused;
            }
            .image {
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }
      }
      .content-r {
        z-index: 10;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 100%;
        top: 0;
        > .lyric-wrapper {
          position: relative;
          overflow-y: hidden;
          height: 100%;
          > .lyric-list {
            text-align: center;
            > p {
              line-height: 40px;
              font-size: 14px;
              color: #c7c7c7;
              &.active {
                color: #fff;
                font-weight: 450;
              }
            }
          }
        }
      }
      & > .content-dot {
        > .dot-wrapper {
          text-align: center;
          height: 30px;
          line-height: 30px;
          > .dot {
            display: inline-block;
            background: #fff;
            border-radius: 50%;
            width: 10px;
            height: 10px;
            vertical-align: middle;
            &.active {
              width: 20px;
              border-radius: 8px;
            }
          }
        }
      }
    }
    & > .progress-bar {
      display: flex;
      align-items: center;
      height: 40px;
      margin: 70px auto;
      width: 90%;
      > .time-l,
      .time-r {
        color: #fff;
        font-size: 15px;
        font-weight: 450;
        width: 60px;
        text-align: center;
      }
      > .progress-wrapper {
        flex: 1;
      }
    }
    & > .bottom {
      position: absolute;
      bottom: 30px;
      width: 100%;
      height: 70px;
      align-items: center;
      display: flex;
      justify-content: space-around;
      > div {
        color: #fff;
        text-align: center;
        font-size: 1.8rem;
        padding: 20px;
        flex: 1;
        > .disable {
          color: #e6e6e6;
        }
      }
      > .play {
        font-size: 60px;
      }
    }
    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.3s;
    }
    &.normal-enter,
    &.normal-leave-to {
      opacity: 0;
    }
  }
  .mini-player {
    position: fixed;
    z-index: 100;
    width: 35px;
    height: 35px;
    right: 10px;
    top: 10px;
    border-radius: 50%;
    overflow: hidden;
    background: #fff;
    > .progress-circle > img {
      position: absolute;
      left: 5%;
      top: 5%;
      border-radius: 50%;
      width: 90%;
      height: 90%;
      transform: scale(0.9);
    }
    &.mini-enter,
    &.mini-leave-to {
      opacity: 0;
    }
    &.mini-enter-active,
    .mini-leave-active {
      transition: all ease-out 0.3s;
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
