<template>
  <div id="singer-detail">
    <div class="singer-title">
      <div class="icon-back" @click="$router.go(-1)">
        <svg class="svg-icon" aria-hidden="true">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
      </div>
      <div class="title">
        <h2>{{singerTitle}}</h2>
      </div>
    </div>
    <div class="singer-sketch" :style="styleBg">
      <div class="random-play" ref="randomPlay" v-show="songs.length > 0" @click="randomPlay">
        <div class="icon-play">
          <svg class="svg-icon" aria-hidden="true">
            <use xlink:href="#icon-bofang1"></use>
          </svg>
        </div>
        <div class="play-text">
          随机播放全部
        </div>
      </div>
    </div>
    <div class="bg-layer" ref="bgLayer">
    </div>
    <music-list :songs="songs" @musicScroll="musicScroll" @select="selectMusic"></music-list>
  </div>
</template>
<script>
import $ from 'jquery';
import _ from 'lodash';
import Song from '@/common/js/song';
import * as singer from '@/api/singer';
import MusicList from '@/base/music-list';
import { mapMutations, mapActions, mapGetters } from 'vuex';
export default {
  components: {
    MusicList
  },
  data () {
    return {
      bgImage: '',
      singerTitle: '',
      minLayerHeight: 0,
      bgImageHeight: 0,
      songs: []
    };
  },
  created () {
    this.searchSingerDetail();
  },
  computed: {
    ...mapGetters({
      sequenceList: 'sequenceList'
    }),
    styleBg: function () {
      return `background-image:url(${this.bgImage})`;
    }
  },
  mounted () {
    this.bgImageHeight = $('.singer-sketch')[0].clientHeight;
    this.minLayerHeight = $('.singer-title')[0].clientHeight - $('.singer-sketch')[0].clientHeight;
  },
  methods: {
    async searchSingerDetail () {
      const detailRes = await singer.searchSingerDetail({ id: this.$route.params.id });
      this.bgImage = detailRes.artist.picUrl;
      this.singerTitle = detailRes.artist.name;
      this.songs = _.map(detailRes.hotSongs, (item, index) => {
        return new Song({
          name: item.name,
          artist: _.map(item.ar, 'name').slice(0, 3).join('/'),
          id: item.id,
          picUrl: item.al.picUrl
        });
      });
      // 音乐列表
      this.setSquenceList(this.songs);
    },
    musicScroll (pos) {
      let zIndex = 0; let paddingTop = 0;
      let height = 0;
      const percent = Math.abs(pos.y / this.bgImageHeight);
      const titleHeight = $('.singer-title')[0].clientHeight;
      const translateY = Math.max(pos.y, this.minLayerHeight);
      let opacity = 1 - pos.y / (this.minLayerHeight - $('.random-play').position().top);
      const bottom = Math.max(25, 25 - translateY);
      if (opacity < 0) {
        opacity = 0;
      } else if (opacity > 1) {
        opacity = 1;
      }
      // 控制滑动到顶端的边界
      $('.bg-layer').css({
        transform: `translate3d(0,${translateY}px,0)`
      });
      if (pos.y <= this.minLayerHeight) {
        zIndex = 10;
        height = titleHeight;
        paddingTop = 0;
      } else {
        // 改变singer-sketch的高度和z-index
        zIndex = 0;
        height = 0;
        paddingTop = '260px';
        // 计算全部播放按钮的透明度
        $('.random-play').css('opacity', opacity).css('display', opacity === 0 ? 'none' : '').css('bottom', bottom);
      }
      if (pos.y > 0) {
        zIndex = 10;
        $('.singer-sketch').css('transform', `scale(${(1 + percent)})`);
      }
      $('.singer-sketch').css('zIndex', zIndex);
      $('.singer-sketch').css('height', height);
      $('.singer-sketch').css('paddingTop', paddingTop);
    },
    randomPlay () {
      this.setFullScreen(true);
      this.setPlayState(true);
      const index = Math.floor(Math.random() * [this.sequenceList.length - 1]);
      this.setPlayMode({
        id: this.sequenceList[index].id,
        mode: 1,
        playList: this.sequenceList
      });
    },
    selectMusic (song, index) {
      this.selectPlay({
        playList: this.sequenceList,
        currentIndex: index
      });
    },
    ...mapMutations({
      setSquenceList: 'SET_SEQUENCE_LIST',
      setFullScreen: 'SET_FULLSCREEN',
      setPlayState: 'SET_PLAY_STATE'
    }),
    ...mapActions(['selectPlay', 'setPlayMode'])
  }
};
</script>
<style lang="scss">
#singer-detail {
  background-color: #fff;
  position: fixed;
  z-index: 12;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .singer-title {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 12;
    padding: 12px 10px;
    > .icon-back {
      padding: 6px 0;
      font-size: 1.2rem;
      float: left;
      color: #d44439;
    }
    > .title {
      margin-top: 6px;
      text-align: center;
      > h2 {
        font-weight: 600;
        font-size: 22px;
        color: #fff;
      }
    }
  }
  > .singer-sketch {
    position: relative;
    height: 0;
    padding-top: 260px;
    width: 100%;
    background-size: cover;
    transform-origin: top;
    background-repeat: no-repeat;
    .random-play {
      position: absolute;
      display: inline-block;
      width: 165px;
      height: 36px;
      border: 1px solid #d44439;
      border-radius: 40px;
      bottom: 25px;
      left: 50%;
      padding: 3px 10px;
      transform: translateX(-50%);
      > div {
        color: #d44439;
        vertical-align: middle;
        display: inline-block;
      }
      .icon-play {
        width: 25px;
        height: 25px;
        border: 1px solid #d44439;
        border-radius: 50%;
        text-align: center;
        line-height: 25px;
        font-size: 12px;
      }
      .play-text {
        font-weight: 600;
        padding: 8px;
      }
    }
  }
  .bg-layer {
    position: relative;
    height: 100%;
    background: #fff;
  }
}
</style>
