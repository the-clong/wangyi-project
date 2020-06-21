<template>
  <div id="discover-song">
    <div class="item-title">
      <div class="first-level">
        {{time}}
      </div>
      <div class="title-bottom">
        <div class="sub-title" :class="{'active':currentSlide === 'song'}" @click="toggleTitle">
          新歌
        </div>
        <div class="divide sub-title">
          |
        </div>
        <div class="sub-title" :class="{'active':currentSlide === 'issue'}" @click="toggleTitle">
          新碟
        </div>
        <div class="title-btn">
          更多新歌
        </div>
      </div>
    </div>
    <discover-slide v-bind="$attrs" :refStr="currentSlide" :showPlayIcon="showPlayIcon"></discover-slide>
  </div>
</template>
<script type="text/ecmascript">
import Moment from 'moment';
import discoverSlide from '../discover-slide';
export default {
  components: {
    discoverSlide
  },
  data () {
    return {
      currentSlide: 'song'
    };
  },
  created () {
    this.time = Moment(new Date()).format('MM月DD日');
  },
  computed: {
    showPlayIcon () {
      return this.currentSlide === 'song';
    }
  },
  methods: {
    toggleTitle () {
      if (this.currentSlide === 'song') {
        this.currentSlide = 'issue';
      } else {
        this.currentSlide = 'song';
      }
      this.$emit('toggleData', this.currentSlide);
    }
  }
};
</script>
<style lang="scss">
@import '~@/common/css/mixin';
#discover-song {
  .slide-container1 {
    overflow: hidden;
    width: 100%;
  }
  .slide-container {
    overflow: hidden;
    width: 100%;
  }
  margin-top: 25px;
  & > .item-title {
    padding: 5px 10px;
    .first-level {
      color: #b2b2b2;
      font-size: 1.1rem;
    }
    > .title-bottom {
      padding-top: 10px;
      overflow: hidden;
      .sub-title {
        color: #b2b2b2;
        float: left;
        font-weight: 500;
        font-size: 1.4rem;
        margin-top: 5px;
        &.active {
          color: black;
        }
      }
      .divide {
        margin: 5px 10px;
      }
      & > .title-btn {
        float: right;
        border-radius: 40px;
        border: 1px solid #e6e6e6;
        @include lh(95px,28px);
        width: 6rem;
      }
    }
  }
}
</style>
