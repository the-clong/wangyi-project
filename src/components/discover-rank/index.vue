<template>
  <div id="discover-rank">
    <section class="swiper-container rank-container" :class="'slide-' + refStr">
      <div class="swiper-wrapper" v-if="rankList.length > 0">
        <div class="swiper-slide" v-for="(rank,index) in rankList" :key="index">
          <div class="rank-slide">
            <h3 v-html="rank.name"></h3>
            <div class="slide-item" v-for="(song,index1) in rank.songs" :key="index1">
              <div class="slide-img">
                <img :src="song.avater" />
              </div>
              <div class="slide-info">
                <div class="info-title">
                  {{song.name}}
                </div>
                <div class="divide"></div>
                <div class="info-artist">{{song.singerName}}</div>
              </div>
              <!-- <div class="icon-contain">
                <svg class="svg-icon" aria-hidden="true">
                  <use :xlink:href="'#icon-bofang1'"></use>
                </svg>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script type="text/ecmascript">
import Swiper from 'Swiper';
export default {
  props: {
    refStr: {
      type: String,
      default: ''
    },
    rankList: { // 歌单列表
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  data () {
    return {
      resData: []
    };
  },
  created () {
    this.mySwiper = null;
  },
  watch: {
    'rankList.length': function (len) {
      setTimeout(() => { this.initSwiper(); }, 500);
    }
  },
  methods: {
    initSwiper () {
      const self = this;
      self.mySwiper = new Swiper('.slide-' + self.refStr, {
        // observer: true
      });
    }
  }
};
</script>
    <style lang="scss">
@import '~@/common/css/mixin';
#discover-rank {
  margin: 6px 0 10px 0;
  .rank-container {
    width: 100%;
    margin-top: 5px;
    .swiper-slide {
      padding: 0 10px;
      .rank-slide {
        padding: 7px;
        background-color: #f8f8f8;
        border-radius: 12px;
        & > h3 {
          font-weight: bold;
          padding: 10px;
        }
        .slide-item {
          padding: 0px 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .slide-img {
            width: 75px;
            height: 75px;
            border-radius: 8px;
            overflow: hidden;
            > img {
              width: 100%;
              height: 100%;
            }
          }
          .slide-info {
            flex: 1;
            padding-left: 10px;
            color: red;
            height: 85px;
            line-height: 22px;
            display: flex;
            align-items: center;
            max-width: 240px;
            & > .info-title {
              max-width: 120px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: black;
              margin-right: 10px;
              font-size: 18px;
            }
            & > .info-artist {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              padding: 8px 0;
              color: #959595;
              &::before {
                content: '-';
              }
            }
          }
          /* .icon-contain {
            border-radius: 50%;
            @include lh(35px);
            text-align: center;
            width: 35px;
            color: red;
            border: 1px solid #e5e5e5;
          } */
        }
      }
    }
  }
}
</style>
