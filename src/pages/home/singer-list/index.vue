<template>
  <div id="singer-list">
    <Header />
    <list-view :listData="singerList" @select="selectSinger"></list-view>
    <transition name="slide">
      <router-view />
    </transition>
  </div>
</template>
<script>
import Header from '@/components/common/header';
import listView from '@/base/listview';
import { mapMutations } from 'vuex';
import * as singerData from '@/api/singer';
import Singer from '@/common/js/singer';
const pinyin = require('pinyin');
const HOT_NUM = 10; const HOT_NAME = '热门';
export default {
  components: {
    listView, Header
  },
  data () {
    return {
      singerList: []
    };
  },
  created () {
    this.initSingerList();
  },
  methods: {
    ...mapMutations(['SET_SINGER']),
    async initSingerList () {
      const singerListRes = await singerData.searchSingerList({ limit: 200 });
      const singerList = singerListRes.artists;
      const singerMap = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      // 按照字母和热门分组
      _.map(singerList, (item, index) => {
        const singer = new Singer({
          id: item.id,
          name: item.name,
          avater: item.picUrl
        });
        if (index < HOT_NUM) {
          singerMap.hot.items.push(singer);
        }
        const itemName = this.getPinyinData(singer.name);
        if (!singerMap[itemName]) {
          singerMap[itemName] = {
            title: itemName,
            items: [singer]
          };
        } else {
          singerMap[itemName].items.push(singer);
        }
      });
      const hot = [];
      const letterSingers = [];
      // 字母部分排序
      for (const key in singerMap) {
        if (key === 'hot') {
          hot.push(singerMap[key]);
        } else if ((/^[a-zA-Z]+$/.test(key))) {
          letterSingers.push(singerMap[key]);
        }
      }
      letterSingers.sort((a, b) => {
        return a.title.charCodeAt() - b.title.charCodeAt();
      });
      // 合并结果
      this.singerList = [...hot, ...letterSingers];
    },
    selectSinger (singer) {
      this.SET_SINGER(singer);
      this.isSingerList = false;
      this.$router.push({
        path: `/home/singerList/${singer.id}`
      });
    },
    getPinyinData (word) {
      return pinyin(word, {
        style: pinyin.STYLE_FIRST_LETTER, // 设置拼音风格
        heteronym: true
      })[0][0].substr(0, 1).toUpperCase();
    }
  }
};
</script>
<style lang="scss">
#singer-list {
  height: 100%;
}
.slide-enter-active,
.slide-leave-active {
  transition: all ease-in 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
