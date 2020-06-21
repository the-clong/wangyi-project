<template>
  <div id="recommend">
    <!-- <div class="recommend-header">
      <div class="back" @click="goBack">
        <svg class="svg-icon" aria-hidden="true">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
      </div>
      <div class="title">
        <h2>排行榜</h2>
      </div>
    </div> -->
    <two-header title="排行榜"></two-header>
    <div class="recommend-container">
      <ul class="offical-list" v-if="officalList.length > 0">
        <h2>官方榜</h2>
        <li v-for="(item,index) in officalList" :key="index" class="offical-item" @click="goRecmdDetail(item.id)">
          <div class="image-contain">
            <div class="text">{{item.updateFrequency}}</div>
            <img v-lazy="item.coverImgUrl" width="120" height="120" />
          </div>
          <ul class="info">
            <li class="info-item ellipsis" v-for="(itemInfo,index1) in item.tracks" :key="index1">
              <span>{{index1 + 1}}.</span>
              <span>{{itemInfo.first}} - {{itemInfo.second.substring(0,1)}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="recommend-list" v-for="(title,idx) in titleArray" :key="idx">
        <h2>{{title}}</h2>
        <li v-for="(item,index) in recommendList.slice(idx * 6,getBillList(idx))" :key="index" class="recommend-item">
          <div class="image-contain">
            <div class="text">{{item.updateFrequency}}</div>
            <img v-lazy="item.coverImgUrl" width="110" height="110" />
          </div>
          <div class="item-name">{{item.name}}</div>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import * as recommendApi from '@/api/recommend';
import twoHeader from '@/components/common/twoHeader';
export default {
  components: {
    twoHeader
  },
  data () {
    return {
      officalList: [], // 官方榜
      recommendList: [], // 推荐榜单
      titleArray: ['推荐榜', '全球榜', '更多榜单']
    };
  },
  computed: {
    getBillList () {
      return function (idx) {
        return idx === 2 ? this.recommendList.length - 1 : (idx + 1) * 6;
      };
    }
  },
  created () {
    this.searchTopList();
  },
  methods: {
    async searchTopList () {
      const topListRes = await recommendApi.searchTopListAction();
      this.officalList = topListRes.list.slice(0, 3);
      this.recommendList = topListRes.list.slice(4, topListRes.list.length);
    },
    goBack () {
      this.$router.go(-1);
    },
    goRecmdDetail (id) {
      this.$router.push({
        path: `/rank/${id}`
      });
    }
  }
};
</script>
<style lang="scss">
@import '~@/common/css/mixin';
@import '~@/common/css/common';
#recommend {
  background: #fff;
  @include posSite(calc(100% - 65px),0,fixed,0,0,0);
  .recommend-header {
    z-index: 13;
    background: #fff;
    width: 100%;
    display: flex;
    align-items: center;
    @include posSite(60px,0,fixed,0,0,0);
    > .back {
      padding: 5px;
      font-size: 28px;
    }
    > .title {
      flex: 1;
      text-align: center;
      h2 {
        font-weight: 550;
        font-size: 26px;
      }
    }
  }
  .recommend-container {
    height: 100%;
    overflow-y: auto;
    margin-top: 60px;
    .offical-list {
      > h2 {
        font-weight: 500;
        padding: 8px 10px;
      }
      & > .offical-item {
        display: flex;
        align-items: center;
        padding: 5px 10px;
        .image-contain {
          @include imageContain(120px,120px);
        }
        > .info {
          flex: 1;
          padding-left: 17px;
          overflow: hidden;
          .info-item {
            line-height: 35px;
          }
        }
      }
    }
    .recommend-list {
      padding-top: 25px;
      > h2 {
        font-weight: 500;
        padding: 8px 10px;
      }
      .recommend-item {
        display: inline-block;
        padding-left: 10px;
        padding-top: 10px;
        vertical-align: top;
        > .image-contain {
          @include imageContain(110px,110px);
        }
        > .item-name {
          max-width: 110px;
          padding: 8px 0;
          line-height: 20px;
        }
      }
    }
  }
  &.recommend-enter,
  &.recommend-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  &.recommend-enter-active,
  &.recommend-leave-active {
    transition: all ease-in 0.4s;
  }
}
</style>
