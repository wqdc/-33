<template>
  <div>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <div id="box"></div>
  </div>
</template>

<script>
// git log查看commit记录
// git status查看当前仓库的状态
// git add.提交到暂存区
// git commit -m
// 1
// -feat:新增特性
// -
// style:样式的修改
// fixed:debug
// comment:添加了注释

// 下载vant
// yarn add vant@latest-v2 -S
// 引入组件和css在main.js里面
// 测试组件能否使用

// 下载rem适配插件
// yarn add amfe-flexible
// main.js里面引入flexible
// 自动识别css中的px，并且转成rem  ----  post-css
// post-css: css预处理器
// postcss 自己能干的事情很少，需要额外下载插件
// 下载  yarn add postcss-pxtorem
// 新建 .postcssrc.js
export default {}
</script>

<style>
#box {
  width: 2rem;
  height: 2rem;
  background-color: aqua;
}
</style>
