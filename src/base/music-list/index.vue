<template>
  <scroll id="music-list" :listenScroll="listenScroll" :probeType="probeType" @scroll="scrollList" :data="songs" :style="getTop">
    <ul class="song-list">
      <li class="song-item" v-for="(song,index) in songs" :key="index" @click="selectSong(song,index)">
        <div class="song-num">{{index + 1}}</div>
        <div class="song-info">
          <h3 class="song-name ellipsis">
            {{song.name}}
          </h3>
          <p>{{song.artist}}</p>
        </div>
      </li>
    </ul>
  </scroll>
</template>
<script>
import Scroll from '@/base/scroll';
export default {
  components: {
    Scroll
  },
  props: {
    isScrollTitle: {
      type: Boolean,
      default: false
    },
    songs: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  data () {
    return {
      listenScroll: true,
      probeType: 3
    };
  },
  computed: {
    getTop () {
      return `top: ${this.isScrollTitle ? '300px' : '260px'}`;
    }
  },
  methods: {
    scrollList (pos) {
      this.$emit('musicScroll', pos);
      // console.log(newY);
    },
    selectSong (song, index) {
      this.$emit('select', song, index);
    }
  }
};
</script>
<style lang="scss">
#music-list {
  background: #f2f3f4;
  position: fixed;
  /* overflow-y: hidden; */
  /* top: 300px; */
  bottom: 0;
  width: 100%;
  .song-list {
    background: #f2f3f4;
    .song-item {
      width: 100%;
      display: flex;
      height: 70px;
      align-items: center;
      border-bottom: 1px solid #e4e4e4;
      & > .song-num {
        width: 3rem;
        text-align: center;
        color: #757575;
      }
      > .song-info {
        flex: 1;
        .song-name {
          width: 20rem;
          color: #2e3030;
        }
        p {
          margin-top: 10px;
          color: #757575;
          font-size: 0.8rem;
        }
      }
    }
  }
}
</style>
