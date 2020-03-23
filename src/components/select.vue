<template>
  <!-- 下拉框组件html结构（子组件） -->
  <div class="select-box" @click="changeStatus">
    <!-- changeStatus事件: 点击实现下拉框的显示和隐藏  -->
    <h3 class="select-title" :name="selectData.selectOptions[selectData.defaultIndex].name" :class="{'select-title-active': selectData.selectStatus}">
      <!--属性name class的动态绑定-->
      {{ selectData.selectOptions[selectData.defaultIndex].context }}
      <!--这里主要绑定选择的数据-->
    </h3>
    <transition name="slide-down">
      <!--transition 实现下拉列表显示隐藏时的动画-->
      <ul class="select-options" v-show="selectData.selectStatus">
        <li class="select-option-item" v-for="(item,index) in selectData.selectOptions" @click="EmitchangeOption(index)" :class="{'select-option-active':selectData.defaultIndex===index}">
          <!--
    	    v-for：循环数据渲染下拉列表
    	    EmitchangeOption：点击下拉列表事件
    	    class：动态绑定被选中的数据
    	-->
          {{ selectData.selectOptions[index].context }}

        </li>
        <div class="arrow-top"></div>
      </ul>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'oSelect', // 建议大家都写上这个，有利于我们知道这个组件叫什么名字
  // 通过props来接收父组件传过来的数据
  props: {
    selectData: {
      type: Object // 规定传过来的数据为对象，否则就会报错（其实这样写就是规避错误和良好的习惯）
    }
  },
  methods: {
    EmitchangeOption (index) {
      this.$emit('changeOption', index);
      // 通过点击事件触发EmitchangeOption函数，传入当前点击下拉列表中的索引值index
      // 下拉框通过emit方法触发父组件中changeOption函数，动态传给父组件需要的数据，这里为索引值
    },
    changeStatus () {
      // 通过changeStatus事件动态改变selectStatus的值，从而控制下拉框的显示隐藏
      this.selectData.selectStatus = !this.selectData.selectStatus;
    }
  }
};
</script>
