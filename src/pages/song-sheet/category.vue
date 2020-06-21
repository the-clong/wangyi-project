<template>
  <div id="sheet-category">
    <two-header title="所有歌单"></two-header>
    <div class="category-container">
      <div class="songs-item">
        <div class="user-cat-sheet">
          <div class="title">我的歌单广场</div>
          <div class="edit" @click="changeEdit">{{btnText}}</div>
        </div>
        <ul class="category-list user-cat-list">
          <li v-for="(cat,index) in userCatList" :key="cat.name" class="ellipsis" ref="userCategory" @click="changeTagList(cat,index,'cat',$event)">
            <svg :class="getHotTag(cat)" aria-hidden="true" v-show="cat.hot && !isEdit">
              <use xlink:href="#icon-hot"></use>
            </svg>
            <svg :class="getHotTag(cat)" aria-hidden="true" v-show="isEdit && !cat.isNoEdit">
              <use xlink:href="#icon-jianhao"></use>
            </svg>
            <span>{{cat.name}}</span>
          </li>
        </ul>
      </div>
      <div v-for="item in allSongsSheet" :key="item.name" class="songs-item">
        <div class="title">{{item.name}}</div>
        <ul class="category-list" ref="sheetCategory">
          <li v-for="(tag,index) in item.children" :key="tag.name" class="ellipsis" :class="{'disable':tag.isUser}" @click="changeTagList(tag,index,'sheet',$event)">
            <svg :class="getHotTag(tag)" aria-hidden="true" v-show="tag.hot && !isEdit">
              <use xlink:href="#icon-hot"></use>
            </svg>
            <svg :class="getHotTag(tag)" aria-hidden="true" v-show="isEdit">
              <use xlink:href="#icon-jiahao"></use>
            </svg>
            <span>{{tag.name}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import twoHeader from '@/components/common/twoHeader';
import * as discover from '@/api/discover';
const catMarginLeft = 12;
const catMarginBottom = 15;
export default {
  components: {
    twoHeader
  },
  data () {
    return {
      test: '123',
      testFlag: false,
      btnText: '编辑',
      isEdit: false,
      allSongsSheet: [] // 所有歌单
    };
  },
  created () {
    setTimeout(() => {
      // console.log(this.userCatList);
    });
  },
  computed: {
    ...mapGetters({
      sheetCatList: 'sheetCatList',
      userCatList: 'userCatList',
      categories: 'categories'
    }),
    getHotTag () {
      return function (tag) {
        return tag.hot && !this.isEdit ? 'icon svg-icon hot' : 'icon svg-icon';
      };
    }
  },
  watch: {
    'sheetCatList.length': {
      handler: function () {
        const categories = Array.prototype.slice.call({ ...this.categories, length: Object.keys(this.categories).length });
        this.allSongsSheet = _.map(categories, (item, index) => {
          return {
            name: item,
            children: _.filter(this.sheetCatList, (cat, catIndex) => { cat.isUser = catIndex < 7; cat.catIndex = catIndex; return cat.category === index; })
          };
        });
      },
      immediate: true
    }
  },
  beforeUpdate () {
    console.log('before------');
  },
  methods: {
    changeEdit () {
      this.isEdit = !this.isEdit;
      this.btnText = this.isEdit ? '完成' : '编辑';
    },
    changeTagList (tag, index, p, e) {
      // 下方sheet禁用或者上方的推荐和精品，不让他点
      if ((p === 'sheet' && tag.isUser) || (index < 2 && p === 'cat')) {
        return;
      }
      const self = this;
      self.testFlag = false;
      // 编辑状态添加到用户tag
      if (this.isEdit) {
        const len = this.userCatList.length;
        let targetDom = null;
        if (p === 'sheet') { // cat的最后一个
          targetDom = $(this.$refs.userCategory[len - 1]);
        } else { // 筛选sheet中匹配的tag
          const index = _.findIndex(this.allSongsSheet[tag.category].children, item => item.name === tag.name);
          targetDom = $(this.$refs.sheetCategory[tag.category]).find('li').eq(index);
        }
        const currentDom = $(e.currentTarget);
        // 克隆一个本身的DOM，覆盖在自身之上
        const cloneDom = currentDom.clone();
        const { left, top } = currentDom.position();
        const lineHeight = currentDom.height() + catMarginBottom + 2;
        cloneDom.css({ position: 'absolute', left, top });
        currentDom.parent().append(cloneDom);
        // 直接飞
        // 改变数据，这里是最后显示的结果
        const item = self.sheetCatList[tag.catIndex];
        item.isUser = p === 'sheet';
        // 计算两个DOM之间的距离，并进行偏移
        let x = targetDom.position().left;
        let y = targetDom.position().top;
        let height = $('.user-cat-list').height();
        // 每行四个，检查是否填满整行
        if (len % 4 === 0) {
          if (p === 'sheet') { // 新增一行
            x = 0;
            y = y + lineHeight;
            height = height + lineHeight;
          }
        } else {
          if (p === 'sheet') {
            x += currentDom.width() + catMarginLeft;
          } else {
            if (len % 4 === 1) { // 删减一行
              y = y - lineHeight;
              height = height - lineHeight;
            }
          }
        }
        // 增加减少一行重新计算parent高度
        $('.user-cat-list').css({ height, transition: 'all ease-out 0.3s' })
          .on('transitionstart', function () {
            // 点击sheet的时候直接置灰
            if (p === 'cat') {
              currentDom.css('display', 'none');
            }
          });
        // 克隆节点飞入飞出
        cloneDom.css({ left: x, top: y })
          .css({ transition: 'all ease-out 0.3s' })
          .on('transitionstart', function () {
            // 点击sheet的时候直接置灰
            if (p === 'sheet') {
              currentDom.addClass('disable');
            }
          })
          .on('transitionend', function () {
            $(this).css('display', 'none');
            // 控制只调用一次end
            if (!self.testFlag) {
              self.changeSheetList({ index: p === 'sheet' ? tag.catIndex : index, item, tag: p });
              self.testFlag = true;
            }
          });
      } else {
        // 非编辑状态直接跳转歌单列表
      }
    },
    ...mapActions(['changeSheetList'])
  }
};
</script>
<style lang="scss">
@import '~@/common/css/mixin';
#sheet-category {
  @include posSite(100%, 20);
  background: #fff;
  .category-container {
    overflow-y: auto;
    margin-top: 65px;
    height: calc(100% - 65px);
    .songs-item {
      .user-cat-sheet {
        display: flex;
        justify-content: space-between;
        .edit {
          width: 60px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border: 1px solid #fe3837;
          color: #fe3837;
          border-radius: 20px;
          margin-right: 6px;
        }
      }
      .title {
        font-size: 24px;
        font-weight: bold;
        text-align: left;
        padding: 0 20px 14px 15px;
      }
      .category-list {
        & > li {
          width: calc(25vw - 15px);
          height: 45px;
          line-height: 45px;
          display: inline-block;
          text-align: center;
          background: #f8f8f8;
          border-radius: 20px;
          margin-left: 12px;
          margin-bottom: 15px;
          > .svg-icon {
            &.hot {
              color: #ff3a3b;
            }
            margin-right: 3px;
          }
          &.disable {
            opacity: 0.5;
          }
        }
      }
    }
  }
}
</style>
