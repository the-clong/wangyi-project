<!--下拉框父组件-->
<template>
  <div id="app">
    <oSelect @changeOption="onChangeOption" :selectData="selectData"></oSelect>
    <!--
        selectData: 传入父组件需要传入的数据；格式:childDataName="parentDataName";
        onChangeOption： 子组件触发的事件名，通过触发一个事件从而来接收子组件的传过来的数据
        格式：@childEventName="parentEventName"
        注：可写多个
        -->
  </div>
</template>
<script>
import oSelect from '@/components/select.vue'; // 引入组件
export default {
  name: 'App',
  data () {
    return {
      selectData: {
        defaultIndex: 0, // 默认选中的是第几个
        selectStatus: false, // 通过selectStatus来控制下拉框的显示/隐藏
        selectOptions: [ // 下拉框中的数据 name这样的参数，看项目是否有需求，可自行修改
          {
            name: 'time',
            context: '按时间排序'
          },
          {
            name: 'view',
            context: '按浏览量排序'
          },
          {
            name: 'like',
            context: '按点赞数排序'
          },
          {
            name: 'reply',
            context: '按回复数排序'
          },
          {
            name: 'reward',
            context: '按打赏数排序'
          },
          {
            name: 'zuizui',
            context: '嘴嘴'
          },
          {
            name: 'pipi',
            context: '屁屁'
          },
          {
            name: 'jiujiu',
            context: '久久'
          },
          {
            name: 'dachui',
            context: '大锤'
          }
        ]
      }
    };
  },
  methods: {
    onChangeOption (index) {
      // 子组件通过一个事件来触发onChangeOption方法，从而传递一系列参数，这里的index就是传过来的
      this.selectData.defaultIndex = index;
      // 触发过后，动态改变了需要值
    }
  },
  components: {
    oSelect
    // 注册组件
  }
};
</script>
<style>
.select-box {
  position: relative;
  max-width: 250px;
  line-height: 35px;
  margin: 500px auto;
}
.select-title {
  position: relative;
  padding: 0 30px 0 10px;
  border: 1px solid #d8dce5;
  border-radius: 5px;
  transition-duration: 300ms;
  cursor: pointer;
}
.select-title:after {
  content: '';
  position: absolute;
  height: 0;
  width: 0;
  border-top: 6px solid #d8dce5;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  right: 9px;
  top: 0;
  bottom: 0;
  margin: auto;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
}
.select-title-active {
  border-color: #409eff;
}
.select-title-active:after {
  transform: rotate(-180deg);
  border-top-color: #409eff;
}
.select-options {
  position: absolute;
  padding: 10px 0;
  bottom: 45px;
  border: 1px solid #d8dce5;
  width: 100%;
  border-radius: 5px;
}
.select-option-item {
  padding: 0 10px;
  cursor: pointer;
  transition-duration: 300ms;
}
.select-option-item:hover,
.select-option-active {
  background: #f1f1f1;
  color: #409eff;
}
.arrow-top {
  position: absolute;
  height: 0;
  width: 0;
  bottom: -7px;
  border-bottom: 7px solid #d8dce5;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 99;
  transform: rotate(180deg);
}
.arrow-top:after {
  content: '';
  position: absolute;
  display: block;
  height: 0;
  width: 0;
  border-bottom: 6px solid #fff;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  left: -6px;
  top: 1px;
  z-index: 99;
}
.slide-down-enter-active,
.slide-down-leave {
  transition: all 0.3s ease-in-out;
  transform-origin: 0 bottom;
  transform: scaleY(1);
}
.slide-down-enter {
  transform: scaleY(0);
}
.slide-down-leave-active {
  transition: all 0.3s ease-in-out;
  transform-origin: 0 bottom;
  transform: scaleY(0);
}
</style>
