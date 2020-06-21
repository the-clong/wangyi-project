<template>
  <div id="discover-slide">
    <section class="swiper-container slide-container" :class="'slide-' + refStr">
      <div class="swiper-wrapper" v-if="resData.length > 0">
        <div class="swiper-slide" v-for="(item,index) in resData" :key="index">
          <div class="slide-item" v-for="(item1,index1) in item" :key="index1">
            <div class="slide-img">
              <img v-lazy="item1.picUrl" />
            </div>
            <div class="slide-info">
              <div class="info-title">
                {{item1.albumName}}
              </div>
              <p>{{item1.name}}</p>
            </div>
            <div class="icon-contain" v-show="showPlayIcon">
              <svg class="svg-icon" aria-hidden="true">
                <use :xlink:href="'#icon-bofang1'"></use>
              </svg>
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
    songsList: { // 歌单列表
      type: Array,
      default: function () {
        return [];
      }
    },
    showPlayIcon: {
      type: Boolean,
      default: false
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
  mounted () {
    this.$watch('songsList.length', (len) => {
      this.resData = [];
      if (len > 0) {
        for (let i = 0; i < this.songsList.length; i += 3) {
          this.resData.push(this.songsList.slice(i, i + 3));
        }
        setTimeout(() => { this.initSwiper(); }, 500);
      }
    });
  },
  methods: {
    initSwiper () {
      const self = this;
      self.mySwiper = new Swiper('.slide-' + self.refStr, {
        observer: true
      });
    }
  }
};
</script>
<style lang="scss">
@import '~@/common/css/mixin';
#discover-slide {
  .slide-container {
    width: 100%;
    margin-top: 5px;
    .swiper-slide {
      .slide-item {
        padding: 0px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .slide-img {
          width: 80px;
          height: 80px;
          border-radius: 8px;
          overflow: hidden;
          > img {
            width: 100%;
            height: 100%;
          }
        }
        .slide-info {
          flex: 1;
          padding-left: 15px;
          color: red;
          height: 90px;
          line-height: 22px;
          display: flex;
          justify-content: center;
          flex-direction: column;
          & > .info-title {
            > span {
              color: #999;
              margin-right: 10px;
            }
            & > span:nth-of-type(1) {
              font-size: 18px;
              color: black;
            }
          }
          & > p {
            padding: 8px 0;
            color: #999;
          }
        }
        .icon-contain {
          border-radius: 50%;
          @include lh(35px);
          color: red;
          border: 1px solid #e5e5e5;
        }
      }
    }
  }
}
</style>
