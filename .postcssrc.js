// 所有的postcss的插件都是一个函数
const pxToRem = require('postcss-pxtorem')
module.exports = {
  //插件
  plugins: [
    pxToRem({
      //设置根节点的字体大小
      rootValue: ({ file }) => (/(vant|github)/.test(file) ? 37.5 : 75),
      //所有属性都转成rem
      propList: ['*']
    })
  ]
}
